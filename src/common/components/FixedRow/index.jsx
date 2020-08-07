import React, { Component } from 'react';
import styles from './index.less';

class FixedRow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { children, ...otherProps } = this.props;
    let className = 'fixed-row';

    if (otherProps.upload) {
      className = 'fixed-row-upload';
    }
    if (otherProps.editor) {
      className = 'fixed-row-editor';
    }
    if(otherProps.full){
      className = 'fixed-row-full';
    }
    return (
      <div className={className}>{children}</div>
    )
  }
}
export default FixedRow;
