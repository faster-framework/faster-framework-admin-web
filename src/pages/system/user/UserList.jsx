import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon } from '@icedesign/base';
import { http } from '@utils'

export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {
      query: {
        name: null,
      },
      pageParam: {
        pageSize: 1,
        pageNum: 1,
        pages: 0,
      },
      list: []
    };
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    //获取用户列表数据
    http.get('/sys/users', {
      params: Object.assign({}, this.state.query, this.state.pageParam)
    }).then(response => {
      const resultData = response.data;
      this.setState({
        list: resultData.list,
        pageParam: Object.assign({}, this.state.pageParam, {
          pageNum: resultData.nextPage,
          pages: resultData.pages
        })
      });
      console.info(this.state);
      console.info(this.state.pageParam.pages)
    });
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <Icon type="edit" size="small" style={styles.editIcon} />
      </div>
    );
  };

  render() {
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={this.state.list}
          hasBorder={false}
        >
          <Table.Column title="用户名" dataIndex="account" />
          <Table.Column title="用户姓名" dataIndex="name" />
          <Table.Column title="创建时间" dataIndex="createDate" />
          <Table.Column title="操作" cell={this.renderOper} />
        </Table>
        <Pagination
          pageSizeSelector="dropdown"
          total={this.state.pageParam.pages}
          pageSize={this.state.pageParam.pageSize}
          style={styles.pagination}
        />
      </div>
    );
  }
}
const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 10px 10px 10px',
  }
};
