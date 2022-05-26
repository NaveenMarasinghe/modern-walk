import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

async function getClothing(category: string) {
  try {
    const res = await axiosInstance.request({
      method: "GET",
      url: `/${category}`,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export const ProductAPI = {
  getClothing: getClothing,
};
