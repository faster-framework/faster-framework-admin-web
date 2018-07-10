import React, { Component } from 'react';
import { Table, Button, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import { http } from '@utils';
export default class RolePermissionList extends Component {
  static displayName = 'RolePermissionList';

  constructor(props) {
    super(props);
    this.selectRecord = this.props.tableList.getSelectRecords()[0];
    this.state = {
      defaultSelectedRows: []
    }

    http.get("/sys/roles/" + this.selectRecord.id + '/permissions').then((response) => {
      this.refs.tableList.initSelectKeys(response.data);
    })
  }

  save = () => {
    const tableSelect = this.refs.tableList.getSelectRecords();
    const request = tableSelect.map(item => {
      return {
        permissionId: item.id
      }
    })
    http.put('/sys/roles/' + this.selectRecord.id + '/permissions/choose', {
      list: request
    }).then(() => {
      Feedback.toast.success('保存成功');
    })
  }

  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/permissions/tree' title="权限列表" defaultFilterParam={this.defaultFilterParam}>

          {/* 列表开始  */}
          <div key="tables" isTree={true} rowSelection={{ mode: 'multiple', selectedRowKeys: this.state.selectedRowKeys }}>
            <Table.Column title="权限名称" dataIndex="name" />
            <Table.Column title="权限编码" dataIndex="code" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </div>
          {/* 列表结束 */}
        </TableList>
        {/* 表格结束 */}
        <div style={{ textAlign: "center" }}>
          <Button type="primary" style={{ 'marginRight': '10px' }} onClick={this.save}>保存</Button>
          <Button onClick={() => this.props.choosePermissionsDialog.hide()}>取消</Button>
        </div>
      </div>
    );
  }
}