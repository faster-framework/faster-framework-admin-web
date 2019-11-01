import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, message, Modal } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import TableList, { Search, Table, Action } from '@/common/components/TableList';
import request from '@/common/utils/request'


export default class TreeListDemo extends Component {
  /**
   * 渲染操作列
   * text: 当前行的值
   * record: 当前行数据
   * index: 行索引
   */
  renderColAction = (text, record, index) => {
    return (
      <>
        <a onClick={() => this.delete(record)}>删除</a>
      </>
    );
  }
  delete = (record) => {
    const selectRecrods = this.refs.tableList.currentSelectRows(record);
    if (selectRecrods.length == 0) {
      message.error('请选择至少一条记录！');
      return;
    }
    Modal.confirm({
      title: '删除商品',
      okText: "确认",
      cancelText: "取消",
      centered: true,
      content: '删除所选内容，不可恢复，确认删除？',
      onOk() {
        return new Promise((resolve, reject) => {
          request.delete("/roles", { data: selectRecrods.map(item => item.id) }).then(res => {
            resolve();
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
            <Input label='姓名' name='name' />
            <Input label='年龄' name='name1' />
            <Input label='订单号' name='name2' />
            <DatePicker.RangePicker label="日志范围" name='date' />
            <Select label='科目类型' name='name3'>
              <Select.Option value="lucy">Lucy</Select.Option>
            </Select>
            <Input label='年龄' name='name1' />
            <Input label='订单号' name='name2' />
            <Input label='年龄' name='name1' />
            <Input label='订单号' name='name2' />
            <Input label='年龄' name='name1' />
            <Input label='订单号' name='name2' />
          </Search>
          <Action>
            <Button type="primary" icon="delete" onClick={() => this.delete()}>删除</Button>
          </Action>
          <Table url='/sys/permissions/tree' pagination={false}>
            <Table.Column title="姓名" dataIndex="name"></Table.Column>
            <Table.Column title="创建时间" dataIndex="createDate"></Table.Column>
            <Table.Action render={this.renderColAction}></Table.Action>
          </Table>
        </TableList>
      </GridContent>
    );
  }
}
