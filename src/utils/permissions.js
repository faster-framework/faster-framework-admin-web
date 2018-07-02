import store from '@redux';
export const hasPermission = (code) => {
    const permissions = store.getState().userReducers.permissions;
    if (!Array.isArray(permissions) || permissions.length === 0) {
        return false;
    }
    if (code === 'dashborad') {
        return true;
    }
    return permissions.indexOf(code) > -1;
}