import { axiosInstance } from "./api.services";
import { ItemsResponse, ErrorResponse } from "../types/items";

export type ClothingType = "men" | "women" | "clothing";

export type Response = {
  result?: ItemsResponse;
  error?: ErrorResponse;
};

const clothing = async (category: ClothingType): Promise<Response> => {
  try {
    const result: ItemsResponse = await axiosInstance.get(`/${category}`);
    console.log(result);
    return { result: result };
  } catch (err: any) {
    const error = err as ErrorResponse;
    console.log(error);
    return { error: error };
  }
};

export const ProductAPI = {
  clothing: clothing,
};
