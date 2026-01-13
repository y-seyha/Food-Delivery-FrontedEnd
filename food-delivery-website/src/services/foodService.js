import { axiosInstance, API_PATHS } from "../api";

export const getFoods = async () => {
  const res = await axiosInstance.get(API_PATHS.FOOD.LIST);
  return res.data;
};

export const getFoodById = async (id) => {
  const res = await axiosInstance.get(API_PATHS.FOOD.DETAILS(id));
  return res.data;
};
