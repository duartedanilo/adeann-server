import React, { useRef, useState, useEffect } from "react";
import { Col, Input, Result, Row, Statistic, Tabs, Progress } from "antd";
import Resume from "./../../components/Resume";

const { TabPane } = Tabs;
const { Search } = Input;

const Run = ({ simulationService }) => {
  const [seconds, setSeconds] = useState(0)
  
  const tick = () => {
    setSeconds(seconds + 1)
  }

  useEffect(()=>{
   
      const interval = setInterval(tick, 1000);
    
  
    return () => clearInterval(interval);
    
  })

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
        <TabPane tab="Simulation's Summary" key="1">
          <Resume simulationService={simulationService} />
        </TabPane>
        <TabPane tab="Simulation status" key="2">
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="Generation" value={93} suffix="/ 100" />
            </Col>
            <Col span={6}>
              <Statistic title="Subject" value={93} suffix="/ 100" />
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
                style={{marginTop: 15}}
                percent={99.9}
               
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Simulation results" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Run;
