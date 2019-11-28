import React, { Component } from 'react';
import { Col, Row } from 'antd';

export default class Action extends Component {
  componentDidMount() {
    this.props.onRef('action', this)
  }
  render() {
    return (
      <Row>
        <Col>
          {
            React.Children.map(this.props.children, (item, index) => {
              if (item.props.authority) {
                const permissionChildren = React.Children.map(item.props.children, (permissionItem, index) => {
                  return React.cloneElement(permissionItem, { style: { marginRight: 16, marginBottom: 16 }, key: index })
                })
                return React.cloneElement(item, { style: { marginRight: 16, marginBottom: 16 }, key: index, children: permissionChildren })
              }
              return React.cloneElement(item,  { style: { marginRight: 16, marginBottom: 16 }, key: index })
            })
          }
        </Col>
      </Row>
    )
  }
}
