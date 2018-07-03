import { Component } from 'react';
import { permissionUtil } from '@utils';

export default class Permission extends Component {
  render() {
    return permissionUtil.hasPermission(this.props.code) ? this.props.children : null;
  }
}


