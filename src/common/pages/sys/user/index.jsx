import React, { Component } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import ModalInfo from '@/common/components/Modal';
import TableList, { Search, Table, Action } from '@/common/components/TableList';
import request from '@/common/utils/request'
import Permission from '@/common/components/Permission';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import UserPwdModify from './UserPwdModify';
import UserRoleList from './UserRoleList';


export default class UserList extends Component {
  /**
   * 渲染操作列
   * text: 当前行的值
   * record: 当前行数据
   * index: 行索引
   */
  renderColAction = (text, record, index) => {
    return (
      <>
        <Permission authority="users:modify">
          <a onClick={() => this.refs.editModal.show(record)}>修改</a>
        </Permission>
        <Permission authority="users:delete">
          <a onClick={() => this.delete(record)}>删除</a>
        </Permission>
        <Permission authority="users:password:change">
          <a onClick={() => this.refs.pwdModifyModal.show(record)}>修改密码</a>
        </Permission>
        <Permission authority="users:password:reset">
          <a onClick={() => this.pwdReset(record)}>重置密码</a>
        </Permission>
        <Permission authority="users:roles:choose">
          <a onClick={() => this.refs.chooseRoleModal.show(record)}>选择角色</a>
        </Permission>

      </>
    );
  }
  pwdReset = (record) => {
    Modal.confirm({
      title: '重置密码',
      okText: "确认",
      cancelText: "取消",
      centered: true,
      content: '确认将密码重置为“123456”？',
      onOk() {
        return new Promise((resolve, reject) => {
          request.put(`/sys/users/${record.id}/password/reset`).then(res => {
            resolve();
            message.success('密码重置成功');
          }).catch(() => reject());
        });
      }
    });

  }
  delete = (record) => {
    const tableList = this.refs.tableList;
    const selectRecrods = tableList.currentSelectRows(record);
    if (selectRecrods.length == 0) {
      message.error('请选择至少一条记录！');
      return;
    }
    Modal.confirm({
      title: '删除',
      okText: "确认",
      cancelText: "取消",
      centered: true,
      content: '删除操作不可恢复，确认删除？',
      onOk()  {
        return new Promise((resolve, reject) => {
          request.delete("/sys/users/delete", { data: selectRecrods.map(item => item.id) }).then(res => {
            resolve();
            tableList.reload();
          }).catch(() => reject());
        });
      }
    });
  }

  render() {
    return (
      <GridContent>
        <TableList ref='tableList'>
          <Search>
            <Input label='用户名' name='name' />
          </Search>
          <Action>
            <Permission authority="users:add">
              <Button type="primary" icon="plus" onClick={() => this.refs.addModal.show()}>添加</Button>
            </Permission>
            <Permission authority="users:add">
              <Button type="primary" icon="delete" onClick={() => this.delete()}>删除</Button>
            </Permission>
          </Action>
          <Table url='/sys/users'>
            <Table.Column title="用户名" dataIndex="account" />
            <Table.Column title="用户姓名" dataIndex="name" />
            <Table.Column title="创建时间" dataIndex="createDate" />
            <Table.Action render={this.renderColAction}></Table.Action>
          </Table>
        </TableList >
        <ModalInfo title='添加用户' ref="addModal" {...this.refs}>
          <UserAdd />
        </ModalInfo>
        <ModalInfo title='编辑用户' ref="editModal" {...this.refs}>
          <UserEdit />
        </ModalInfo>
        <ModalInfo title='修改密码' ref="pwdModifyModal" {...this.refs}>
          <UserPwdModify />
        </ModalInfo>
        <ModalInfo width="100%" title='选择角色' ref="chooseRoleModal" {...this.refs}>
          <UserRoleList />
        </ModalInfo>
      </GridContent >
    );
  }
}
