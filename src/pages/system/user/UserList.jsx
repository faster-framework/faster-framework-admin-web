import React, { Component } from 'react';
import { Table, Icon, Grid, Button } from '@icedesign/base';
import TableList from '@components/TableList';
const { Row, Col } = Grid;
export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TableList api='/sys/users' title="用户列表">
        <div key="filters"></div>
        <div key="operations">
          <Col l="12">
            <Button type="primary">
              <Icon type="add" size="xs" />添加
            </Button>
            <Button type="primary">
              <Icon type="edit" size="xs" />编辑
            </Button>
            <Button type="primary">
              <Icon type="close" size="xs" />删除
            </Button>
          </Col>
        </div>
        <div key="columns">
          <Table.Column title="用户名" dataIndex="account" />
          <Table.Column title="用户姓名" dataIndex="name" />
          <Table.Column title="创建时间" dataIndex="createDate" />
        </div>
      </TableList>
    );
  }
}