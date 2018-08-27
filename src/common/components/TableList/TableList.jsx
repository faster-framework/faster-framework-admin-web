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
        let tableProps, tables, operationProps, operations, filterProps, filters;
        if (this.props.children) {
            //如果只存在一个节点
            if (Array.isArray(this.props.children)) {
                let tableFind = this.props.children.find(item => item.key === 'tables');
                tableProps = tableFind ? tableFind.props : tableFind;
                tables = tableProps ? tableProps.children : tableProps;
                let operationFind = this.props.children.find(item => item.key === 'operations');
                operationProps = operationFind ? operationFind.props : operationFind;
                operations = operationProps ? operationProps.children : operationProps;
                let filterFind = this.props.children.find(item => item.key === 'filters');
                filterProps = filterFind ? filterFind.props : filterFind;
                filters = filterProps ? filterProps.children : filterProps;
            } else {
                tableProps = this.props.children.props;
                tables = tableProps.children;
            }
        }
        const defaultSelection = {
            mode: 'single',
            selectedRowKeys: [],
            onSelectAll: this.onSelectAll,
            onSelect: this.onSelect
        }
        if (tableProps) {
            const rowSelection = Object.assign({}, defaultSelection, tableProps.rowSelection);
            tableProps = Object.assign({}, tableProps, { rowSelection: rowSelection, onRowOpen: this.onRowOpen, openRowKeys: [] })
        }
        this.state = {
            filterParam: this.props.defaultFilterParam,
            pageParam: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
            },
            list: [],
            selectRecords: [],
            tableProps: tableProps,
            operationProps: operationProps,
            filterProps: filterProps,
            tables: tables,
            filters: filters,
            operations: operations,
            api: this.props.api,
            title: this.props.title,

        };
        this.renderData = this.props.renderData;
        this.loadData();
    }
    initSelectKeys = (keys) => {
        const rowSelection = Object.assign({}, this.state.tableProps.rowSelection, { selectedRowKeys: keys });
        const tableProps = Object.assign({}, this.state.tableProps, { rowSelection: rowSelection, openRowKeys: keys });
        this.setState({
            selectRecords: keys.map(item => { return { id: item } }),
            tableProps, tableProps
        });
    }
    onRowOpen = (openRowKeys, currentRowKey, opened, currentRecord) => {
        const existRowsKey = this.state.tableProps.openRowKeys;
        if (opened) {
            existRowsKey.push(currentRowKey);
        } else {
            const selectIndex = existRowsKey.indexOf(currentRowKey);
            if (selectIndex > -1) {
                existRowsKey.splice(selectIndex, 1);
            }
        }
        this.setState({
            tableProps: Object.assign({}, this.state.tableProps, { openRowKeys: existRowsKey })
        });
        this.onSelect(true, currentRecord, this.state.selectRecords);
    }
    /**
     * 刷新表格
     */
    refresh = () => {
        this.loadData(1);
    }
    /**
     * 获取当前选择的行
     */
    getSelectRecords = () => {
        return this.state.selectRecords;
    }
    /**
     * 改变选中的值
     */
    changeSelect = (keys, records) => {
        const rowSelectionProps = this.state.tableProps.rowSelection;
        this.setState({
            tableProps: Object.assign({}, this.state.tableProps, { rowSelection: Object.assign({}, rowSelectionProps, { selectedRowKeys: keys }) }),
            selectRecords: records
        });
    }

    /**
     * 点击左上角复选框选择全部
     */
    onSelectAll = (selected, records) => {
        this.changeSelect(records.map(item => item.id), records);
    }
    /**
     * 点击
     */
    onSelect = (selected, record, records) => {
        this.changeSelect(records.map(item => item.id), records);
    }
    /**
     * 当行点击时
     */
    onRowClick = (record, index, e) => {
        const rowSelectionProps = this.state.tableProps.rowSelection;
        let keys = rowSelectionProps.selectedRowKeys;
        let recrods = this.state.selectRecords;
        const existKeyIndex = keys.indexOf(record.id);
        if (rowSelectionProps.mode === 'single') {
            //先清空的，然后加入现在的
            keys = [];
            keys.push(record.id);
            recrods = [];
            recrods.push(record);
        } else { //如果是多选
            //如果相同，删除当前的
            if (existKeyIndex > -1 && keys[existKeyIndex] === record.id) {
                keys.splice(existKeyIndex, 1);
                recrods.splice(existKeyIndex, 1);
            } else {
                //如果不相同，加入
                keys.push(record.id);
                recrods.push(record);
            }
        }
        this.changeSelect(keys, recrods);
    }
    /**
     * 加载数据
     * 
     */
    loadData = (pageNum = this.state.pageParam.pageNum, pageSize = this.state.pageParam.pageSize) => {
        const isTree = this.state.tableProps.isTree;
        const pageReq = isTree ? {} : { pageNum: pageNum, pageSize: pageSize };
        const self = this;
        //获取用户列表数据
        http.get(this.state.api, {
            params: Object.assign({}, this.state.filterParam, pageReq)
        }).then(response => {
            if(self.renderData){
                response.data = self.renderData(response.data);
            }
            const resultData = response.data;
            if (isTree) {
                this.setState({
                    list: resultData
                });
            } else {
                this.setState({
                    list: resultData.list,
                    pageParam: Object.assign({}, this.state.pageParam, {
                        total: Number(resultData.total)
                    })
                });
            }
        })
    }

    /**
     * 当页码改变时
     */
    onPageNumChange = (pageNum) => {
        this.setState(
            {
                pageParam: Object.assign({}, this.state.pageParam, { pageNum: pageNum }),
            }
        );
        this.loadData(pageNum);
    }
    /**
     * 当每页数量改变时
     */
    onPageSizeChange = (pageSize) => {
        this.setState(
            {
                pageParam: Object.assign({}, this.state.pageParam, { pageNum: 1, pageSize: pageSize }),
            }
        );
        this.loadData(1, pageSize);
    }

    /**
     * 查询时
     */
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
                        onRowClick={this.onRowClick}
                        {...this.state.tableProps}
                    >
                        {this.state.tables}
                    </Table>
                    {
                        !this.state.tableProps.isTree &&
                        (<Pagination
                            className="pagination"
                            pageSizeSelector="dropdown"
                            pageSizeList={[10, 20, 50]}
                            total={this.state.pageParam.total}
                            pageSize={this.state.pageParam.pageSize}
                            onChange={this.onPageNumChange}
                            onPageSizeChange={this.onPageSizeChange}
                        />)
                    }

                </IceContainer>
            </div >

        );
    }
}
