import axios from "axios";
import { User } from "../types/user";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

async function signup(user: User) {
  try {
    const res = await axiosInstance.request({
      method: "POST",
      url: `/users`,
      data: user,
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function login(email: string, password: string) {
  try {
    const res = await axiosInstance.get(
      `/users?email=${email}&password=${password}`
    );
    return res;
  } catch (err) {
    return err;
  }
}

async function email(email: string) {
  try {
    const res = await axiosInstance.request({
      method: "GET",
      url: `/users/email=${email}`,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export const UserAPI = {
  login: login,
  signup: signup,
  email: email,
};
