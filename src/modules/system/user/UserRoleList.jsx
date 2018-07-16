import React, { Component } from 'react';
import { Table, Button, Feedback } from '@icedesign/base';
import TableList from '@components/TableList';
import { http } from '@utils';
export default class UserRolelist extends Component {
  static displayName = 'UserRolelist';

  constructor(props) {
    super(props);
    this.selectRecord = this.props.tableList.getSelectRecords()[0];
    http.get("/sys/users/" + this.selectRecord.id + '/roles').then((response) => {
      this.refs.tableList.initSelectKeys(response.data);
    })
  }

  save = () => {
    const tableSelect = this.refs.tableList.getSelectRecords();
    const request = tableSelect.map(item => {
      return {
        roleId: item.id
      }
    })
    http.put('/sys/users/' + this.selectRecord.id + '/roles/choose', {
      list: request
    }).then(() => {
      Feedback.toast.success('保存成功');
    })
  }

  render() {
    return (
      <div>
        {/* 表格开始 */}
        <TableList ref="tableList" api='/sys/roles' title="角色列表" defaultFilterParam={this.defaultFilterParam}>

          {/* 列表开始  */}
          <div key="tables" rowSelection={{ mode: 'multiple' }}>
            <Table.Column title="角色名称" dataIndex="name" />
            <Table.Column title="创建时间" dataIndex="createDate" />
          </div>
          {/* 列表结束 */}
        </TableList>
        {/* 表格结束 */}
        <div style={{ textAlign: "center" }}>
          <Button type="primary" style={{ 'marginRight': '10px' }} onClick={this.save}>保存</Button>
          <Button onClick={() => this.props.chooseRoleDialog.hide()}>取消</Button>
        </div>
      </div>
    );
  }
}