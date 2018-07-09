import React, { Component } from 'react';
import { Input, Grid, Form, Button, TreeSelect } from '@icedesign/base';
import { http, utils } from '@utils';
import {
    FormBinderWrapper,
    FormBinder,
    FormError,
} from '@icedesign/form-binder';


const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class RoleAdd extends Component {
    static displayName = 'RoleAdd';
    constructor(props) {
        super(props);
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        this.state = {
            values: {
                parentId: selectRecord ? selectRecord.id : null
            },
            permissionTrees: []
        }
        http.get('/sys/permissions').then((response) => {
            //列表转成TreeSelect控件所需数据
            this.setState({
                permissionTrees: utils.convertTreeSelectData(response.data)
            });
        });
    }
    handlePermissionChoose = (value, data) => {
        console.info(this.state.values)
    }

    save = () => {
        this.refs.postForm.validateAll((errors, values) => {
            if (errors) {
                return false;
            }
            http.post('/sys/permissions', this.state.values).then(() => {
                this.props.addDialog.hide();
                this.props.tableList.refresh();
            });
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { fixedSpan: 4 },
            wrapperCol: { fixedSpan: 8 },
            style:{
                marginRight:'10px'
            }
        };
        return (
            <div>
                <FormBinderWrapper value={this.state.values} ref="postForm">
                    <Form>
                        <Row wrap>
                            <FormItem {...formItemLayout} label="权限名称：">
                                <FormBinder name="name" required message="请填写权限名称">
                                    <Input placeholder="请输入权限名称" />
                                </FormBinder>
                                <FormError name="name" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="权限编码：">
                                <FormBinder name="code" required message="请填写权限编码">
                                    <Input placeholder="请输入权限编码" />
                                </FormBinder>
                                <FormError name="code" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="权限编码：">
                                <FormBinder name="code" required message="请填写权限编码">
                                    <Input placeholder="请输入权限编码" />
                                </FormBinder>
                                <FormError name="code" />
                            </FormItem>
                        </Row>
                        <Row wrap>
                            <FormItem {...formItemLayout} label="父级菜单：">
                                <FormBinder name="parentId" required message="请选择父级菜单">
                                    <TreeSelect
                                        dataSource={this.state.permissionTrees}
                                        onChange={this.handlePermissionChoose}
                                    />
                                </FormBinder>
                                <FormError name="parentId" />
                            </FormItem>
                        </Row>
                        <Row wrap>
                            <Col style={{ textAlign: "center" }}>
                                <Button type="primary" style={{ marginRight: "5px" }} onClick={this.save}>保存</Button>
                                <Button onClick={() => this.props.addDialog.hide()}>取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </FormBinderWrapper>
            </div >
        );
    }
}
