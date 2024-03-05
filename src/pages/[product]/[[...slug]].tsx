import {join} from 'path';

import {isEdgioRunDev, isProductionBuild} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import {useEffect} from 'react';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {serializeConfig} from '../../utils/config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {productsConfig} from 'config/appConfig';
import {ContextType, useAppContext} from 'contexts/AppContext';
import logger from 'utils/logging';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList, Route, StringMap} from 'utils/Types';

const guidesPath = join(process.cwd(), 'guides');

export default function Guide({
  source,
  sourceFile,
  headings,
  productContext,
  isHomepage,
}: {
  source: any;
  sourceFile: string;
  headings: MDHeadingsList;
  productContext: ProductContextType;
  isHomepage: boolean;
}) {
  const {config, navItems, product, version} = productContext;

  const {updateContext} = useAppContext();
  useEffect(() => {
    updateContext({
      context: ContextType[product.toUpperCase() as keyof typeof ContextType],
      config,
      navMenuItems: navItems,
      version,
    });
  }, [navItems, updateContext, config, version]);

  // TODO - isHomepage needs to be set in the context
  return (
    <Page>
      <MarkdownPage
        meta={{...source.frontmatter, sourceFile, version}}
        headings={headings}
        isHomepage={isHomepage}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  const routes = [];
  const paths = [];

  // determine available guides from filesystem
  const allGuides = (
    await globby(['**/*.{md,mdx}'], {
      cwd: guidesPath,
    })
  ).map(
    (path: string) => path.replace(/.mdx?/, '') // remove extension
  );

  // First part of the path will be the "product" (eg. 'applications', 'uplynk', etc.)
  // Some products will have a version in the path (eg. 'applications/v7') and will have the following structure:
  // /{PREFIX}/[guide] => guide for the non-versioned product
  // /{PREFIX}/[version] => homepage for the version product
  // /{PREFIX}/[version]/[guide] => guide for the versioned product

  // In dev mode, don't prerender any pages and fallback to SSR for
  // faster page loads
  if (isEdgioRunDev()) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  paths.push(...allGuides);

  // Convert file paths to routes. The first part of the path will be the [product] and the rest will be the [slug]
  routes.push(
    ...[...new Set(paths)].map((path) => {
      const [product, ...slug] = path.split('/');
      return {
        params: {
          product,
          slug,
        },
      };
    })
  );

  if (isProductionBuild()) {
    logger.prod(
      'Generating the following paths:',
      JSON.stringify(routes, null, 2)
    );
  }

  // Prerender all available guides that are determined to not be legacy (eg. Applications <= 6).
  // Legacy guides will fallback to SSR.
  // TODO exclude legacy guides from the list of routes
  return {
    paths: routes,
    fallback: 'blocking',
  };
};

export async function getStaticProps({
  params,
}: {
  params: {product: string; slug: string[]};
}) {
  let {product, slug} = params;
  let [version, ...guide] = (slug = slug || []);
  const versionRE = /^v(\d+)$/;
  const hasVersionInSlug = versionRE.test(version);

  console.log('slug', slug);

  const productConfig = productsConfig[product];

  if (!productConfig) {
    logger.warn(`No product configuration found for '${product}'`);
    return {notFound: true};
  }

  // Define the default version configuration
  const {pathPrefix} = productConfig;
  let {configPath, guidesPath, navigationPath} =
    productConfig.versions.default!;

  // If a version is specified, use the version configuration
  if (hasVersionInSlug) {
    const {
      configPath: versionConfigPath,
      guidesPath: versionguidesPath,
      navigationPath: versionNavigationPath,
    } = productConfig.versions[version];
    configPath = versionConfigPath;
    guidesPath = versionguidesPath;
    navigationPath = versionNavigationPath;
  } else {
    // Reset the guide to the version if no version is specified
    guide = [version, ...guide];
  }

  if (!configPath || !navigationPath) {
    logger.warn(`No version configuration found for '${product}.${version}'`);
    return {notFound: true};
  }

  let isHomepage = false;

  // Redirect to the latest version if no version is specified and the product contains multiple versions matching the regex
  const versions = Object.keys(productConfig.versions).filter((v) =>
    v.match(versionRE)
  );

  if (!hasVersionInSlug && versions.length > 1) {
    const latestVersion = versions.sort().reverse()[0].replace('v', '');
    logger.warn(
      `No version specified for '${product}'. Redirecting to latest version: '${pathPrefix}/v${latestVersion}/${slug.join(
        '/'
      )}'`
    );
    return {
      redirect: {
        destination: `${pathPrefix}/v${latestVersion}/${slug.join('/')}`,
        permanent: true,
      },
    };
  } else if (!guide || !guide.length || guide[guide.length - 1] === 'index') {
    // version with no remaining guide path so use as homepage
    isHomepage = true;
    guide = ['index'];
  }

  // Remaining guide path after version and product
  const slugAsString = guide.join('/');

  // Glob for matching the guide files
  const guideGlobs = ['md', 'mdx'].flatMap((ext) => [
    `${guidesPath}/${version}/${slugAsString}.${ext}`,
    `${guidesPath}/${slugAsString}.${ext}`,
  ]);

  const files = (await globby(guideGlobs)).sort((a, b) => {
    // prioritize versioned files over non-versioned files
    if (a.match(versionRE) && !b.match(versionRE)) {
      return -1;
    }
    if (!a.match(versionRE) && b.match(versionRE)) {
      return 1;
    }
    return 0;
  });

  const [file] = files;
  if (!file) {
    logger.warn(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logger.dev(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  const config = (await configPath()).default;
  const navItems = (await navigationPath()).default;

  // update template with versioned constants
  let content =
    templateReplace(join(process.cwd(), file), config) ??
    `Invalid template file: ${file}`;

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.replace(/<!--([\s\S]*?)-->/g, '');
  // In some special cases, like code blocks, we do allow HTML comments.
  // They indicate this by using &lt;!-- instead of <!-- so we need to
  // convert them back to HTML comments after removing all HTML comments.
  content = content.replace(/\&lt;!-- /g, '<!-- ');

  // <edgejs> tags are used for external documentation and should be removed
  content = content.replace(/<edgejs([\s\S]*?)edgejs>/g, '');

  const headings: MDHeadingsList = [];
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins: [[rehypeExtractHeadings, {headings}]],
      format: 'mdx',
    },
  });

  const productContext = {
    product,
    version,
    config: serializeConfig(config),
    navItems,
  };

  return {
    props: {
      source: mdxSource,
      sourceFile: file,
      headings,
      productContext,
      isHomepage,
    },
  };
}

type ProductContextType = {
  product: string;
  version: string;
  config: StringMap;
  navItems: Route;
};