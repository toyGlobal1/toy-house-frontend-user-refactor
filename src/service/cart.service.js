import { axiosInstance } from "../lib/axios.config";

export function getUserCart() {
  return axiosInstance.get("/api/v1/user/get/cart?request-id=1234");
}
