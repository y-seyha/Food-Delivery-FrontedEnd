import { axiosInstance, API_PATHS } from "../api";

export const login = async (credentials) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, credentials);

  return res.data;
};

export const register = async (userData) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
  return res.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  } catch (error) {
    console.warn("Logout API Failed, Clearing Token Locally");
  }
  localStorage.removeItem("token");
};
