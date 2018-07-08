// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BlankLayout from './layouts/blankLayout';
import LoginLayout from '@pages/login/layout';
import Dashboard from './pages/dashborad';
import UserList from './pages/system/user';
import NotFound from './pages/notFound';
import Login from './pages/login';
import RoleList from './pages/system/role';
import PermissionList from './pages/system/permission';

const routerConfig = [
  {
    path: '/login',
    layout: LoginLayout,
    component: Login,
  },
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/sys/user',
    component: UserList
  },
  {
    path: '/sys/role',
    component: RoleList
  },
  {
    path: '/sys/permission',
    component: PermissionList
  },
  {
    path: '*',
    layout: BlankLayout,
    component: NotFound,
  },
];

export default routerConfig;
