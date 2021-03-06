import React, { useState, useRef } from "react";
import {
  PageHeader,
  Button,
  Input,
  Descriptions,
  Divider,
  Steps,
  message,
  Tooltip,
  Form,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Setting from "../Settings";
import Dataset from "./../Dataset";
import Run from "./../Run";
import SimulationService from "../../service/Simulation.js";

const { Step } = Steps;

const steps = [
  {
    title: "Settings",
    content: "First-content",
  },
  {
    title: "Dataset",
    content: "Second-content",
  },
  {
    title: "Run",
    content: "Last-content",
  },
];

export default ({ onChange, handleNext = () => {} }) => {
  const [current, setCurrent] = useState(0);
  const [compiler, setCompiler] = useState("python");

  const simulationService = SimulationService;

  let interpreterForm = useRef(null);

  const handleChange = () => {};

  const screens = [
    <Setting onChange={handleChange} simulationService={simulationService} />,
    <Dataset onChange={handleChange} simulationService={simulationService} />,
    <Run onChange={handleChange} simulationService={simulationService} />,
  ];

  const next = () => {
    handleNext();
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = ({ interpreter }) => {
    setCompiler(interpreter);
    console.log(interpreter);
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="ADEANN Toolkit"
        subTitle="version 1.0"
        extra={[
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["interpreter"]}
              style={{ marginBottom: "-30px" }}
              initialValue={compiler}
              rules={[{ required: true, message: "Interpreter is required!" }]}
            >
              <Input
                style={{ width: "300px" }}
                addonBefore="Interpreter"
                addonAfter={
                  <Tooltip title="Python interpreter ex: python, python3.6, python3 ">
                    <QuestionCircleOutlined />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item style={{ height: 0 }}>
              <Button
                htmlType="submit"
                ref={interpreterForm}
                style={{ height: 0 }}
              ></Button>
            </Form.Item>
          </Form>,
        ]}
      />
      <Divider style={{ marginTop: 5 }} />
      <div style={{ width: "90vw", margin: "auto", paddingBottom: "60px" }}>
        <div style={{ width: "95%", margin: "auto" }}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            marginLeft: "36px",
            marginRight: "36px",
          }}
        >
          {screens[current]}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "36px",
            marginRight: "36px",
          }}
        >
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev} size="large">
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next} size="large">
              Next
            </Button>
          )}
          {current === steps.length - 1 &&
            // <Button
            //   type="primary"
            //   onClick={() => message.success("Processing complete!")}
            //   size="large"
            // >
            //   Done
            // </Button>
            null}
        </div>
      </div>
    </>
  );
};
