import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';

class ModelContent extends Component {
  constructor(props) {
    super(props);

  }
  ok = () => {
    if (this.refs.modalInfo && this.refs.modalInfo.onOk) {
      this.refs.modalInfo.onOk(this.props.model);
    }else{
      this.props.model.hide();
    }
  }
  componentDidMount() {
    this.props.onRef('modelcontent', this)
  }
  render() {
    const { children, globalLoading, ...otherProps } = this.props;
    return (
      <Spin size="large" spinning={globalLoading}>
      <div className='fit-modal-content'>
        {React.Children.map(children, (item, index) => {
          return React.cloneElement(item, { wrappedComponentRef: this.props.wrappedComponentRef, currentRecord: this.props.currentRecord, ref: "modalInfo" })
        })}
      </div>
    </Spin>
    );
  }
}
export default connect(({ global }) => ({
  globalLoading: global.loading
}))(ModelContent);
