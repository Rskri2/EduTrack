import { Button, DatePicker, Form, Input, Row, message } from "antd";
import { Col } from "antd";
import axios from "axios";
const BASEURL = import.meta.env.VITE_BACKEND_URL;
export default function ApplyLeave() {
 
  const onSubmit = async(values) => {
    const token = window.localStorage.getItem("token");
    try{
      await axios.post(`${BASEURL}/leave`,
        values,{
          withCredentials:true,
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      message.success("Leave application successful")
    }catch(error){
      const msg = error?.response?.data?.message ? error.response.data.message : error.message
      message.error(msg);
    }
  };
  const [form] = Form.useForm();
  return (
    <Row justify="center" style={{margin:"20px"}}>
      <Col span = {12}>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        style={{
          maxWidth: 600,
          alignSelf:"center"
          ,justifyContent:"center",
        }}
        form= {form}
      >
        <Form.Item
          name="reason"
          rules={[
            {
              required: true,
              message: "Please input your reason for leave!",
            },
          ]}
          value="reason"
        >
          <Input.TextArea placeholder="Reason for leave" rows={6}/>
        </Form.Item>
        <Form.Item
          name="startDate"
          rules={[
            {
              required: true,
              message: "Please select start Date!",
            },
          ]}
          value="startDate"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="endDate"
          rules={[
            {
              required: true,
              message: "Please select end Date!",
            },
          ]}
          value="endDate"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Col>
   </Row>
  );
}
