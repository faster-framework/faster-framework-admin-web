import React, { Component } from 'react';
import { Input, Grid, Form, Button, Feedback } from '@icedesign/base';
import { http } from '@utils';
import {
    FormBinderWrapper,
    FormBinder,
    FormError,
} from '@icedesign/form-binder';


const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class UserAdd extends Component {
    static displayName = 'pwdModify';
    constructor(props) {
        super(props);
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        this.state = {
            values: {
                id: selectRecord.id,
                oldPwd: '',
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
            http.put(`/sys/users/${this.state.values.id}/password/change`, this.state.values).then(() => {
                Feedback.toast.success('密码修改成功');
                this.props.pwdModifyDialog.hide();
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
                        <FormItem {...formItemLayout} label="旧密码：">
                            <FormBinder name="oldPwd" required message="请填写账号">
                                <Input htmlType="password" placeholder="请输入账号" />
                            </FormBinder>
                            <FormError name="oldPwd" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="新密码：">
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
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    {
                                        validator: this.checkPass2.bind(this)
                                    }]}
                            >
                                <Input htmlType="password" placeholder="请确认密码" />
                            </FormBinder>
                            <FormError name="ip" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <Col style={{ textAlign: "center" }}>
                            <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                            <Button onClick={() => this.props.pwdModifyDialog.hide()}>取消</Button>
                        </Col>
                    </Row>
                </Form>
            </FormBinderWrapper>
        );
    }
}
