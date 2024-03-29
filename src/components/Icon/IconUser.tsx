import * as React from 'react';

import cn from 'classnames';

export const IconUser = React.memo<JSX.IntrinsicElements['svg']>(
  function IconUser({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#EEEEEE" />
        <rect width="32" height="32" rx="3" fill="#EEEEEE" />
        <path
          d="M15.1 11.4286C15.1 13.3221 13.4882 14.8571 11.5 14.8571C9.51178 14.8571 7.9 13.3221 7.9 11.4286C7.9 9.53502 9.51178 8 11.5 8C13.4882 8 15.1 9.53502 15.1 11.4286ZM13.3 11.4286C13.3 10.4818 12.4941 9.71429 11.5 9.71429C10.5059 9.71429 9.7 10.4818 9.7 11.4286C9.7 12.3753 10.5059 13.1429 11.5 13.1429C12.4941 13.1429 13.3 12.3753 13.3 11.4286Z"
          fill="#606060"
        />
        <path
          d="M24.1 15.2857C24.1 16.9426 22.6897 18.2857 20.95 18.2857C19.2103 18.2857 17.8 16.9426 17.8 15.2857C17.8 13.6289 19.2103 12.2857 20.95 12.2857C22.6897 12.2857 24.1 13.6289 24.1 15.2857ZM22.3 15.2857C22.3 14.5756 21.6956 14 20.95 14C20.2044 14 19.6 14.5756 19.6 15.2857C19.6 15.9958 20.2044 16.5714 20.95 16.5714C21.6956 16.5714 22.3 15.9958 22.3 15.2857Z"
          fill="#606060"
        />
        <path
          d="M14.2 23.4286V20C14.2 18.5798 12.9912 17.4286 11.5 17.4286C10.0088 17.4286 8.8 18.5798 8.8 20V23.4286H7V20C7 17.6331 9.01472 15.7143 11.5 15.7143C13.9853 15.7143 16 17.6331 16 20V23.4286H14.2Z"
          fill="#606060"
        />
        <path
          d="M23.2 23V23.4286H25V23C25 20.8698 23.1868 19.1429 20.95 19.1429C18.7132 19.1429 16.9 20.8698 16.9 23V23.4286H18.7V23C18.7 21.8165 19.7074 20.8571 20.95 20.8571C22.1926 20.8571 23.2 21.8165 23.2 23Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

export const IconUserDark = React.memo<JSX.IntrinsicElements['svg']>(
  function IconUser({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#EEEEEE" />
        <rect width="32" height="32" rx="3" fill="#EEEEEE" />
        <path
          d="M15.1 11.4286C15.1 13.3221 13.4882 14.8571 11.5 14.8571C9.51178 14.8571 7.9 13.3221 7.9 11.4286C7.9 9.53502 9.51178 8 11.5 8C13.4882 8 15.1 9.53502 15.1 11.4286ZM13.3 11.4286C13.3 10.4818 12.4941 9.71429 11.5 9.71429C10.5059 9.71429 9.7 10.4818 9.7 11.4286C9.7 12.3753 10.5059 13.1429 11.5 13.1429C12.4941 13.1429 13.3 12.3753 13.3 11.4286Z"
          fill="#606060"
        />
        <path
          d="M24.1 15.2857C24.1 16.9426 22.6897 18.2857 20.95 18.2857C19.2103 18.2857 17.8 16.9426 17.8 15.2857C17.8 13.6289 19.2103 12.2857 20.95 12.2857C22.6897 12.2857 24.1 13.6289 24.1 15.2857ZM22.3 15.2857C22.3 14.5756 21.6956 14 20.95 14C20.2044 14 19.6 14.5756 19.6 15.2857C19.6 15.9958 20.2044 16.5714 20.95 16.5714C21.6956 16.5714 22.3 15.9958 22.3 15.2857Z"
          fill="#606060"
        />
        <path
          d="M14.2 23.4286V20C14.2 18.5798 12.9912 17.4286 11.5 17.4286C10.0088 17.4286 8.8 18.5798 8.8 20V23.4286H7V20C7 17.6331 9.01472 15.7143 11.5 15.7143C13.9853 15.7143 16 17.6331 16 20V23.4286H14.2Z"
          fill="#606060"
        />
        <path
          d="M23.2 23V23.4286H25V23C25 20.8698 23.1868 19.1429 20.95 19.1429C18.7132 19.1429 16.9 20.8698 16.9 23V23.4286H18.7V23C18.7 21.8165 19.7074 20.8571 20.95 20.8571C22.1926 20.8571 23.2 21.8165 23.2 23Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

IconUser.displayName = 'IconUser';
IconUserDark.displayName = 'IconUserDark';
