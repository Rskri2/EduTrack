import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASEURL = import.meta.env.VITE_BACKEND_URL;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loadingLogin: false,
    loadingReg: false,
    loadingLogout: false,
  },
  reducers: {
    loginStart(state) {
      state.loadingLogin = true;
      state.isAuthenticated = true;
    },
    registerStart(state) {
      state.loadingReg = true;
    },
    registerSuccess(state) {
      state.isAuthenticated = true;
      state.loadingReg = false;
    },
    updatedUser(state, action) {
      state.user = action.payload.user;
    },
    registerFailure(state){
      state.loadingReg=false;
    },
    loginFailure(state){
      state.loadingLogin=false;
    }
  },
});
export const {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  updatedUser,
  registerFailure,
  loginFailure
} = authSlice.actions;
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASEURL}/users/login`, credentials, {
      withCredentials: true,
    });
    
    dispatch(updateUser(res.data.data));
    setData(res);
    return { success: true };
  } catch (error) {
    const err = error?.response?.data?.message
    ? error.response.data.message
    : error.message;
      dispatch(loginFailure())
    return { success: false, error: err };
  }
};

export const registerUser = (credentails) => async (dispatch) => {
  dispatch(registerStart());

  try {
    
    const res = await axios.post(`${BASEURL}/users/register`, credentails, {
      withCredentials: true,
    });
    
  dispatch(updateUser(res.data.data));
   setData(res);
    return { success: true };
  } catch (error) {
    const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
      dispatch(registerFailure())
    return { success: false, error: err };
  }
};

export const updateUser = (credentails) => async (dispatch) => {
  
  const token = window.localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${BASEURL}/users/updateMe`,
      credentails,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updatedUser(res.data.data));
    
    setData(res);
    window.localStorage.setItem("token", token);
  
  } catch (error) {
    
    const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
  }
};
export const addUser = (credentails) => async () => {
  const token = window.localStorage.getItem("token");

  try {
     await axios.post(`${BASEURL}/users/`, credentails, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error) {
    const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
    return { success: false, error: err };
  }
};
export const fetchUser = ()=>async()=>{
  const token = window.localStorage.getItem("token");
  try{
    const response = await axios.get(`${BASEURL}/users/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, users:response.data.users };
  }catch(error){
    const err = error?.response?.data?.message
    ? error.response.data.message
    : error.message;
  return { success: false, error: err };
  }
}
export const deleteUser = (id)=>async()=>{
  const token = window.localStorage.getItem("token");
  try{
     await axios.delete(`${BASEURL}/users/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return { success: true };
  }catch(error){
    const err = error?.response?.data?.message
    ? error.response.data.message
    : error.message;
  return { success: false, error: err };
  }
}
export const editUser = (credentials)=>async()=>{
  const token = window.localStorage.getItem("token");
  try{
     await axios.patch(`${BASEURL}/users/${credentials.id}`, credentials.values,{
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  }catch(error){
    const err = error?.response?.data?.message
    ? error.response.data.message
    : error.message;
  return { success: false, error: err };
  }
}
const setData = (res)=>{
  window.localStorage.setItem("token", res.data.token);
  window.localStorage.setItem("name", res.data.data.user.name);
  window.localStorage.setItem("email", res.data.data.user.email);
  window.localStorage.setItem("role", res.data.data.user.role);
}

export default authSlice.reducer;
