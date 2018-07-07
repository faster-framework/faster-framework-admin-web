import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select } from '@icedesign/base';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';


const { Row, Col } = Grid;
const FormItem = Form.Item;

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
        return (
            <div className="content-editor">
                <IceFormBinderWrapper
                    value={this.state.value}
                    ref="postForm"
                >
                    <Form direction="ver" size="large" labelTextAlign="right" >
                        <Row>
                            <Col span="11">
                                <FormItem label="角色名称：" required wrapperCol="24">
                                    <IceFormBinder name="name" required message="角色名称必填">
                                        <Input />
                                    </IceFormBinder>
                                    <IceFormError name="name" />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                                <FormItem label="作者：" required>
                                    <IceFormBinder
                                        name="author"
                                        required
                                        message="作者信息必填"
                                    >
                                        <Input placeholder="填写作者名称" />
                                    </IceFormBinder>
                                    <IceFormError name="author" />
                                </FormItem>
                            </Col>
                        </Row>
                        

                        <FormItem label="">
                            <Button type="primary" onClick={this.handleSubmit}>
                                发布文章
                            </Button>
                        </FormItem>
                    </Form>
                </IceFormBinderWrapper>
            </div>
        );
    }
}

const styles = {
    cats: {
        width: '100%',
    },
};