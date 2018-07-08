import React, { Component } from '../../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import Layout from '@icedesign/layout/lib';
import './Layout.scss';
import { Overlay, Loading } from "@icedesign/base";
import { connect } from '../../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux'

@connect(state => state)
export default class UserLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (

      <Layout className="user-layout" style={styles.container}>
        <Overlay
          visible={this.props.loadingState.visible}
          align="cc cc"
          hasMask
        >
          <Loading shape="fusion-reactor">
          </Loading>
        </Overlay>
        <div className="header">
          <a href="#" className="meta">
            <img
              className="logo"
              src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png"
              alt="logo"
            />
            <span className="title">飞冰</span>
          </a>
          <p className="desc">飞冰让前端开发简单而友好</p>
        </div>
        {this.props.children}
      </Layout>

    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png)',
    backgroundSize: 'contain',
  },
};
