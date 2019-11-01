import React, { Component } from 'react';
import { Input, Form, message } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';

class RoleAdd extends Component {
  constructor(props) {
    super(props)
  }

  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.post('/sys/roles',  { data: values }).then(res => {
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
          <Form.Item label="角色名称">
            {
              getFieldDecorator("name", { rules: [{ required: true, message: "请填写角色名称" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
      </Form>
    );
  }
}
export default Form.create()(RoleAdd);
