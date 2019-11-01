import React, { Component } from 'react';
import { Input, Form, message, TreeSelect } from 'antd';
import FixedRow from '@/common/components/FixedRow';
import request from '@/common/utils/request';
import treeUtils from '@/common/utils/treeUtils';

class PermissionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionTrees: []
    }
  }
  componentDidMount() {
    request.get('/sys/permissions').then((response) => {
      this.setState({
        permissionTrees: [{
          value: '0',
          label: '根节点',
          children: treeUtils.convertTreeSelectData(response)
        }]
      });
    });
  }
  onOk(modal) {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      };
      request.post('/sys/permissions', { data: values }).then(res => {
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
          <Form.Item label="权限名称">
            {
              getFieldDecorator("name", { rules: [{ required: true, message: "请填写权限名称" }] })(<Input />)
            }
          </Form.Item>
          <Form.Item label="权限编码">
            {
              getFieldDecorator("code", { rules: [{ required: true, message: "请填写权限编码" }] })(<Input />)
            }
          </Form.Item>
        </FixedRow>
        <FixedRow full>
          <Form.Item label="父级菜单">
            {
              getFieldDecorator("parentId", { rules: [{ required: true, message: "请填写父级菜单" }] })(<TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.permissionTrees}
              />)
            }
          </Form.Item>
        </FixedRow>
      </Form>
    );
  }
}
export default Form.create()(PermissionAdd);
