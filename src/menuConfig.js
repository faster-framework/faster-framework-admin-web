// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '我的工作台',
    path: '/',
    icon: 'home',
  },
  {
    name: '系统管理',
    icon: 'yonghu',
    path: '/sys',
    children: [
      { name: '用户管理', path: '/users/list', code: 'users:manage' },
      { name: '角色管理', path: '/role/list', code: 'roles:manage' },
    ],
  },
];

const recursiveMenu = [];
/**
 * 递归处理子类path，继承父类path，返回扁平列表
 */
function recursiveMenuConfig(config = [], parent) {
  config.forEach((item) => {
    if (parent) {
      item.path = parent.path + item.path;
    }
    if (Array.isArray(item.children)) {
      recursiveMenuConfig(item.children, item);
    }
    const recuriveItem = {
      name: item.name,
      path: item.path,
    }
    recursiveMenu.push(recuriveItem);
  });
}
recursiveMenuConfig(asideMenuConfig, null);
export { headerMenuConfig, asideMenuConfig, recursiveMenu };
