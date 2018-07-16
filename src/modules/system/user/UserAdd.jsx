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

export default class UserAdd extends Component {
    static displayName = 'UserAdd';
    constructor(props) {
        super(props);
        this.state = {
            values: {
                account: '',
                name: '',
                password: ''
            }
        }
    }
    formChange = value => {
        this.setState({
            value
        });
    };
    checkPass2(rule, value, callback) {
        if (value && value !== this.state.values.password) {
            callback("两次输入密码不一致！");
        } else {
            callback();
        }
    }
    save = () => {
        this.refs.postForm.validateAll((errors, values) => {
            if (errors) {
                return false;
            }
            http.post('/sys/users', this.state.values).then(() => {
                this.props.addDialog.hide();
                this.props.tableList.refresh();
            });
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { fixedSpan: 4 },
            wrapperCol: { fixedSpan: 8 },
            style: {
                marginRight: '10px'
            }
        };
        return (
            <FormBinderWrapper onChange={this.formChange} value={this.state.values} ref="postForm">
                <Form>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="账号：">
                            <FormBinder name="account" required message="请填写账号">
                                <Input placeholder="请输入账号" />
                            </FormBinder>
                            <FormError name="account" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="密码：">
                            <FormBinder name="password" required message="请填写密码">
                                <Input htmlType="password" placeholder="请输入密码" />
                            </FormBinder>
                            <FormError name="password" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="确认密码：">
                            <FormBinder
                                name="ip"
                                rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '请确认密码',
                                },
                                {
                                    validator: this.checkPass2.bind(this)
                                }]}
                            >
                                <Input type="password" placeholder="请确认密码" />
                            </FormBinder>
                            <FormError name="ip" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="姓名：">
                            <FormBinder name="name" required message="请填写姓名">
                                <Input placeholder="请输入姓名" />
                            </FormBinder>
                            <FormError name="name" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <Col style={{ textAlign: "center" }}>
                            <Button type="primary"  style={formItemLayout.style} onClick={this.save}>保存</Button>
                            <Button onClick={() => this.props.addDialog.hide()}>取消</Button>
                        </Col>
                    </Row>
                </Form>
            </FormBinderWrapper>
        );
    }
}
