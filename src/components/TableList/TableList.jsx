import React, { Component } from 'react';
import { Table, Pagination, Icon } from '@icedesign/base';
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
            list: [],
            columns: null,
            api: this.props.api
        };
    }
    componentDidMount() {
        this.loadData();
        console.info(this.props.children);
    }

    loadData = (pageNum = this.state.pageParam.pageNum, pageSize = this.state.pageParam.pageSize) => {
        const pageReq = { pageNum: pageNum, pageSize: pageSize };
        this.setState({ pageParam: Object.assign({}, this.state.pageParam, pageReq) });
        //获取用户列表数据
        http.get(this.state.api, {
            params: Object.assign({}, this.state.query, pageReq)
        }).then(response => {
            const resultData = response.data;
            this.setState({
                list: resultData.list,
                pageParam: Object.assign({}, this.state.pageParam, {
                    pages: resultData.pages
                })
            });
        });
    }


    onPageNumChange = (pageNum) => {
        this.loadData(pageNum);
    }

    onPageSizeChange = (pageSize) => {
        this.loadData(1, pageSize);
    }

    render() {
        return (
            <div style={styles.tableContainer}>
                <Table
                    dataSource={this.state.list}
                    hasBorder={false}
                >
                    {/* {this.props.children} */}
                </Table>
                <Pagination
                    pageSizeSelector="dropdown"
                    total={this.state.pageParam.pages}
                    pageSize={this.state.pageParam.pageSize}
                    style={styles.pagination}
                    onChange={this.onPageNumChange}
                    onPageSizeChange={this.onPageSizeChange}
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
