import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

export default class CustomBraftEditor extends Component {
    static displayName = 'CustomBraftEditor';
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
    render() {
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: this.state.content,
            onChange: this.handleChange
        };

        return (
            <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance} />
        );
    }
}