import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Icon, Balloon } from '@icedesign/base';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';


const { Row, Col } = Grid;
const FormItem = Form.Item;
const style = {
    padding: "20px",
    background: "#F7F8FA",
    margin: "20px"
};
const label = (
    <span>
        名称：<Balloon
            type="primary"
            trigger={<Icon type="prompt" size="small" />}
            closable={false}
        >
            blablablablablablablabla
      </Balloon>
    </span>
);
export default class ContentEditor extends Component {
    static displayName = 'ContentEditor';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            value: {
                title: '',
                desc: '',
                author: '',
                body: null,
                cats: [],
            },
        };
    }

    handleSubmit = () => {
        this.refs.postForm.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            if (errors) {
                return false;
            }

            // ajax values
        });
    };

    render() {
        const formItemLayout = {
          labelCol: { span: 6, offset: 1 }
        };
        return (
            <div className="content-editor">
                <Form
                    justify="start"
                    style={style}
                >
                    <FormItem {...formItemLayout} label="较长搜索名称：">
                        <Input placeholder="请输入搜索名称" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="搜索名称：">
                        <Input placeholder="请输入搜索名称" />
                    </FormItem>
                    <FormItem>
                        <Row>
                            <FormItem {...formItemLayout} label="搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="较长搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                            <FormItem {...formItemLayout} label="搜索名称：">
                                <Input placeholder="请输入搜索名称" />
                            </FormItem>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label="搜索名称：">
                        <Input placeholder="请输入搜索名称" />
                    </FormItem>
                    <Row>
                        <Col style={{ textAlign: "right" }}>
                            <Button type="primary" style={{ marginRight: "5px" }}>搜索</Button>
                            <Button>清除条件</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
