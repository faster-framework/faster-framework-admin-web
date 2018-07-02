const userInfo = {
  token: null,
  name: null,
  permissions: []
}

const reducers = (state = userInfo, action) => {
  switch (action.type) {
    case 'INIT_PERMISSIONS':
      return Object.assign({}, state, { permissions: action.data });
    case 'INIT_USER_INFO':
      return Object.assign({}, state, { token: action.data.token, name: action.data.name })
    default:
      return state;
  }
};
export default reducers;