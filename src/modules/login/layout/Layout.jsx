import React, { Component } from 'react';
import Layout from '@icedesign/layout/lib';
import './Layout.scss';
import { Overlay, Loading } from "@icedesign/base";
import { connect } from 'react-redux'

@connect(state => state)
export default class LoginLayout extends Component {
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
            <img
              className="logo"
              src={require('@/logo.png')}
              alt="logo"
            />
            
            <span className="title" dangerouslySetInnerHTML={{ __html: projectTitle}}></span>
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
