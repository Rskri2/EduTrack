import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import AddStudents from "./Employees/AddStudents";
import AccountInfo from "./auth/AccountInfo";
import { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import SanctionLeave from "./Leave/SanctionLeave";
import  ApplyLeave  from "./Leave/ApplyLeave";
import { useEffect } from "react";
import Dashboard from "./Dashboard";

const { Header, Sider } = Layout;
export default function AccountPage() {
  const [option, setOption] = useState(1);
  const [myrole, setMyRole] = useState(1);
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    message.success("Logged out");
  };
  useEffect(()=>{
    const curr = window.localStorage.getItem("role");
    if(curr) setMyRole(2)
  },[])
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const changeOption = (value)=>{
    setOption(value)
  }
  const  items=[
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => changeOption(1),
      temp:0
    },
    {
      key: "6",
      icon: <UserAddOutlined />,
      label: "Add employee",
      onClick:()=> changeOption(6),
      temp:2
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Sanction Leave",
      onClick: () => changeOption(2),
      temp:2
    },
    {
      key: "7",
      icon: <CalendarOutlined />,
      label: "Apply Leave",
      onClick: () => changeOption(7),
      temp:1
    },
    {
      key: "4",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => changeOption(4),
      temp:0
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "Logout",
      onClick: ()=>handleLogout,
      temp:0
    },
  ]
  const filterItems = items.filter(item => item.temp === myrole || item.temp === 0)
  return (
    <>
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items = {filterItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
        

          {option == 1 && <Dashboard/>}
          {option == 2 &&  <SanctionLeave />}
          {option == 4 && <AccountInfo />}
          {option == 6 && <AddStudents />}
          {option == 7 && <ApplyLeave />}
      
          
        </Layout>
      </Layout>
    </>
  );
}
