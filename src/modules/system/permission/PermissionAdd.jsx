import React, { Component } from 'react';
import { Input, Grid, Form, Button, TreeSelect, Field } from '@icedesign/base';
import { http, utils } from '@utils';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class RoleAdd extends Component {
    static displayName = 'RoleAdd';
    field = new Field(this, {
        deepReset: true // 打开清除特殊类型模式(fileList是数组需要特别开启)
    });
    constructor(props) {
        super(props);
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        this.field.setValue('parentId', selectRecord ? selectRecord.id : null);
        this.state = {
            permissionTrees: []
        }
        http.get('/sys/permissions').then((response) => {
            //列表转成TreeSelect控件所需数据
            this.setState({
                permissionTrees: [{
                    value: '0',
                    label: '根节点',
                    children: utils.convertTreeSelectData(response.data)
                }]
            });
        });
    }

    save = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                return false;
            }
            http.post('/sys/permissions', values).then(() => {
                this.props.addDialog.hide();
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
                    <FormItem {...formItemLayout} label="权限名称：">
                        <Input placeholder="请输入权限名称" {...init("name", { rules: { required: true, message: "请填写权限名称" } })} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="权限编码：">
                        <Input placeholder="请输入权限编码" {...init("code", { rules: { required: true, message: "请填写权限编码" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...Object.assign({}, formItemLayout, { wrapperCol: {} })} className="row-content" label="父级菜单：">
                        <TreeSelect
                            dataSource={this.state.permissionTrees}
                            onChange={this.handlePermissionChoose}
                            autoWidth
                            {...init("parentId", { rules: { required: true, message: "请选择父级菜单" } })}
                        />
                    </FormItem>
                </Row>
                <Row wrap>
                    <Col style={{ textAlign: "center" }}>
                        <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                        <Button onClick={() => this.props.addDialog.hide()}>取消</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
