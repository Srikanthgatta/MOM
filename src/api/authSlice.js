import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { keyUri, config } from "../key";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const admin = localStorage.getItem("userinfo")
  ? localStorage.getItem("userinfo")
  : null;

export const initialState = {
  loading: false,
  hasError: false,
  isAuthenticate: token ? true : false,
  admin: admin,
  token: token,
};

export const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getlogin: (state) => {
      state.loading = true;
    },

    getAuthenticate: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticate = true;
      state.admin = payload.admin;
      state.token = payload.accessToken;
    },
    isAuthenticateError: (state) => {
      state.hasError = true;
      state.loading = false;
      state.isAuthenticate = false;
    },
    getUserProfile: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticate = true;
    },
  },
});

export const {
  getlogin,
  getUserProfile,
  getAuthenticate,
  isAuthenticateError,
} = authenticateSlice.actions;

export const authenticateSelector = (state) => state.auth;
export default authenticateSlice.reducer;

export const logOut = () => async (dispatch) => {
  console.log("logout");
  try {
    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (error) {
    dispatch(isAuthenticateError());
  }
};

export const fetchlogin = (logindata) => async (dispatch) => {
  dispatch(getlogin());
  try {
    const { data } = await axios.post(
      keyUri.BACKEND_URI + "/admins/sign-in",
      logindata,
      config
    );
    localStorage.setItem("token", data.accessToken);
    console.log(data)
    toast.success(`${data.message}`, {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(getAuthenticate(data));
  } catch (response) {
    setTimeout(() => {
      toast.error(`${response.response.data.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 200);
    dispatch(isAuthenticateError(response));
  }
};



export const fetchAdminProfile = (token) => async (dispatch) => {
  console.log(token);

  const loginConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(getlogin());
  try {
    const { data } = await axios.get(
      keyUri.BACKEND_URI + "/adminProfile",
      loginConfig
    );
    dispatch(getUserProfile(data));
  } catch (error) {
    console.log(error);
    dispatch(logOut());
  }
};
