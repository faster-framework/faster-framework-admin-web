import React, { Component } from 'react';
import { Input, Form } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import UploadImg from '@/common/components/UploadImg';
import Upload from '@/common/components/Upload';
import request from '@/common/utils/request';
import Editor from '@/common/components/BraftEditor';

class TableListAdd extends Component {
  constructor(props) {
    super(props)
  }
  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.post('/goods',  { data: values }).then(res => {
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
            {getFieldDecorator('imgs', { rules: [] })(
              <UploadImg />
            )}
          </Form.Item>
        </FixedRow>
        <FixedRow upload>
          <Form.Item label="上传文件">
            {getFieldDecorator('files', { rules: [] })(
              <Upload/>
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
              getFieldDecorator("content", { rules: [{ required: true }] })(<Editor />)
            }
          </Form.Item>
        </FixedRow>
      </Form>
    );
  }
}
export default Form.create()(TableListAdd);
