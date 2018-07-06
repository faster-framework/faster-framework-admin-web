import React, { Component } from 'react';
import { Table, Icon, Grid, Button, Input } from '@icedesign/base';
import TableList from '@components/TableList';
import { FormBinder } from '@icedesign/form-binder';
const { Col } = Grid;
export default class RoleList extends Component {
  static displayName = 'RoleList';

  constructor(props) {
    super(props);
    // 默认筛选参数，key与下方筛选条件内的name相对应
    this.defaultFilterParam = {
    }
  }
  render() {
    return (
      <TableList api='/sys/roles' title="角色列表" defaultFilterParam={this.defaultFilterParam}>
        {/* 筛选开始 */}
        <div key="filters">
          <Col xxs="24" l="8">
            <span>角色名称:</span>
            <FormBinder name="name">
              <Input/>
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
          <Table.Column title="角色名称" dataIndex="name" />
          <Table.Column title="创建时间" dataIndex="createDate" />
        </div>
        {/* 列表结束 */}
      </TableList>
    );
  }
}