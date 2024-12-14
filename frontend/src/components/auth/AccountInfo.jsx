import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/authReducer";
import PropTypes from 'prop-types'
export default function AccountInfo() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email }));
  };
  useEffect(() => {
    const name = window.localStorage.getItem("name");
    const email = window.localStorage.getItem("email");
    setname(name);
    setemail(email);
  }, []);
  return (
    <>
      <div
        title={<p>Account Details</p>}
      >
        <form onSubmit={handleUpdate} className="mt-8 flex flex-col p-20">
          <div className="col-span-6 ">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
            />
          </div>

          <div className="col-span-6 ">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>

            <input
              type="email"
              id="Email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
            />
          </div>
          <div
            className=" sm:flex sm:items-center flex justify-end 
                flex-col sm:gap-4"
          >
            <Button type="primary " htmlType="submit" className="mt-10">
              <SaveOutlined />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}


AccountInfo.propTypes={
  drawerOpen:PropTypes.bool,
  close:PropTypes.func
}
