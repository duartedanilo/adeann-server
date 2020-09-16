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
  Upload,
} from "antd";

import { message } from "antd";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import Resume from './../../components/Resume'
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Dataset = ({simulationService}) => {
  const [form] = Form.useForm();
  const [fileListTraining, setFileListTraining] = useState([]);
  const [fileListTest, setFileListTest] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const propsTraining = {
    action: "http://localhost:33333/adeann",
    headers: {
      authorization: "authorization-text",
    },

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
    beforeUpload: (file) => {
      alert(file.type);
      if (
        file.type !== "text/csv" &&
        file.type !== "text/plain" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error(`${file.name} is not a .csv or .txt file`);
      } else {
        message.success(`file uploaded`);
        setFileListTraining([file]);
      }
      return false;
    },
  };

  const propsTest = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
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
    beforeUpload: (file) => {
      alert(file.type);
      if (
        file.type !== "text/csv" &&
        file.type !== "text/plain" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error(`${file.name} is not a .csv or .txt file`);
      } else {
        message.success(`file uploaded`);
        setFileListTest([file]);
      }
      return false;
    },
  };

  const handleUpload = () => {
    const formData = new FormData();

    [...fileListTest, ...fileListTraining].forEach((file, i) => {
      file.originalname =
        (i == 0 ? "test." : "train.") + file.originalname.split(".")[1];
      formData.append("files", file);
    });

    formData.append("myName", 4654654);

    setUploading(true);

    axios({
      method: "post",
      url: "http://localhost:3333/adeann",
      data: formData,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // // You can use any AJAX library you like
    // request({
    //   url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    //   method: "post",
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success("upload successfully.");
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error("upload failed.");
    //   },
    // });
  };

  return (
    <div style={{width: "90%"}}>
      <h2>Dataset upload</h2>
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
                  message: "Please input the number of neurons of Entry Layer!",
                },
              ]}
              hasFeedback
            >
              <Upload
                {...propsTraining}
                name="train"
                fileList={fileListTraining}
                previewFile={true}
                onRemove={() => {
                  setFileListTraining([]);
                }}
              >
                <Button>
                  <UploadOutlined /> Attach a File
                </Button>
              </Upload>
            </Form.Item>
            {JSON.stringify(fileListTraining)}
          </Form>
        </Card>

        <Card
          title="Test Samples"
          style={{ marginLeft: "15px", width: "100%" }}
        >
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
              <Upload
                {...propsTest}
                name="test"
                fileList={fileListTest}
                previewFile={true}
                onRemove={() => {
                  setFileListTest([]);
                }}
              >
                <Button>
                  <UploadOutlined /> Attach a File
                </Button>
              </Upload>
            </Form.Item>
            {JSON.stringify(fileListTest)}
          </Form>
        </Card>
      </div>
      <h2 style={{marginTop: "24px"}}>Settings resume</h2>
      <Resume simulationService={simulationService} />
      <Button onClick={() => {handleUpload()}}>asdasd</Button>
    </div>
  );
};

export default Dataset;