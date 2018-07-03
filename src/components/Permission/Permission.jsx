import { Component } from 'react';
import store from '@redux';
import { permissionUtil } from '@utils';

export default class Permission extends Component {
  render() {
    const permissions = store.getState().userReducers.permissions;
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return null;
    }
    return permissionUtil.hasPermission(this.props.code) ? this.props.children : null;
  }
}


