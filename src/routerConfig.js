// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BlankLayout from '@layouts/blankLayout';
import LoginLayout from '@modules/login/layout';
import Dashboard from '@modules/dashborad';
import UserList from '@modules/system/user';
import NotFound from '@modules/notFound';
import Login from '@modules/login';
import RoleList from '@modules/system/role';
import PermissionList from '@modules/system/permission';

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
