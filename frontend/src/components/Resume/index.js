import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Divider,
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

  const [nent, setNent] = useState(simulationService.nent);
  const [nsai, setNsai] = useState(simulationService.nsai);
  const [nint, setNint] = useState(simulationService.nint);
  const [nintX, setNintX] = useState(simulationService.nintX);
  const [activationFunction, setActivationFunctionX] = useState(
    simulationService.activationFunction
  );
  const [optimizer, setOptimizer] = useState(simulationService.optimizer);
  const [batch, setBatch] = useState(simulationService.batch);
  const [epochs, setEpochs] = useState(simulationService.epochs);

  const [generation, setGeneration] = useState(simulationService.generation);
  const [population, setPopulation] = useState(simulationService.population);
  const [learningRate, setLearningRate] = useState(
    simulationService.learningRate
  );

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
              disabled={true}
              value={nent}
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
            <InputNumber disabled={true} value={1} style={{ width: "100%" }} />
          </Form.Item>

          {nint?.map((number, index) =>
            Array(number)
              .fill(1)
              .map((_, i) => (
                <Card
                  style={{ marginBottom: "16px" }}
                  title={
                    nint.length > 1
                      ? `${number}th Layer Sequence`
                      : `Configuration of ${_} layer`
                  }
                >
                  <h4 level={5} style={{ marginBottom: "8px" }}>
                    {nint.length > 1
                      ? `Configure #${i + 1}/${nint[index]} layer sequence`
                      : ``}
                  </h4>
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
                          value={nintX[`${index}_${i}`]?.min}
                          disabled
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
                          value={nintX[`${index}_${i}`]?.max}
                          style={{ width: "100%" }}
                          disabled
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
                      value={activationFunction[`${index}_${i}`]}
                      disabled
                      style={{ width: "100%" }}
                    >
                      <Option value="linear">linear</Option>
                      <Option value="softmax">softmax</Option>
                      <Option value="tahn">tahn</Option>
                    </Select>
                  </Form.Item>
                </Card>
              ))
          )}

          <Divider />

          <Form.Item label="Optimizer function">
            <Select
              mode="tags"
              value={optimizer}
              disabled
              style={{ width: "100%" }}
            >
              <Option value="rmsprop">rmsprop</Option>
              <Option value="adam">adam</Option>
              <Option value="sgd">sgd</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Optimizer function">
            <Select
              disabled={true}
              value={optimizer}
              disabled
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
              disabled={true}
              value={batch}
              disabled
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
              disabled={true}
              value={epochs}
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
              disabled={true}
              style={{ width: "100%" }}
              min={1}
              max={100}
              value={generation}
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
              disabled={true}
              value={population}
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
              disabled={true}
              value={learningRate}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
