import { axiosInstance } from "../lib/axios.config";

export const login = async (data) => {
  return await axiosInstance.post("/api/v1/open/users/login", data);
};

export const register = async (data) => {
  return await axiosInstance.post("/api/v1/open/users/register?request-id=1234", data);
};

export const getUserProfile = async () => {
  return await axiosInstance.get("/api/v1/user/get/profile?request-id=1234");
};
