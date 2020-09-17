import React, { useRef, useState, useEffect } from "react";
import { Col, Input, Result, Row, Statistic, Tabs, Progress } from "antd";
import Resume from "./../../components/Resume";
import { StatusService } from "../../service/StatusService";

const { TabPane } = Tabs;
const { Search } = Input;

const Run = ({ simulationService }) => {
  const [seconds, setSeconds] = useState(0);
  const [generation, setGeneration] = useState("0-0");
  const [population, setPopulation] = useState("0-0");
  const [subject, setSubject] = useState("0%");

  const tick = () => {
    setSeconds(seconds + 1);
  };

  useEffect(() => {
    let interval = null
    // if(population.split('-')[0] != population.split('-')[1] && population.split('-')[1] != "0"){
      interval = setTimeout(tick, 1000);
    // }
    return () => clearTimeout(interval);
  });

  useEffect(() => {
    const getStatus = async () => {
      const {data} = await new StatusService().getSimulationStatus();
      console.log(data)
      setGeneration(data.generationPercent)
      setPopulation(data.populationPercent)
      setSubject(data.subjectPercent)
    };
    getStatus();
  }, [seconds]);

  let interpreterForm = useRef(null);
  const onFinish = ({ interpreter }) => {
    console.log(interpreter);
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const callback = (key) => {
    console.log(key);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Result
        title="ADEANN is ready to start!"
        extra={[
          <Search
            onSearch={(w) => alert(w)}
            size="large"
            placeholder="Type a simulation name"
            enterButton="Run"
            style={{ width: "450px" }}
          />,
        ]}
      />

      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Simulation status" key="1">
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="Generation" value={generation?.split("-")[0]} suffix={`/ ${generation?.split("-")[1]}`} />
            </Col>
            <Col span={6}>
              <Statistic title="Subject" value={parseInt(population?.split("-")[0] / generation?.split("-")[0])} suffix={`/ ${population?.split("-")[1]/generation?.split("-")[1]}`} />
            </Col>
            <Col span={6}>
              <Statistic title="Population" value={population?.split("-")[0]} suffix={`/ ${population?.split("-")[1]}`} />
            </Col>
            <Col span={6}>
              <Statistic title="time spent" value={seconds} suffix="s" />
            </Col>
            <Col span={23}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                style={{ marginTop: 15 }}
                percent={subject.replace("%", "")}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Simulation's Summary" key="2">
          <Resume simulationService={simulationService} />
        </TabPane>
        <TabPane tab="Simulation results" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Run;
