import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  List,
  Select,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import "./styles.css";
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

  const [annType, setAnnType] = useState(simulationService.annType);
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
    <div
      style={{ display: "flex", flexDirection: "row", flex: 1, width: "100%" }}
    >
      <Descriptions
        bordered
        size="small"
        style={{
          width: "100%",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item span={12} label="Neural network type">
          {annType}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Neurons of Input Layer">
          {nent}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Neurons of Output Layer">
          {nsai}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Output layer activation function">
          {activationFunction[`N_0`]}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Optimizers">
          {JSON.stringify(optimizer)}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Batch Size">
          {batch}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Epochs">
          {epochs}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Generation">
          {generation}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Population">
          {population}
        </Descriptions.Item>
        <Descriptions.Item span={12} label="Learning Rating">
          {learningRate}
        </Descriptions.Item>
        {nint?.map((number, index) =>
          Array(number)
            .fill(1)
            .map((_, i) => (
              <Descriptions.Item
                label={
                  nint.length > 1
                    ? `${number}th Layer Sequence`
                    : `Configuration of ${_} layer`
                }
              >
                <List
                  size="small"
                  header={
                    nint.length > 1 ? (
                      <div>
                        Configure <strong>{`#${i + 1}/${nint[index]}`}</strong>{" "}
                        layer sequence
                      </div>
                    ) : null
                  }
                  bordered
                  dataSource={(() => {
                    return [
                      <span>
                        {" "}
                        Minimum Number of Neurons of <strong>
                          {i + 1}º
                        </strong>{" "}
                        Hidden Layer:{" "}
                        <strong>{nintX[`${index}_${i}`]?.min}</strong>
                      </span>,
                      <span>
                        {" "}
                        Maximum Number of Neurons of <strong>
                          {i + 1}º
                        </strong>{" "}
                        Hidden Layer:{" "}
                        <strong>{nintX[`${index}_${i}`]?.max}</strong>
                      </span>,
                      <span>
                        Activation function of <strong>{i + 1}º</strong> Hidden
                        Layer:{" "}
                        <strong>{activationFunction[`${index}_${i}`]}</strong>
                      </span>,
                    ];
                  })()}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Descriptions.Item>
            ))
        )}
      </Descriptions>
    </div>
  );
};

export default RegistrationForm;
