import React, { Component } from 'react';
import { Input, Grid, Form, Button, Field, Upload } from '@icedesign/base';
import BraftEditor from '@components/BraftEditor';
import { imgUtils, http } from '@utils';
const { Row, Col } = Grid;
const FormItem = Form.Item;
const { ImageUpload } = Upload;
export default class DemoEdit extends Component {
    static displayName = 'DemoEdit';
    field = new Field(this, {
        deepReset: true // 打开清除特殊类型模式(fileList是数组需要特别开启)
    });
    constructor(props) {
        super(props);
        const selectRecord = this.props.tableList.getSelectRecords()[0];
        http.get('/sys/roles/' + selectRecord.id).then(response => {
            response.data.img = imgUtils.imgsToArray("http://139.199.23.31:8080/files/2018072016031330,http://139.199.23.31:8080/files/2018072016031330");
            this.field.setValues(response.data);
            this.refs.content.setContent(response.data.name);
        })
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
            // http.put('/sys/roles/' + values.id, values).then(() => {
            //     this.props.editDialog.hide();
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
                        <BraftEditor {...init("content")} />
                    </FormItem>
                </Row>
                <Row wrap>
                    <Col style={{ textAlign: "center" }}>
                        <Button type="primary" style={formItemLayout.style} onClick={this.save}>保存</Button>
                        <Button onClick={() => this.props.editDialog.hide()}>取消</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
