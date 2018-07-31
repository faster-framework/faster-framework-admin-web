// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import asyncComponent from '@components/AsyncComponent'
import moduleRouterConfig from '@modules/routerConfig'

const defaultConfig = [
  {
    path: '/login',
    layout: asyncComponent(() => import('@modules/login/layout')),
    component: asyncComponent(() => import('@modules/login')),
  },
  {
    path: '/',
    component: asyncComponent(() => import('@modules/dashborad')),
  },
  {
    path: '/sys/user',
    component: asyncComponent(() => import('@modules/system/user')),
  },
  {
    path: '/sys/role',
    component: asyncComponent(() => import('@modules/system/role')),
  },
  {
    path: '/sys/permission',
    component: asyncComponent(() => import('@modules/system/permission')),
  },
  {
    path: '*',
    layout: asyncComponent(() => import('@layouts/blankLayout')),
    component: asyncComponent(() => import('@components/notFound')),
  },
];

defaultConfig.forEach(item => {
  moduleRouterConfig.push(item);
})
export default moduleRouterConfig;
