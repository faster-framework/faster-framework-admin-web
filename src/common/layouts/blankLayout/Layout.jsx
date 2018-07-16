import React, { Component } from 'react';
export default class BlankLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        {this.props.children}
      </div>

    );
  }
}
