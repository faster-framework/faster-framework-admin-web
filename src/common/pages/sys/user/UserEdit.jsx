import React, { Component } from 'react';
import { Input, Form, message } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';

class UserEdit extends Component {
  constructor(props) {
    super(props)
    request.get('/sys/users/' + this.props.currentRecord.id).then(res => {
      this.props.form.setFieldsValue(res);
    });
  }
  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.put('/sys/users/' + this.props.currentRecord.id, { data: values }).then(res => {
        //提交成功
        message.success('修改成功');
        modal.hideAndRefresh();
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
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
export default Form.create()(UserEdit);
