import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link to="/" className="logo-text">
          <img
            width="50"
            style={{ marginLeft: 50 }}
            src={require('@/logo.png')}
          />
        </Link>
      </div>
    );
  }
}
