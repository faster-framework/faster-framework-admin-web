import React, { Component } from 'react';
import { Input, Grid, Form, Button, Field, Upload } from '@icedesign/base';
import { imgUtils, http } from '@utils';
import BraftEditor from '@components/BraftEditor';

const { ImageUpload } = Upload;
const { Row, Col } = Grid;
const FormItem = Form.Item;
export default class DemoAdd extends Component {
    field = new Field(this, {
        deepReset: true // 打开清除特殊类型模式(fileList是数组需要特别开启)
    });

    static displayName = 'DemoAdd';
    constructor(props) {
        super(props);
    }

    save = () => {
        this.field.validate((errors, values) => {
            if (errors) {
                return false;
            }
            if (this.refs.content.isEmpty()) {
                this.field.setError("content", "请输入富文本内容");
                return false;
            }
            values.img = imgUtils.fileListToImgs(values.img);
            values.content = this.refs.content.getContent();
            console.info(values);
            // http.post('/sys/roles', values).then(() => {
            //     this.props.addDialog.hide();
            //     this.props.tableList.refresh();
            // });
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
                    <FormItem {...formItemLayout} label="角色名称：">
                        <Input placeholder="请输入角色名称" {...init("name", { rules: { required: true, message: "请填写角色名称" } })} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem {...Object.assign({}, formItemLayout, { wrapperCol: {} })} className="row-content" label="图片：">
                        <ImageUpload
                            {...imgUtils.initProperties}
                            {...init("img",
                                imgUtils.initValid(
                                    { rules: [{ required: true, message: "请上传图片" }] }
                                )
                            )}
                        />
                    </FormItem>
                </Row>
                <Row wrap>
                    <FormItem  {...Object.assign({}, formItemLayout, { wrapperCol: {} })} className="row-content" label="内容：">
                        <BraftEditor {...init("content")}/>
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
