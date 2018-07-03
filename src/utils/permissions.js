import store from '@redux';
export const hasPermission = (code) => {
    const permissions = store.getState().userState.permissions;
    return hasPermissionFilter(permissions,code);
}

export const hasPermissionFilter = (permissions,code)=>{
    if (!Array.isArray(permissions) || permissions.length === 0) {
        return false;
    }
    if (code === undefined) {
        return true;
    }
    return permissions.indexOf(code) > -1;
}