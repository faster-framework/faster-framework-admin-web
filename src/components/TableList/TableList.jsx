import React, { Component } from 'react';
import { Table, Pagination, Grid, Button, Icon, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { http } from '@utils'
import { FormBinderWrapper } from '@icedesign/form-binder';
const { Row } = Grid;
import './scss/tableList.scss';
export default class TableList extends Component {
    static displayName = 'TableList';

    constructor(props) {
        super(props);
        let columns, operations, filters;
        if (this.props.children) {
            //如果只存在一个节点
            if (Array.isArray(this.props.children)) {
                const columsFind = this.props.children.find(item => item.key === 'columns');
                columns = columsFind ? columsFind.props.children : columsFind;
                const operationsFind = this.props.children.find(item => item.key === 'operations');
                operations = operationsFind ? operationsFind.props.children : operationsFind;
                const filtersFind = this.props.children.find(item => item.key === 'filters');
                filters = filtersFind ? filtersFind.props.children : filtersFind;
            } else {
                console.info(this.props.children)
                columns = this.props.children.props.children;
            }
        }
        this.state = {
            filterParam: this.props.defaultFilterParam,
            pageParam: {
                pageSize: 10,
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
        //获取用户列表数据
        http.get(this.state.api, {
            params: Object.assign({}, this.state.filterParam, pageReq)
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
        this.setState(
            {
                pageParam: Object.assign({}, this.state.pageParam, { pageNum: pageNum }),
            }
        );
        this.loadData(pageNum);
    }

    onPageSizeChange = (pageSize) => {
        this.setState(
            {
                pageParam: Object.assign({}, this.state.pageParam, { pageNum: 1, pageSize: pageSize }),
            }
        );
        this.loadData(1, pageSize);
    }
    onQuery = () => {
        this.refs.form.validateAll((errors) => {
            if (errors) {
                Feedback.toast.error(errors[0].message);
                return;
            }
            this.loadData();
        });

    }

    render() {
        return (

            <div>
                {
                    this.state.filters && (
                        <IceContainer title="搜索">
                            <FormBinderWrapper value={this.state.filterParam} ref="form">
                                <Row wrap className="filters">
                                    {this.state.filters}
                                </Row>
                            </FormBinderWrapper>
                            <Button type="primary" onClick={this.onQuery}>
                                <Icon type="search" size="xs" />查询
                            </Button>
                        </IceContainer>
                    )
                }
                <IceContainer title={this.state.title}>
                    {
                        this.state.operations && (
                            <Row wrap className="operation">
                                {this.state.operations}
                            </Row>
                        )
                    }
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
            </div >

        );
    }
}
