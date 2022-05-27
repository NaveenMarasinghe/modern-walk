import { User } from "../types/user";
import { axiosInstance } from "./api.services";

async function signup(user: User) {
  try {
    const res = await axiosInstance.post("/users", user);
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
    const res = await axiosInstance.get(`/users/email=${email}`);
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
