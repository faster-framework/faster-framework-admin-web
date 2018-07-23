import React, { Component } from 'react';
import { Input, Grid, Form, Button, Feedback, Field } from '@icedesign/base';
import { http } from '@utils';


const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class UserAdd extends Component {
    static displayName = 'pwdModify';
    field = new Field(this, {
        deepReset: true // 打开清除特殊类型模式(fileList是数组需要特别开启)
    });
    constructor(props) {
        super(props);
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        this.field.setValue("id", selectRecord.id);
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
            http.put(`/sys/users/${values.id}/password/change`, values).then(() => {
                Feedback.toast.success('密码修改成功');
                this.props.pwdModifyDialog.hide();
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
                    <FormItem {...formItemLayout} label="旧密码：">
                        <Input htmlType="password" placeholder="请输入旧密码" {...init("oldPwd", { rules: { required: true, message: "请填写旧密码" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...formItemLayout} label="新密码：">
                        <Input htmlType="password" placeholder="请输入新密码" {...init("password", { rules: { required: true, message: "请填写新密码" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...formItemLayout} label="确认密码：">
                        <Input htmlType="password" placeholder="请确认密码" {...init("confimPwd", {
                            rules: [{ required: true, message: "请确认密码" }, {
                                validator: this.checkPwd.bind(this)
                            }]
                        })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <Col style={{ textAlign: "center" }}>
                        <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                        <Button onClick={() => this.props.pwdModifyDialog.hide()}>取消</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
