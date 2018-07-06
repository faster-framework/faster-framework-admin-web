import React, { Component } from 'react';
import { Table, Icon, Grid, Button, Select, Input } from '@icedesign/base';
import TableList from '@components/TableList';
import { FormBinder } from '@icedesign/form-binder';
const { Col } = Grid;
export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TableList api='/sys/users' title="用户列表">
        {/* 筛选开始 */}
        <div key="filters">
          <Col xxs="24" l="8">
            <span>账号:</span>
            <FormBinder name="account">
              <Input />
            </FormBinder>
          </Col>
          <Col xxs="24" l="8">
            <span>姓名:</span>
            <FormBinder name="name">
              <Input />
            </FormBinder>
          </Col>
        </div>
        {/* 筛选结束 */}

        {/* 操作开始 */}
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
        {/* 操作结束 */}

        {/* 列表开始 */}
        <div key="columns">
          <Table.Column title="账号" dataIndex="account" />
          <Table.Column title="姓名" dataIndex="name" />
          <Table.Column title="创建时间" dataIndex="createDate" />
        </div>
        {/* 列表结束 */}
      </TableList>
    );
  }
}