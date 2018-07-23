// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '我的工作台',
    path: '/',
    icon: 'home',
  },
  {
    name: 'demo',
    path: '/demo',
    icon: 'home',
  },
  {
    name: '系统管理',
    icon: 'yonghu',
    path: '/sys',
    children: [
      { name: '用户管理', path: '/user', code: 'users:manage' },
      { name: '角色管理', path: '/role', code: 'roles:manage' },
      { name: '权限管理', path: '/permission', code: 'users:manage' },
    ],
  },
];

const recursiveMenu = [];
/**
 * 递归处理子类path，继承父类path，返回扁平列表
 */
function recursiveMenuConfig(config = [], parent) {
  config.forEach(item => {
    if (parent) {
      item.path = parent.path + item.path;
    }
    if (Array.isArray(item.children)) {
      recursiveMenuConfig(item.children, item);
    }
    const recuriveItem = {
      name: item.name,
      path: item.path,
    };
    recursiveMenu.push(recuriveItem);
  });
}
recursiveMenuConfig(asideMenuConfig, null);
export { headerMenuConfig, asideMenuConfig, recursiveMenu };
