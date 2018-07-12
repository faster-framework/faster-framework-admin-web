import React, { Component } from 'react';
import { Table, Icon, Grid, Button, Input, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import { FormBinder } from '@icedesign/form-binder';
import Dialog from '@components/Dialog';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import PwdModify from './PwdModify';
import { http } from '@utils';
import Permission from '@components/Permission';
const { Col } = Grid;
export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    // 默认筛选参数，key与下方筛选条件内的name相对应
    this.defaultFilterParam = {
    }
  }

  /**
   * 选择验证
   */
  chooseAndShow = (dialog) => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    if (selectRecrod.length == 1) {
      dialog.show();
    } else {
      Feedback.toast.error('请选择一条记录！');
    }
  }

  /**
   * 重置密码
   */
  pwdReset = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    http.put(`/sys/users/${selectRecrod[0].id}/password/reset`).then(() => {
      this.refs.pwdResetDialog.hide();
      this.refs.tableList.refresh();
    });
  }

  /**
   * 删除
   */
  delete = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    http.delete("/sys/users/" + selectRecrod[0].id).then(() => {
      this.refs.deleteDialog.hide();
      this.refs.tableList.refresh();
    });
  }

  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/users' title="用户列表" defaultFilterParam={this.defaultFilterParam}>
          {/* 筛选开始 */}
          <div key="filters">
            <Col xxs="24" l="8">
              <span>用户名称:</span>
              <FormBinder name="name">
                <Input />
              </FormBinder>
            </Col>
          </div>
          {/* 筛选结束 */}

          {/* 操作开始 */}
          <div key="operations">
            <Col l="12">
              <Permission code="users:add">
                <Button type="primary" onClick={() => this.refs.addDialog.show()}>
                  <Icon type="add" size="xs" />添加
                </Button>
              </Permission>
              <Permission code="users:modify">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.editDialog)}>
                  <Icon type="edit" size="xs" />编辑
                 </Button>
              </Permission>
              <Permission code="users:password:change">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.pwdModifyDialog)}>
                  <Icon type="survey" size="xs" />修改密码
                 </Button>
              </Permission>
              <Permission code="users:password:reset">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.pwdResetDialog)}>
                  <Icon type="refresh" size="xs" />重置密码
                 </Button>
              </Permission>
              <Permission code="users:delete">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.deleteDialog)}>
                  <Icon type="close" size="xs" />删除
                </Button>
              </Permission>
            </Col>
          </div>
          {/* 操作结束 */}

          {/* 列表开始  */}
          <div key="tables">
            <Table.Column title="用户名" dataIndex="account" />
            <Table.Column title="用户姓名" dataIndex="name" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </div>
          {/* 列表结束 */}
        </TableList>
        {/* 表格结束 */}

        {/* 弹框开始 */}

        <Dialog
          title="添加用户"
          ref="addDialog"
          footer={false}
        >
          <UserAdd {...this.refs}></UserAdd>
        </Dialog>
        <Dialog
          title="编辑用户"
          ref="editDialog"
          footer={false}
        >
          <UserEdit {...this.refs}></UserEdit>
        </Dialog>
        <Dialog
          title="修改密码"
          ref="pwdModifyDialog"
          footer={false}
        >
          <PwdModify {...this.refs}></PwdModify>
        </Dialog>
        <Dialog
          title="重置密码"
          ref="pwdResetDialog"
          locale={{ ok: '确认' }}
          onOk={this.pwdReset}
        >
          确认重置密码？
        </Dialog>
        <Dialog
          title="删除用户"
          ref="deleteDialog"
          locale={{ ok: '确认' }}
          onOk={this.delete}
        >
          删除操作不可恢复，确认删除？
        </Dialog>
        {/* 弹框结束 */}

      </div>
    );
  }
}