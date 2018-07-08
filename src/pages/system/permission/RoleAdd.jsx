import React, { Component } from 'react';
import { Input, Grid, Form, Button } from '@icedesign/base';
import { http } from '@utils';
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
        this.state = {
            values: {}
        }
    }


    save = () => {
        this.refs.postForm.validateAll((errors, values) => {
            if (errors) {
                return false;
            }
            http.post('/sys/roles', this.state.values).then(() => {
                this.props.addDialog.hide();
                this.props.tableList.refresh();
            });
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6, offset: 1 }
        };
        return (
            <div>
                <FormBinderWrapper value={this.state.values} ref="postForm">
                    <Form>
                        <FormItem {...formItemLayout} label="角色名称：">
                            <FormBinder name="name" required message="请填写角色名称">
                                <Input placeholder="请输入角色名称" />
                            </FormBinder>
                            <FormError name="name" />
                        </FormItem>

                        {/* <FormItem>
                        <Row>
                            <FormItem {...formItemLayout} label="搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="较长搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label="搜索名称：">
                        <Input placeholder="请输入搜索名称" />
                    </FormItem> */}
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <Button type="primary" style={{ marginRight: "5px" }} onClick={this.save}>保存</Button>
                                <Button onClick={()=>this.props.addDialog.hide()}>取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </FormBinderWrapper>
            </div>
        );
    }
}
