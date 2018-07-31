// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import asyncComponent from '@components/AsyncComponent'

const moduleRouterConfig = [
  {
    path: '/demo',
    component: asyncComponent(()=>import('@modules/demo')),
  }
];

export default moduleRouterConfig;
