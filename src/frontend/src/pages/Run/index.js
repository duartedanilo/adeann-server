import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Typography,
  Card,
  Steps,
  Upload
} from "antd";

import { message } from "antd";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import CsvViewer from "react-csv-viewer";

const { Title } = Typography;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const Dataset = () => {
  const [form] = Form.useForm();
  const [fileListTraining, setFileListTraining] = useState([]);
  const [fileListTest, setFileListTest] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const propsTraining = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text"
    },
    fileList: fileListTraining,
    uploading: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: file => {
      alert(file.type);
      if (
        file.type !== "text/csv" &&
        file.type !== "text/plain" &&
        file.type !== "application/vnd.ms-excel"
      ) {
        message.error(`${file.name} is not a .csv or .txt file`);
      } else {
        message.success(`file uploaded`);
        setFileListTraining([file]);
      }
      return false;
    }
  };

  const propsTest = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text"
    },
    fileList: fileListTest,
    uploading: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: file => {
      alert(file.type);
      if (
        file.type !== "text/csv" &&
        file.type !== "text/plain" &&
        file.type !== "application/vnd.ms-excel"
      ) {
        message.error(`${file.name} is not a .csv or .txt file`);
      } else {
        message.success(`file uploaded`);
        setFileListTraining([file]);
      }
      return false;
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });

    setUploading(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <Card title="Training Samples" style={{ width: "100%" }}>
        <Form onFinish={onFinish} scrollToFirstError layout="vertical">
          <Form.Item
            extra={`The accepted dataset types are .txt and .csv. and the last column of line is the output.`}
            label={
              <span>
                Tranning Dataset
                <Tooltip title="The samples used to trainning machine learning">
                  <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input the number of neurons of Entry Layer!"
              }
            ]}
            hasFeedback
          >
            <Upload {...propsTraining}>
              <Button>
                <UploadOutlined /> Attach a File
              </Button>
            </Upload>
          </Form.Item>
          {JSON.stringify(fileListTraining)}
        </Form>
      </Card>

      <Card title="Test Samples" style={{ marginLeft: "15px", width: "100%" }}>
        <Form onFinish={onFinish} scrollToFirstError layout="vertical">
          <Form.Item
            extra={`The accepted dataset types are .txt and .csv. and the last column of line is the output.`}
            label={
              <span>
                Test Dataset
                <Tooltip title="The samples used to test machine learning">
                  <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                </Tooltip>
              </span>
            }
          >
            <Upload {...propsTest}>
              <Button>
                <UploadOutlined /> Attach a File
              </Button>
            </Upload>
          </Form.Item>
          {JSON.stringify(fileListTest)}
        </Form>
      </Card>
    </div>
  );
};

export default Dataset;
