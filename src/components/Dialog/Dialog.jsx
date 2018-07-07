import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';

export default class BaseDialog extends Component {
  static displayName = 'BaseDialog';

  constructor(props) {
    super(props);
    this.state = this.props;
    const style = Object.assign({}, this.state.style, { minWidth: '320px' });
    this.state = Object.assign({}, this.state, { style: style });
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
        {...this.state}
        visible={this.state.visible}
      >
        {this.props.children}
      </Dialog >
    );
  }
}
