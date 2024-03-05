import get from 'lodash/get';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import {getBaseConfig} from 'utils/config';
import {StringMap, Route} from 'utils/Types';

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [contextState, setContextState] =
    useState<AppContextProps>(defaultContextValues);

  const updateContext = useCallback(
    (updates: Partial<Omit<AppContextProps, 'hasNavigationMenu'>>) => {
      setContextState((currentContext) => {
        let newNavMenuItems = updates.navMenuItems;

        const hasNavigationMenu = get(newNavMenuItems, 'routes.length', 0) > 0;

        return {
          ...currentContext,
          ...updates,
          hasNavigationMenu,
        };
      });
    },
    []
  );

  return (
    <AppContext.Provider value={{...contextState, updateContext}}>
      {children}
    </AppContext.Provider>
  );
};

interface AppContextProps {
  config: StringMap;
  navMenuItems?: Route | null;
  version?: string | null;
  context?: ContextType | null;
  updateContext: (
    updates: Partial<Omit<AppContextProps, 'updateContext'>>
  ) => void;
  hasNavigationMenu: boolean;
}

const noop = () => {};

const defaultContextValues: AppContextProps = {
  config: getBaseConfig(),
  updateContext: noop,
  hasNavigationMenu: false,
};

const AppContext = createContext<AppContextProps>(defaultContextValues);

export enum ContextType {
  APPLICATIONS = 'applications',
  UPLYNK = 'uplynk',
  DELIVERY = 'delivery',
  OPEN_EDGE = 'open_edge',
}

export const useAppContext = () => useContext(AppContext);