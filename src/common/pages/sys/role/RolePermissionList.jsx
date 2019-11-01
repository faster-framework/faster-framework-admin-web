import React, { Component } from 'react';
import { message, } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import TableList, { Table } from '@/common/components/TableList';
import request from '@/common/utils/request'


export default class UserRoleList extends Component {
  constructor(props) {
    super(props)
    request.get("/sys/roles/" + this.props.currentRecord.id + '/permissions').then((response) => {
      this.refs.tableList.initSelect(response);
    })
  }

  onOk(modal) {
    const tableSelect = this.refs.tableList.currentSelectRows();
    const data = tableSelect.map(item => {
      return {
        permissionId: item.id
      }
    });
    request.put('/sys/roles/' + this.props.currentRecord.id + '/permissions/choose', { data: { list: data } }).then(res => {
      //提交成功
      message.success('保存成功');
      modal.hideAndRefresh();
    });

  }
  render() {
    return (
      <GridContent>
        <TableList ref='tableList'>
          <Table url='/sys/permissions/tree' pagination={false} defaultExpandAllRows={true}>
            <Table.Column title="权限名称" dataIndex="name" />
            <Table.Column title="权限编码" dataIndex="code" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </Table>
        </TableList >
      </GridContent >
    );
  }
}
