import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';

export default class BaseDialog extends Component {
  static displayName = 'BaseDialog';

  constructor(props) {
    super(props);
    this.state = this.props;
    const style = Object.assign({}, this.state.style, { overflow: 'auto' });
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
        {...this.state}
        visible={this.state.visible}
      >
        {this.props.children}
      </Dialog >
    );
  }
}
