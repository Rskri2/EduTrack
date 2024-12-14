import { useState ,useEffect} from "react";
import {  message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  loginUser } from "../redux/authReducer";
import { Spinner } from "@material-tailwind/react";
import {Result } from 'antd'
import { Link ,useNavigate} from "react-router-dom";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const dispatch = useDispatch();
  const { loadingLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if(res.success){
      
      navigate("/my-account");
    }
    else
       message.error(res.error)
      
  };
  useEffect(() => {
    const log = window.localStorage.getItem("token");
    if(log)setIsLogedIn(true);
  }, [ ]); // D
  return (
    <>
  {
    isLoggedIn ? (
        <Result
          status="403"
          title="403"
          subTitle="You are already logged in!!"
        />
    ) : (

      <div className=" lg:grid lg:min-h-screen lg:grid-cols-12  pl-20 pt-24 w-full">
        <section className="relative flex bg-white lg:col-span-5  xl:col-span-5 items-center justify-self-center min-h-screen">

          <img
            alt=""
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" to="/">
              <span className="sr-only">Home</span>
            </Link>

            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl font-sans text-black text-center place-content-center mt-44">
              Welcome to EduTrack
            </h2>
            <div className="mt-4 max-w-xl leading-relaxed  text-center text-white">
              EduTrack is committed to supporting the educational community.
              Sign up today to take control of your learning experience, enhance
              your teaching methods, or manage your educational organization.
            </div>
          </div>
        </section>
        <main className=" flex items-center justify-center lg:col-span-7  xl:col-span-6 ">
          <div className=" flex items-center justify-center lg:col-span-7 l xl:col-span-6 absolute top-28  w-3/12">
            <div className="w-full">
          
              <Link className="block text-black" to="/">
                <span className="sr-only">Home</span>
                <div className="flex justify-center">
                </div>
              </Link>
              <div className="text-2xl font-bold flex justify-center text-gray-900 sm:text-3xl md:text-4xl mt-[100px]">
                Welcome back
              </div>

              <div className="mt-4 text-xl leading-relaxed flex justify-center text-gray-500">
                Please login to your account
              </div>

              <form
                className="mt-8 grid grid-cols-3 gap-3 "
                onSubmit={handleLogin}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={email}
                    placeholder="ramkr@email.com"
                    required
                    onChange={(e) => setemail(e.target.value)}
                    className="mt-1  rounded-md  border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 w-full"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 "

                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    required
                    placeholder="••••••••"
                    onChange={(e) => setpassword(e.target.value)}
                    className="mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 w-full "
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full" type="submit">
                   
                   { !loadingLogin && ('Log in')}
                   {loadingLogin && ( <Spinner className="h-5 w-full text-white justify-center" />)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  }
    </>
  );
}
