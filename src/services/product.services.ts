import { axiosInstance } from "./api.services";
import { useQuery } from "react-query";

async function getClothing(category: string) {
  try {
    const res = await axiosInstance.get(`/${category}`);
    return res;
  } catch (err) {
    return err;
  }
}

const clothing = async (category: string) => {
  return await axiosInstance.get(`/${category}`);
};

export const ProductAPI = {
  getClothing: getClothing,
  clothing: clothing,
};
