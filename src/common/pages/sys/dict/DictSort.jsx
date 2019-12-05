import React, { Component } from 'react';
import { Input, Form, message, Select, Radio,InputNumber } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';

class DictSort extends Component {
  constructor(props) {
    super(props)
    request.get('/sys/dict/' + this.props.currentRecord.id).then(res => {
      this.props.form.setFieldsValue(res);
    });
  }

  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.put('/sys/dict/' + this.props.currentRecord.id, { data: values }).then(res => {
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
          <Form.Item label="顺序">
            {
              getFieldDecorator("sort", { rules: [{ required: true, message: "请填写顺序" }] })(<InputNumber />)
            }
          </Form.Item>
        </FixedRow>
      </Form >
    );
  }
}
export default Form.create()(DictSort);
