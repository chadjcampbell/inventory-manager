import axios from "axios";
import { toast } from "react-toastify";
import { userUpdateData } from "../../../pages/Profile/EditProflie";

export const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export type UserDataType = {
  name?: String;
  email?: String;
  password?: String;
};

export const registerUser = async (userData: UserDataType) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/users/register",
      userData,
      {
        withCredentials: true,
      }
    );
    if (response.statusText === "OK") {
      toast.success("User Registered Successfully");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const loginUser = async (userData: UserDataType) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/users/login",
      userData
    );
    if (response.statusText === "OK") {
      toast.success("User Login Successful");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/users/logout");
    if (response.statusText === "OK") {
      toast.success("User Logout Successful");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData: UserDataType) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/users/forgotPassword",
      userData
    );
    if (response.statusText === "OK") {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (
  userData: UserDataType,
  resetToken: string
) => {
  try {
    const response = await axios.put(
      BACKEND_URL + "/api/users/resetPassword/" + resetToken,
      userData
    );
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/users/loggedIn/");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/users/getUser/");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateUser = async (formData: userUpdateData) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/api/users/updateUser",
      formData
    );
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
