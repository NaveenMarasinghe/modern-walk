import axios from "axios"
import {User} from "../@types/user.d"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

export const UserAPI = {
    login: async function(email: string, password: string) {
        const res = await axiosInstance.request({
            method: "GET",
            url: `/users?email=${email}&password=${password}`
        });
        return res.data
    },
    signup: async function(user: User) {
        const res = await axiosInstance.request({
            method: "POST",
            url: `/users`,
            data: user
        });
        return res.data
    },
    email: async function(email: string) {
        const res = await axiosInstance.request({
            method: "GET",
            url: `/users/email=${email}`
        });
        return res.data
    },
}