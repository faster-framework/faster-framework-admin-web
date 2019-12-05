import React, { Component } from 'react';
import { Input, Form, message,InputNumber } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';

class DictEdit extends Component {
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
      request.put('/sys/dict/' + this.props.currentRecord.id,  { data: values }).then(res => {
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
          <Form.Item label="字典名称">
            {
              getFieldDecorator("name", { rules: [{ required: true, message: "请填写字典名称" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="字典值">
            {
              getFieldDecorator("dictValue", { rules: [{ required: true, message: "请填写字典值" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="字典类型">
            {
              getFieldDecorator("type", { rules: [{ required: true, message: "请填写字典类型" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="描述">
            {
              getFieldDecorator("remark", { rules: [{}] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="顺序">
            {
              getFieldDecorator("sort", { })(<InputNumber />)
            }
          </Form.Item>
        </FixedRow>
      </Form >
    );
  }
}
export default Form.create()(DictEdit);
