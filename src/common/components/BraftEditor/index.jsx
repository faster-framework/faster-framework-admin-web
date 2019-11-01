import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import request from '@/common/utils/request';

export default class BraftEditorPro extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value && prevState.init) {
      return {
        editorState: BraftEditor.createEditorState(nextProps.value),
        init: false
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = { editorState: null, init: true };
  }


  uploadFn = (param) => {
    const formData = new FormData();
    formData.append('file', param.file)
    request.post('/upload', { data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        param.success({
          url: response.url
        })
      })
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    this.triggerChange(editorState.toHTML());
  }

  render() {

    return (
      <BraftEditor
        value={this.state.editorState}
        onChange={this.handleEditorChange}
        height={300}
        media={{ uploadFn: this.uploadFn }} />
    );
  }
}
