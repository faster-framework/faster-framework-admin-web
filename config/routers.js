const routes = [
  {
    path: '/',
    name: '控制台',
    icon: 'home',
    component: './Dashboard',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'setting',
    routes: [
      {
        path: '/user',
        name: '用户管理',
        icon: 'user',
        authority:"users:manage",
        component: '../common/pages/sys/user'
      },
      {
        path: '/role',
        name: '角色管理',
        icon: 'usergroup-add',
        authority:"roles:manage",
        component: '../common/pages/sys/role'
      },
      {
        path: '/permission',
        name: '权限管理',
        icon: 'lock',
        authority:"permissions:manage",
        component: '../common/pages/sys/permission'
      }
      ,
      {
        path: '/dict',
        name: '字典管理',
        icon: 'database',
        authority:"dict:manage",
        component: '../common/pages/sys/dict'
      }
    ]
  },
  {
    path: '/demo',
    name: '基本示例',
    icon: 'smile',
    routes: [
      {
        path: '/tableList',
        name: '表格示例',
        icon: 'smile',
        component: './demo/tableList'
      },
      {
        path: '/treeList',
        name: '树形表格',
        icon: 'smile',
        component: './demo/treeList'
      }
    ]
  },
  {
    component: '../common/pages/404'
  }
]
const flatRoutes = [];
/**
 * 递归处理子类path，继承父类path，返回扁平列表
 */
function flatRoutesFun(routes = [], parent) {
  routes.forEach(item => {
    if (parent) {
      item.path = parent.path + item.path;
    }
    if (Array.isArray(item.routes)) {
      flatRoutesFun(item.routes, item);
    }
    if (item.path != undefined && item.component != undefined) {
      const flatItem = {
        name: item.name,
        path: item.path,
      };
      flatRoutes.push(flatItem);
    }
  });
}
flatRoutesFun(routes, null);
export { flatRoutes };
export default routes;

