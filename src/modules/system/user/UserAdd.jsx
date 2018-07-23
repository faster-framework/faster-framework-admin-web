import React, { Component } from 'react';
import { Input, Grid, Form, Button, Field } from '@icedesign/base';
import { http } from '@utils';
const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class UserAdd extends Component {
    static displayName = 'UserAdd';
    field = new Field(this, {
        deepReset: true // 打开清除特殊类型模式(fileList是数组需要特别开启)
    });
    constructor(props) {
        super(props);
    }

    checkPwd = (rule, value, callback) => {
        if (value && value !== this.field.getValue('password')) {
            callback("两次输入密码不一致！");
        } else {
            callback();
        }
    }
    save = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                return false;
            }
            http.post('/sys/users', values).then(() => {
                this.props.addDialog.hide();
                this.props.tableList.refresh();
            });
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { fixedSpan: 6 },
            wrapperCol: { fixedSpan: 8 },
            style: {
                marginRight: '10px'
            }
        };
        const { init } = this.field;
        return (
            <Form field={this.field}>
                <Row wrap>
                    <FormItem {...formItemLayout} label="账号：">
                        <Input placeholder="请输入账号" {...init("account", { rules: { required: true, message: "请填写账号" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...formItemLayout} label="密码：">
                        <Input htmlType="password" placeholder="请输入密码" {...init("password", { rules: { required: true, message: "请填写密码" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...formItemLayout} label="确认密码：">
                        <Input type="password" placeholder="请确认密码" {...init("confimPwd", {
                            rules: [{ required: true, message: "请确认密码" }, {
                                validator: this.checkPwd.bind(this)
                            }]
                        })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...formItemLayout} label="姓名：">
                        <Input placeholder="请输入姓名"  {...init("name", { rules: { required: true, message: "请填写姓名" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <Col style={{ textAlign: "center" }}>
                        <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                        <Button onClick={() => this.props.addDialog.hide()}>取消</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
