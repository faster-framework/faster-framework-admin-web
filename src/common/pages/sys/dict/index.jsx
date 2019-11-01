import React, { Component } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import ModalInfo from '@/common/components/Modal';
import TableList, { Search, Table, Action } from '@/common/components/TableList';
import request from '@/common/utils/request'
import Permission from '@/common/components/Permission';
import DictAdd from './DictAdd';
import DictEdit from './DictEdit';


export default class DictList extends Component {
  /**
   * 渲染操作列
   * text: 当前行的值
   * record: 当前行数据
   * index: 行索引
   */
  renderColAction = (text, record, index) => {
    return (
      <>
        <Permission authority="dict:modify">
          <a onClick={() => this.refs.editModal.show(record)}>修改</a>
        </Permission>
        <Permission authority="dict:delete">
          <a onClick={() => this.delete(record)}>删除</a>
        </Permission>
      </>
    );
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
      onOk() {
        return new Promise((resolve, reject) => {
          request.delete("/sys/dict/delete", { data: selectRecrods.map(item => item.id) } ).then(res => {
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
            <Input label='字典名称' name='name' />
            <Input label='字典类型' name='type' />
            <Input label='字典值' name='dictValue' />
            <Input label='字典描述' name='remark' />
          </Search>
          <Action>
            <Permission authority="dict:add">
              <Button type="primary" icon="plus" onClick={() => this.refs.addModal.show()}>添加</Button>
            </Permission>
            <Permission authority="dict:delete">
              <Button type="primary" icon="delete" onClick={() => this.delete()}>删除</Button>
            </Permission>
          </Action>
          <Table url='/sys/dict' defaultParam={{ showStatus: 1 }}>
            <Table.Column title="字典名称" dataIndex="name" />
            <Table.Column title="字典值" dataIndex="dictValue" />
            <Table.Column title="字典类型" dataIndex="type" />
            <Table.Column title="描述" dataIndex="remark" />
            <Table.Action render={this.renderColAction}></Table.Action>
          </Table>
        </TableList >
        <ModalInfo title='添加字典' ref="addModal" {...this.refs}>
          <DictAdd />
        </ModalInfo>
        <ModalInfo title='编辑字典' ref="editModal" {...this.refs}>
          <DictEdit />
        </ModalInfo>
      </GridContent >
    );
  }
}
