import React, { Component } from 'react';
import { Table, Icon } from '@icedesign/base';
import TableList from '@components/TableList';
export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
  }


  renderOper = () => {
    return (
      <div>
        <Icon type="edit" size="small" />
      </div>
    );
  };

  render() {
    return (
      <TableList api='/sys/users'>
        <div key="filter">filter</div>
        <div>
          <Table.Column title="用户名" dataIndex="account" />
          <Table.Column title="用户姓名" dataIndex="name" />
          <Table.Column title="创建时间" dataIndex="createDate" />
          <Table.Column title="操作" cell={this.renderOper} />
        </div>
      </TableList>
    );
  }
}

