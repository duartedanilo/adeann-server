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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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

const RegistrationForm = ({ onNextHandle, simulationService }) => {
  const [form] = Form.useForm();
  const [nent, setNent] = useState(1);
  const [nsai, setNsai] = useState(1);
  const [nint, setNint] = useState(1);
  const [nintX, setNintX] = useState([
    { min: 1, max: 200 },
    { min: 1, max: 200 },
  ]);
  const [activationFunction, setActivationFunctionX] = useState({
    0: "tanh",
    1: "tanh",
  });
  const [optimizer, setOptimizer] = useState("rmsprop");
  const [batch, setBatch] = useState(32);
  const [epochs, setEpochs] = useState(10000);

  const [generation, setGeneration] = useState(10);
  const [population, setPopulation] = useState(10);
  const [learningRate, setLearningRate] = useState(1);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onNext = () => {
    return {
      nent,
      nsai,
      nint,
      nintX,
      activationFunction,
      batch,
      epochs,

      generation,
      population,
      learningRate,
    };
  };

  return (
    <div style={{width: "90%"}}>
      <h2>ADEANN configuration</h2>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Card
          title="Neural Network Settings"
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Form onFinish={onFinish} scrollToFirstError layout="vertical">
            <Form.Item
              label={
                <span>
                  Neurons of Entry Layer
                  <Tooltip title="NENT number">
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
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={100}
                value={nent}
                onChange={(value) => {
                  setNent(value);
                  simulationService.setNent(value);
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Neurons of Outter Layer
                  <Tooltip title="NSAI number">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                disabled={true}
                value={1}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Number of Hidden Layers">
              <Select value={nint} onChange={setNint} style={{ width: "100%" }}>
                <Option value={1}>1 Hidden Layer</Option>
                <Option value={2}>2 Hidden Layer</Option>
              </Select>
            </Form.Item>

            {Array(nint)
              .fill(1)
              .map((_, i) => (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        key={i}
                        label={
                          <span>
                            Minimum Number of Neurons of{" "}
                            <strong>{i + 1}º</strong> Hidden Layer
                            <Tooltip title={`NINT${i + 1}`}>
                              <QuestionCircleOutlined
                                style={{ marginLeft: "3px" }}
                              />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          min={1}
                          max={200}
                          style={{ width: "100%" }}
                          value={nintX[i].min}
                          onChange={(value) => {
                            const nintx = nintX;

                            nintx[i] = { ...nintx[i], min: +value };
                            setNintX(nintx);
                            simulationService.setNintX(nintx);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        key={i}
                        label={
                          <span>
                            Maximum Number of Neurons of{" "}
                            <strong>{i + 1}º</strong> Hidden Layer
                            <Tooltip title={`NINT${i + 1}`}>
                              <QuestionCircleOutlined
                                style={{ marginLeft: "3px" }}
                              />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          min={1}
                          max={200}
                          value={nintX[i].max}
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            const nintx = nintX;

                            nintx[i] = { ...nintx[i], max: +value };
                            setNintX(nintx);
                            simulationService.setNintX(nintx);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    key={i}
                    label={
                      <span>
                        Activation function of <strong>{i + 1}º</strong> Hidden
                        Layer
                        <Tooltip title={`${i + 1} Activation Function`}>
                          <QuestionCircleOutlined
                            style={{ marginLeft: "3px" }}
                          />
                        </Tooltip>
                      </span>
                    }
                  >
                    <Select
                      value={activationFunction[i]}
                      onChange={(value) => {
                        const functions = activationFunction;
                        functions[i] = value;
                        setActivationFunctionX(functions);
                        simulationService.setActivationFunctionX(functions);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value="linear">linear</Option>
                      <Option value="softmax">softmax</Option>
                      <Option value="tahn">tahn</Option>
                    </Select>
                  </Form.Item>
                </>
              ))}

            <Form.Item label="Optimizer function">
              <Select
                value={optimizer}
                onChange={(value) => {
                  setOptimizer(value);
                  simulationService.setOptimizer(value);
                }}
                style={{ width: "100%" }}
              >
                <Option value="rmsprop">rmsprop</Option>
                <Option value="adam">adam</Option>
                <Option value="sgd">sgd</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Batch Size
                  <Tooltip title="Number of tranning samples used">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                value={batch}
                onChange={(value) => {
                  setBatch(value);
                  simulationService.setBatch(value);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Epochs
                  <Tooltip title="Training cycle of the training set">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                value={epochs}
                onChange={(value) => {
                  setEpochs(value);
                  simulationService.setEpochs(value);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Card>

        <Card
          title="Genetic Algorithm"
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginLeft: "15px",
          }}
        >
          <Form onFinish={onFinish} scrollToFirstError layout="vertical">
            <Form.Item
              label={
                <span>
                  Generations
                  <Tooltip title="Number of generations">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={100}
                value={generation}
                onChange={(value) => {
                  setGeneration(value);
                  simulationService.setGeneration(value);
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Population
                  <Tooltip title="Number of subjects in a population">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                value={population}
                onChange={(value) => {
                  setPopulation(value);
                  simulationService.setPopulation(value);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Learning Rating
                  <Tooltip title="tax used in learning process">
                    <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
                  </Tooltip>
                </span>
              }
            >
              <InputNumber
                value={learningRate}
                onChange={(value) => {
                  setLearningRate(value);
                  simulationService.setLearningRate(value);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Button
        onClick={() => {
          alert(simulationService.toString());
        }}
      >
        asdas
      </Button>
    </div>
  );
};

export default RegistrationForm;
