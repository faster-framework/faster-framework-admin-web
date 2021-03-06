import React, { Component } from 'react';
import { Card } from 'antd';
import TablePro from '@/common/components/TableList/TablePro';
import SearchPro from '@/common/components/TableList/Search';
import ActionPro from '@/common/components/TableList/Actions';

class TableList extends Component {
  constructor(props) {
    super(props)
  }
  bindRef = (name, ref) => {
    this[name] = ref;
  }
  handleSearch = (values) => {
    values.current = this.table.state.current;
    values.size = this.table.state.pageSize;
    this.table.loadData(values);
  }
  currentSelectRows = (record) => {
    if (record) {
      return [record];
    }
    return this.table.currentSelectRows();
  }
  initSelect = (values) => {
    this.table.initSelect(values);
  }
  reload = () => {
    this.table.reload()
  }
  render() {
    const children = React.Children.map(this.props.children, (item, index) => {
      const { children, ...otherProps } = item.props;
      //搜索，需要绑定查询事件
      otherProps.handleSearch = this.handleSearch;
      otherProps.onRef = this.bindRef;
      const newItem = React.cloneElement(item, otherProps);
      return newItem;
    });
    return (
      <Card bordered={false} title={this.props.title}>
        {children}
      </Card>
    )
  }
}

export const Table = TablePro;
export const Search = SearchPro;
export const Action = ActionPro;
export default TableList;
