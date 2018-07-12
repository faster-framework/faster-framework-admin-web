import React, { Component } from 'react';
import { Table, Icon, Button, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import Dialog from '@components/Dialog';
import { http } from '@utils';
import Permission from '@components/Permission';

import PermissionAdd from './PermissionAdd';
import PermissionEdit from './PermissionEdit';

export default class PermissionList extends Component {
  static displayName = 'PermissionList';

  constructor(props) {
    super(props);
    // 默认筛选参数，key与下方筛选条件内的name相对应
    this.defaultFilterParam = {
    }
  }
  /**
 * 选择验证
 */
  checkAndShow = (dialog) => {
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
    http.delete("/sys/permissions/" + selectRecrod[0].id).then(() => {
      this.refs.deleteDialog.hide();
      this.refs.tableList.refresh();
    });
  }
  /**
   * 渲染操作列
   */
  renderOper = (value, index, record) => {
    return (
      <div className="col-operation">
        <Permission code="permissions:modify">
          <Button shape="text" size="small" onClick={() => this.refs.editDialog.show()}>
            修改
          </Button>
        </Permission>
      </div>
    );
  };
  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/permissions/tree' title="权限列表" defaultFilterParam={this.defaultFilterParam}>
          {/* 操作开始 */}
          <div key="operations">
            <Permission code="permissions:add">
              <Button type="primary" onClick={() => this.refs.addDialog.show()}>
                <Icon type="add" size="xs" />添加
                </Button>
            </Permission>
            <Permission code="permissions:delete">
              <Button type="primary" onClick={() => this.checkAndShow(this.refs.deleteDialog)}>
                <Icon type="close" size="xs" />删除
                </Button>
            </Permission>
          </div>
          {/* 操作结束 */}

          {/* 列表开始  */}
          <div key="tables" isTree={true}>
            <Table.Column title="权限名称" dataIndex="name" />
            <Table.Column title="权限编码" dataIndex="code" />
            <Table.Column title="创建时间" dataIndex="createDate" />
            <Table.Column title="操作" cell={this.renderOper} />
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