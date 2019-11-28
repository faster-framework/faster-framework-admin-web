import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
import webpackPlugin from './plugin.config';
import routers, { flatRoutes } from './routers';
const { pwa, primaryColor } = defaultSettings;

const plugins = [
  [
    'umi-plugin-react',
    {
      dynamicImport: true,
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false
    },
  ]
];
export default {
  define: {
    COPRY_RIGHT: defaultSettings.copyRight,
    TITLE: defaultSettings.title,
    TITLE_DESC: defaultSettings.titleDesc,
    FLAT_ROUTES: flatRoutes,
    MOCK: process.env.MOCK == undefined ? false : process.env.MOCK
  },
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  routes: [
    {
      path: '/login',
      component: '../common/layouts/LoginLayout',
      routes: [
        {
          name: '登录',
          path: '/login',
          component: '../common/pages/login',
        },
      ],
    },
    {
      path: '/',
      component: '../common/layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../common/layouts/BasicLayout',
          routes: routers
        }
      ]
    }
  ],
  theme: {
    'primary-color': primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin
};
