import React, { Component } from 'react';

export default class Action extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}
