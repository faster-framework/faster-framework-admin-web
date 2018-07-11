import React, { Component } from 'react';
import { Input, Grid, Form, Button } from '@icedesign/base';
import { http } from '@utils';
import {
    FormBinderWrapper,
    FormBinder,
    FormError,
} from '@icedesign/form-binder';


const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class UserEdit extends Component {
    static displayName = 'UserEdit';
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        }
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        http.get('/sys/users/' + selectRecord.id).then(response => {
            this.setState({
                values: Object.assign({}, this.state.values, response.data)
            })
        })
    }

    save = () => {
        this.refs.postForm.validateAll((errors, values) => {
            if (errors) {
                return false;
            }
            http.put('/sys/users/' + this.state.values.id, this.state.values).then(() => {
                this.props.editDialog.hide();
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
            <FormBinderWrapper value={this.state.values} ref="postForm">
                <Form>
                    <Row wrap>
                        <FormItem {...formItemLayout} label="用户姓名">
                            <FormBinder name="name" required message="请填写用户姓名">
                                <Input placeholder="请输入用户姓名" />
                            </FormBinder>
                            <FormError name="name" />
                        </FormItem>
                    </Row>
                    <Row wrap>
                        <Col style={{ textAlign: "center" }}>
                            <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                            <Button onClick={() => this.props.editDialog.hide()}>取消</Button>
                        </Col>
                    </Row>
                </Form>
            </FormBinderWrapper>
        );
    }
}
