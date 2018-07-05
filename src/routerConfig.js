// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import LoginLayout from './layouts/LoginLayout';
import Dashboard from './pages/dashborad';
import UserList from './pages/system/user';
import NotFound from './pages/notFound';
import Login from './pages/login';
import RoleList from './pages/system/role';

const routerConfig = [
  {
    path: '/login',
    layout: LoginLayout,
    component: Login,
  },
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  },
  {
    path: '/sys/users',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: UserList,
      },
    ],
  },
  {
    path: '/sys/role',
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoleList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: RoleList,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routerConfig;
