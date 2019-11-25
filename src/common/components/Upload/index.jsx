import React, { Component } from 'react';
import { Icon, Upload, Button } from 'antd';

class UploadFile extends Component {
  state = {
    fileList: []
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value) {
      const fileList = nextProps.value.split(",").map((item, index) => {
        return {
          url: item,
          uid: index,
          status: 'done',
          name: item
        }
      });
      return {
        fileList: fileList
      };
    }
    return null;
  }
  constructor(props) {
    super(props)
    this.maxFile = props.maxFile == undefined ? 1 : props.maxFile;
  }
  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = e => {
    const { file, fileList } = e;
    fileList.filter(item => item.response && item.response.url).map(item => {
      item.url = item.response.url;
      return item;
    })
    this.setState({
      fileList: fileList
    });
    const uploadValues = fileList.map(item => {
      return item.url;
    });
    this.triggerChange(uploadValues.join(","));
  }
  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <Button>
        <Icon type="upload" />Upload
      </Button>
    );
    return (
      <div>
        <Upload
          action={BASE_API + '/upload'}
          fileList={this.state.fileList}
          onChange={this.handleChange}>
          {fileList.length >= this.maxFile ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}
export default UploadFile;
