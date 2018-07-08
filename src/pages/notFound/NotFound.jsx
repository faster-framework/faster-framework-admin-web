import React, { Component } from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import './NotFound.scss';

export default class NotFound extends Component {
  static displayName = 'NotFound';

  render() {
    return (
      <div className="basic-not-found">
        <div style={styles.exceptionContent} className="exception-content">
          <img
            src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
            style={styles.image}
            className="imgException"
            alt="页面不存在"
          />
          <div className="prompt">
            <h3 style={styles.title} className="title">
              抱歉，你访问的页面不存在
              </h3>
            <p style={styles.description} className="description">
              您要找的页面没有找到，请返回<a href="#">首页</a>继续浏览
              </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
};
