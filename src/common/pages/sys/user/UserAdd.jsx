import React, { Component } from 'react';
import { Input, Form, message } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';

class UserAdd extends Component {
  constructor(props) {
    super(props)
  }

  checkPwd = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.post('/sys/users',  { data: values }).then(res => {
        //提交成功
        message.success('保存成功');
        modal.hideAndRefresh();
      });

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FixedRow>
          <Form.Item label="账号">
            {
              getFieldDecorator("account", { rules: [{ required: true, message: "请填写账号" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="密码">
            {
              getFieldDecorator("password", { rules: [{ required: true, message: "请填写密码" }] })(<Input type="password" />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="确认密码">
            {
              getFieldDecorator("confimPwd", {
                rules: [{ required: true, message: "请确认密码" }, {
                  validator: this.checkPwd,
                }]
              })(<Input type="password" />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="姓名">
            {
              getFieldDecorator("name", { rules: [{ required: true, message: "请填写姓名" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
      </Form>
    );
  }
}
export default Form.create()(UserAdd);
