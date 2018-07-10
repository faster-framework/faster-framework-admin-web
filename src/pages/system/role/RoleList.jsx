import React, { Component } from 'react';
import { Table, Icon, Grid, Button, Input, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import { FormBinder } from '@icedesign/form-binder';
import Dialog from '@components/Dialog';
import RoleAdd from './RoleAdd';
import RoleEdit from './RoleEdit';
import { http } from '@utils';
import Permission from '@components/Permission';
import RolePermissionList from './RolePermissionList';
const { Col } = Grid;
export default class RoleList extends Component {
  static displayName = 'RoleList';

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
   * 删除
   */
  delete = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    http.delete("/sys/roles/" + selectRecrod[0].id).then(() => {
      this.refs.deleteDialog.hide();
      this.refs.tableList.refresh();
    });
  }

  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/roles' title="角色列表" defaultFilterParam={this.defaultFilterParam}>
          {/* 筛选开始 */}
          <div key="filters">
            <Col xxs="24" l="8">
              <span>角色名称:</span>
              <FormBinder name="name">
                <Input />
              </FormBinder>
            </Col>
          </div>
          {/* 筛选结束 */}

          {/* 操作开始 */}
          <div key="operations">
            <Col l="12">
              <Permission code="roles:add">
                <Button type="primary" onClick={() => this.refs.addDialog.show()}>
                  <Icon type="add" size="xs" />添加
                </Button>
              </Permission>
              <Permission code="roles:modify">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.editDialog)}>
                  <Icon type="edit" size="xs" />编辑
                 </Button>
              </Permission>
              <Permission code="roles:delete">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.deleteDialog)}>
                  <Icon type="close" size="xs" />删除
                </Button>
              </Permission>
              <Permission code="roles:permissions:list">
                <Button type="primary" onClick={() => this.chooseAndShow(this.refs.choosePermissionsDialog)}>
                  <Icon type="set" size="xs" />选择权限
                </Button>
              </Permission>
            </Col>
          </div>
          {/* 操作结束 */}

          {/* 列表开始  */}
          <div key="tables">
            <Table.Column title="角色名称" dataIndex="name" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </div>
          {/* 列表结束 */}
        </TableList>
        {/* 表格结束 */}

        {/* 弹框开始 */}

        <Dialog
          title="添加角色"
          ref="addDialog"
          footer={false}
        >
          <RoleAdd {...this.refs}></RoleAdd>
        </Dialog>
        <Dialog
          title="编辑角色"
          ref="editDialog"
          footer={false}
        >
          <RoleEdit {...this.refs}></RoleEdit>
        </Dialog>
        <Dialog
          title="删除角色"
          ref="deleteDialog"
          locale={{ ok: '确认' }}
          onOk={this.delete}
        >
          删除操作不可恢复，确认删除？
        </Dialog>
        <Dialog
          title="选择权限"
          ref="choosePermissionsDialog"
          footer={false}
        >
          <RolePermissionList {...this.refs}></RolePermissionList>
        </Dialog>
        {/* 弹框结束 */}

      </div>
    );
  }
}