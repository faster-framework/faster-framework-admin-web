import React, { Component } from 'react';
import { Icon, Upload, Modal } from 'antd';
import './index.less';

class UploadImg extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value) {
      const fileList = nextProps.value.split(",").map((item,index)=>{
        return {
          url: item,
          uid: index,
          status:'done',
          name:item
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
  handlePreview = file => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action={BASE_API + '/upload'}
          listType="picture-card"
          fileList={this.state.fileList}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
        >
          {fileList.length >= this.maxFile ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="预览" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadImg;
