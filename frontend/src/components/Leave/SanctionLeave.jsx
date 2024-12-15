import { useEffect, useState } from "react";
import {
  Popconfirm,
  Table,
  message,
} from "antd";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const SanctionLeave = () => {
  const [dataSource, setDataSource] = useState([]);
  const fetch = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/leave/filter`, {category:"pending"},{
        withCredentials:true,
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(res)
      if (!res.data?.leaves) message.error("Error fetching records");
      else {
        let arr = res.data?.leaves;
        arr = arr.map((leave) => {
          return {
            ...leave,
            name: leave?.applicant.name,
            startDate: leave?.to?.split("T")[0],
            endDate: leave?.from?.split("T")[0],
          };
        });
        setDataSource(arr);
      }
    } catch (err) {
      const msg = err?.response?.data?.message
        ? err.response.data.message
        : err.message;
      message.error(msg);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const handleDelete = async(key) => {
    
    const token = window.localStorage.getItem("token");
    try{
      await axios.post(`${BASE_URL}/leave/${key}`, {category:"rejected"},{
        withCredentials:true,
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

    } catch(err){
      message.error("Please try again later")
    }
    fetch();
  };
  const handleApprove = async(key) => {
   
    const token = window.localStorage.getItem("token");
    try{
      await axios.post(`${BASE_URL}/leave/${key}`, {category:"approved"},{
        withCredentials:true,
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

    } catch(err){
      message.error("Please try again later")
    }
    fetch();
  };
  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key:"name"
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key:"reason"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key:"startDate"
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key:"endDate"
    },
    {
      title:"Department",
      dataIndex:"department",
      key:"department"
    },
    {
      title: "Approve",
      dataIndex: "Approve",
      render: (_, record) => (
        <Popconfirm
          title="Sure to approve?"
            onConfirm={() => handleApprove(record._id)}
        >
          <a>Approve</a>
        </Popconfirm>
      ),
    },
    {
      title: "Reject",
      dataIndex: "Reject",

      render: (_, record) => (
        <Popconfirm
          title="Sure to reject?"
            onConfirm={() => handleDelete(record._id)}
        >
          <a>Reject</a>
        </Popconfirm>
      ),
    
    },
  ];
  const columns = defaultColumns.map((col) => {
    return col;
  });
  return (
    <div className="flex items-center flex-col">
      <Table
        dataSource={dataSource}
        columns={columns}
        className="w-2/3"
      />
    </div>
  );
};
export default SanctionLeave;
