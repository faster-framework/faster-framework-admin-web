import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import { http, imgUtils } from '@utils';
import 'braft-editor/dist/braft.css';

export default class BaseBraftEditor extends Component {
    static displayName = 'BaseBraftEditor';
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContent = () => {
        return this.editorInstance.getContent();
    };
    setContent = (content) => {
        this.editorInstance.setContent(content);
    };
    isEmpty = () => {
        const content = this.editorInstance.getContent();
        return !(content && content != '<p></p>')
    };
    uploadFn = (param) => {
        const formData = new FormData();
        formData.append('file', param.file)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        http.post(imgUtils.uploadImgUrl, formData, config)
            .then(response => {
                param.success({
                    url: response.data.url
                })
            })
    }
    render() {
        const editorProps = {
            height: 300,
            contentFormat: 'html',
            initialContent: this.state.content,
            onChange: this.handleChange,
            media: {
                uploadFn: this.uploadFn
            }
        };

        return (
            <BraftEditor {...Object.assign({}, editorProps, this.props)} ref={instance => this.editorInstance = instance} />
        );
    }
}