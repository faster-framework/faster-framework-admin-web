import React, { Component } from 'react';
import { Modal } from 'antd';
import styles from './index.less'

class BaseModal extends Component {
  state = {
    visible: false
  }
  constructor(props) {
    super(props);

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
    }else{
      this.refs.modalInfo.onOk(this);
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
    const { children, ...otherProps } = this.props;
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
        <div className='fit-modal-content'>
          {React.Children.map(children, (item, index) => {
            return React.cloneElement(item, { wrappedComponentRef: this.wrappedComponentRef, currentRecord: this.state.currentRecord,ref:"modalInfo" })
          })}
        </div>
      </Modal >
    );
  }
}
export default BaseModal;
