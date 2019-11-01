import React, { Component } from 'react';
import { Input, Form } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import UploadImg from '@/common/components/UploadImg';
import request from '@/common/utils/request';
import Editor from '@/common/components/BraftEditor';

class TableListEdit extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    request.get('/goods/' + this.props.currentRecord.id).then(res => {
      this.props.form.setFieldsValue(res);
    });
  }
  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.put('/goods/' + this.props.currentRecord.id,  { data: values }).then(res => {
        //提交成功
        modal.hideAndRefresh();
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FixedRow upload>
          <Form.Item label="上传图片">
            {getFieldDecorator('img', { rules: [] })(
              <UploadImg />
            )}
          </Form.Item>
        </FixedRow>
        <FixedRow>
          <Form.Item label="姓名">
            {
              getFieldDecorator("name", { rules: [{ required: true }] })(<Input />)
            }
          </Form.Item>
          <Form.Item label="创建时间">
            {
              getFieldDecorator("createDate", { rules: [{ required: true }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow editor>
          <Form.Item label="介绍">
            {
              getFieldDecorator("content", {rules: [{ required: true }] })(<Editor />)
            }
          </Form.Item>
        </FixedRow>
      </Form>
    );

  }
}
export default Form.create()(TableListEdit);
