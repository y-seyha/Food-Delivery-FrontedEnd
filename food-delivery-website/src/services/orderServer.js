import { axiosInstance, API_PATHS } from "../api";

export const placeOrder = async (orderData) => {
  const res = await axiosInstance.post(API_PATHS.ORDER.CREATE, orderData);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await axiosInstance.get(API_PATHS.ORDER.MY_ORDERS);
  return res.data;
};
