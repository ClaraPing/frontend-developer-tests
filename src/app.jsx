import * as React from 'react';
import { config, history, runApp } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

const locale = getLocale();

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <LocaleProvider locale={locale}>{children}</LocaleProvider>,
  },
  addProvider: ({ children }) => {
    return <ConfigProvider>{children}</ConfigProvider>;
  },
  ErrorBoundaryFallback: <div>渲染错误</div>,
  request: {
    baseURL: config.baseURL
  },

  router: {
    type: 'hash',
    basename: '/',
    fallback: <div>loading</div>,
    modifyRoutes: (routes) => {
      return routes
    }
  },

};



runApp(appConfig);
