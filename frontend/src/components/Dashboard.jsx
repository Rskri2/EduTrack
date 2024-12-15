import  { useEffect, useState } from "react";
import { message,  Card, Col, Row } from "antd";
import { PieChart } from '@mui/x-charts/PieChart';
import {
  CheckCircleOutlined,
  UserOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
const BASEURL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
export default function Dashboard() {
  const [pendingLeave, setPendingLeave] = useState(0);
  const [rejectedLeave, setRejectedLeave] = useState(0);
  const [approvedLeave, setApprovedLeave] = useState(0);
  const [totalLeave, setTotalLeave] = useState(0);

  const fetch = async () => {
    try {
      const leave = await axios.get(`${BASEURL}/leave/stats`);
      let leaves = leave?.data?.leaves;
      leaves.forEach((lv) => {
        if (lv._id == "approved") setPendingLeave(pendingLeave + lv.count);
        else if (lv._id == "pending")
          setApprovedLeave(approvedLeave + lv.count);
        else setRejectedLeave(rejectedLeave + lv.count);
        setTotalLeave(totalLeave + lv.count);
      });
    } catch (error) {
      console.log(error);
      message.error("Erorr fetching records");
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
          <div style={{ textAlign: "center", margin:"10px" }}>
          <span style={{fontSize:"20px", textAlign:"center"}}>
          Leave Information section 
          </span>
          </div>
      <Row gutter={16} style={{ margin: "20px" }}>
        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            <UserOutlined style={{ fontSize: "20px" }} theme="outlined" />
            <span style={{ fontSize: "20px" }}>
              {" "}
              Total leaves: {totalLeave}
            </span>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            <WarningOutlined
              style={{ fontSize: "20px", color: "yellow" }}
              theme="outlined"
            />
            <span style={{ fontSize: "20px" }}>
              {" "}
              Pending leaves: {pendingLeave}
            </span>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ margin: "20px" }}>
        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            <CheckCircleOutlined
              style={{ fontSize: "20px", color: "green" }}
              theme="outlined"
            />
            <span style={{ fontSize: "20px" }}>
              {" "}
              Approved leaves: {approvedLeave}
            </span>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            <CloseCircleOutlined
              style={{ fontSize: "20px", color: "red" }}
              theme="outlined"
            />
            <span style={{ fontSize: "20px" }}>
              {" "}
              Rejected leaves: {rejectedLeave}
            </span>
          </Card>
        </Col>
      </Row>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      </div>
    <Row>
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: {pendingLeave}, label: 'Pending leave' },
            { id: 1, value: {rejectedLeave}, label: 'Rejected leave' },
            { id: 2, value: {approvedLeave}, label: 'Approved leave' },
          ],
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      
        },
      ]}
      width={200}
      height={200}
    />
    </Row>
    </div>
  );
}
