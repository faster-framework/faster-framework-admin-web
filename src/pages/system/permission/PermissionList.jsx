import React, { Component } from 'react';
import { Table, Icon, Grid, Button, Input, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import { FormBinder } from '@icedesign/form-binder';
import Dialog from '@components/Dialog';
import PermissionAdd from './PermissionAdd';
import PermissionEdit from './PermissionEdit';
import { http } from '@utils';
import Permission from '@components/Permission';
const { Col } = Grid;
export default class PermissionList extends Component {
  static displayName = 'PermissionList';

  constructor(props) {
    super(props);
    // 默认筛选参数，key与下方筛选条件内的name相对应
    this.defaultFilterParam = {
    }
  }
  /**
   * 删除
   */
  delete = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    http.delete("/sys/permissions/" + selectRecrod[0].id).then(() => {
      this.refs.deleteDialog.hide();
      this.refs.tableList.refresh();
    });
  }

  /**
   * 删除对话框弹出
   */
  showDeleteDialog = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    if (selectRecrod.length == 1) {
      this.refs.deleteDialog.show();
    } else {
      Feedback.toast.error('请选择一条记录！');
    }
  }
  /**
   * 编辑对话框弹出
   */
  showEditDialog = () => {
    const selectRecrod = this.refs.tableList.getSelectRecords();
    if (selectRecrod.length == 1) {
      this.refs.editDialog.show();
    } else {
      Feedback.toast.error('请选择一条记录！');
    }
  }

  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/permissions/tree' title="权限列表" defaultFilterParam={this.defaultFilterParam}>
          {/* 筛选开始 */}
          <div key="filters">
            <Col xxs="24" l="8">
              <span>权限名称:</span>
              <FormBinder name="name">
                <Input />
              </FormBinder>
            </Col>
          </div>
          {/* 筛选结束 */}

          {/* 操作开始 */}
          <div key="operations">
            <Col l="12">
              <Permission code="permissions:add">
                <Button type="primary" onClick={() => this.refs.addDialog.show()}>
                  <Icon type="add" size="xs" />添加
                </Button>
              </Permission>
              <Permission code="permissions:modify">
                <Button type="primary" onClick={this.showEditDialog}>
                  <Icon type="edit" size="xs" />编辑
                 </Button>
              </Permission>
              <Permission code="permissions:delete">
                <Button type="primary" onClick={this.showDeleteDialog}>
                  <Icon type="close" size="xs" />删除
                </Button>
              </Permission>
            </Col>
          </div>
          {/* 操作结束 */}

          {/* 列表开始  */}
          <div key="tables" isTree={true}>
            <Table.Column title="权限名称" dataIndex="name" />
            <Table.Column title="权限编码" dataIndex="code" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </div>
          {/* 列表结束 */}
        </TableList>
        {/* 表格结束 */}

        {/* 弹框开始 */}

        <Dialog
          title="添加权限"
          ref="addDialog"
          footer={false}
        >
          <PermissionAdd {...this.refs}></PermissionAdd>
        </Dialog>
        <Dialog
          title="编辑权限"
          ref="editDialog"
          footer={false}
        >
          <PermissionEdit {...this.refs}></PermissionEdit>
        </Dialog>
        <Dialog
          title="删除权限"
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