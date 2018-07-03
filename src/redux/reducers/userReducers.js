import { asideMenuConfig } from '@/menuConfig';
import { hasPermissionFilter } from '@utils/permissions'

const userInfo = {
  token: null,
  name: null,
  permissions: [],
  menuList: asideMenuConfig
}

const reducers = (state = userInfo, action) => {
  switch (action.type) {
    case 'INIT_PERMISSIONS':
      return Object.assign({}, state, {
        permissions: action.data,
        menuList: state.menuList.filter(item => hasPermissionFilter(action.data, item.code))
      });
    case 'INIT_USER_INFO':
      return Object.assign({}, state, { token: action.data.token, name: action.data.name })
    default:
      return state;
  }
};
export default reducers;