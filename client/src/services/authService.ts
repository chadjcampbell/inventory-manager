import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export type UserDataType = {
  name: String;
  email: String;
  password: String;
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
