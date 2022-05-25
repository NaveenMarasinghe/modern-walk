import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

export const ProductAPI = {
    getClothing: async function(category:string) {
        const res = await axiosInstance.request({
            method: "GET",
            url: `/${category}`
        });
        return res.data
    },
}