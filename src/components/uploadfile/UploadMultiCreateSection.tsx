import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

class UploadMultiCreateSection extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
  }
  state = { 
    fileList: [],
    uploading: false,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const attachments = new FormData();
    fileList.forEach(file => {
      attachments.append('attachments', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    /*reqwest({
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });*/
    axios({
        url: `https://backend.ku-knowmore.xyz/sections/${this.props.secid}/attachments`, //Sample API 
        method: "POST",
        headers:{
          "Content-Type": "multipart/form-data",
        },
        data: attachments
    });
    console.log("hello")
    window.location.replace("http://localhost:3000/")
    //alert("Upload Complete");
    this.setState({
        uploading: false,
      });
  };
  

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file:any) => {
        this.setState((state:any) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file:any) => {
        this.setState((state:any) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    
    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </>
    );
  }
}

export default UploadMultiCreateSection;