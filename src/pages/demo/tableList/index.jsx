import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, message, Modal } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import ModalInfo from '@/common/components/Modal';
import TableList, { Search, Table, Action } from '@/common/components/TableList';
import TableListAdd from './TableListAdd';
import TableListEdit from './TableListEdit';
import request from '@/common/utils/request'

export default class TableListDemo extends Component {
  constructor(props) {
    super(props);

  }
  /**
   * 渲染操作列
   * text: 当前行的值
   * record: 当前行数据
   * index: 行索引
   */
  renderColAction = (text, record, index) => {
    return (
      <>
        <a onClick={() => this.refs.editDemoModal.show(record)}>修改</a>
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
          request.delete("/goods/delete", { data: selectRecrods.map(item => item.id) }).then(res => {
            resolve();
          }).catch(() => reject());
        });
      }
    });
  }
  renderStatus = (text, record, index) => {
    if (record.status == 1) {
      return "上架";
    } else if (record.status == 0) {
      return "下架";
    }
  }
  renderImg = (text, record, index) => {

    return (
      <img width={100} src={record.img}></img>
    )
  }
  render() {
    return (
      <GridContent>
        <TableList ref='tableList'>
          <Search>
            <Input label='商品名称' name='name' />
            <Select label='商品状态' name='status'>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">下架</Select.Option>
              <Select.Option value="1">上架</Select.Option>
            </Select>
            <DatePicker.RangePicker label="商品有效期" name='date' />
          </Search>
          <Action>
            <Button type="primary" icon="plus" onClick={() => this.refs.addDemoModal.show()}>添加</Button>
            <Button type="primary" icon="delete" onClick={() => this.delete()}>删除</Button>
          </Action>
          <Table url='/goods'>
            <Table.Column title="商品名称" dataIndex="name"></Table.Column>
            <Table.Column title="商品图片" dataIndex="img" render={this.renderImg}></Table.Column>
            <Table.Column title="商品状态" dataIndex="status" render={this.renderStatus}></Table.Column>
            <Table.Column title="创建时间" dataIndex="createDate"></Table.Column>
            <Table.Action render={this.renderColAction}></Table.Action>
          </Table>
        </TableList>
        <ModalInfo title='添加商品' ref="addDemoModal" {...this.refs}>
          <TableListAdd />
        </ModalInfo>
        <ModalInfo title='修改商品' ref="editDemoModal" {...this.refs}>
          <TableListEdit />
        </ModalInfo>
      </GridContent>
    );
  }
}
