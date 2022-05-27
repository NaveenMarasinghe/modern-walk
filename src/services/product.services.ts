import { axiosInstance } from "./api.services";

async function getClothing(category: string) {
  try {
    const res = await axiosInstance.get(`/${category}`);
    return res;
  } catch (err) {
    return err;
  }
}

export const ProductAPI = {
  getClothing: getClothing,
};
