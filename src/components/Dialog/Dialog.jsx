import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';

export default class BaseDialog extends Component {
  static displayName = 'BaseDialog';

  constructor(props) {
    super(props);
    this.state = this.props;
  }

  hide = () => {
    this.setState({
      visible: false
    })
  };

  show = () => {
    this.setState({
      visible: true
    });
  }

  render() {
    return (
      <Dialog
        footerAlign="center"
        autoFocus={false}
        isFullScreen
        onCancel={this.hide}
        onClose={this.hide}
        locale={{ ok: '保存', cancel: '取消' }}
        {...this.props}
        visible={this.state.visible}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
