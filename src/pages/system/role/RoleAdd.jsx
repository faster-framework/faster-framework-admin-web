import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class ColumnForm extends Component {
    static displayName = 'ColumnForm';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row wrap>
                <Col l="2">
                    角色名称:
                </Col>
                <Col l="6">
                    <Input />
                </Col>
                <Col>
                    <span>角色名称:</span>
                    <Input />
                </Col>
                <Col>
                    <span>角色名称:</span>
                    <Input />
                </Col>
            </Row>
        );
    }
}
