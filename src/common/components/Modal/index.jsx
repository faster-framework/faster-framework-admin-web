import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import styles from './index.less'
import ModelContent from './Content';

class BaseModal extends Component {
  state = {
    visible: false
  }
  constructor(props) {
    super(props);

  }
  bindRef = (name, ref) => {
    this[name] = ref;
  }
  hide = () => {
    this.setState({
      visible: false
    })
  };
  hideAndRefresh = () => {
    this.props.tableList.reload();
    this.hide();
  }

  show = (record) => {
    this.setState({
      visible: true,
      currentRecord: record
    });
  }
  ok = () => {
    if (this.form) {
      this.form.onOk(this)
    } else {
      this.modelcontent.ok();
    }
  }
  wrappedComponentRef = (form) => {
    this.form = form;
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { children, globalLoading, ...otherProps } = this.props;
    return (
      <Modal
        destroyOnClose
        centered
        keyboard={false}
        maskClosable={false}
        onCancel={this.hide}
        onOk={this.ok}
        {...otherProps}
        visible={this.state.visible}
        className={this.props.width ? 'fit-modal' : 'fit-modal fit-modal-width'}
      >
        <ModelContent model={this} onRef={this.bindRef} wrappedComponentRef={this.wrappedComponentRef} currentRecord={this.state.currentRecord} >
          {children}
        </ModelContent>
      </Modal >
    );
  }
}
export default BaseModal;
