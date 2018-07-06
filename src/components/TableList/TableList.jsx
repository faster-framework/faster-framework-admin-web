import React, { Component } from 'react';
import { Table, Pagination, Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { http } from '@utils'
import Filter from './Filter'
const { Row } = Grid;
import './scss/tableList.scss';
export default class UserList extends Component {
    static displayName = 'UserList';

    constructor(props) {
        super(props);
        let columns, operations, filters;
        //如果只存在一个节点
        if (this.props.children.length == 1 && this.props.children.key === 'columns') {
            columns = this.props.children.props.children;
        }
        //如果存在多个节点
        if (this.props.children.length > 1) {
            columns = this.props.children.find(item => item.key === 'columns').props.children;
            operations = this.props.children.find(item => item.key === 'operations').props.children;
            filters = this.props.children.find(item => item.key === 'filters').props.children;
        }
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
            columns: columns,
            filters: filters,
            operations: operations,
            api: this.props.api,
            title: this.props.title
        };
        this.loadData();
    }
    /**
     * 加载数据
     * 
     */
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
        })
    }


    onPageNumChange = (pageNum) => {
        this.loadData(pageNum);
    }

    onPageSizeChange = (pageSize) => {
        this.loadData(1, pageSize);
    }

    render() {
        return (

            <div>
                <Filter />
                <IceContainer title={this.state.title}>
                    <Row wrap className="operation">
                        {this.state.operations}
                    </Row>
                    <Table
                        dataSource={this.state.list}
                        hasBorder={false}
                    >
                        {this.state.columns}
                    </Table>
                    <Pagination
                        className="pagination"
                        pageSizeSelector="dropdown"
                        total={this.state.pageParam.pages}
                        pageSize={this.state.pageParam.pageSize}
                        onChange={this.onPageNumChange}
                        onPageSizeChange={this.onPageSizeChange}
                    />
                </IceContainer>
            </div>

        );
    }
}
