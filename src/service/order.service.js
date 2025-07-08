import { axiosInstance } from "../lib/axios.config";

export const getAllOrders = async () => {
  return await axiosInstance.get("/api/v1/admin/order/get/all?page=0&size=1000&request-id=1234");
};

export const updateOrderStatus = async ({ orderId, status }) => {
  return await axiosInstance.put(
    `/api/v1/admin/order/update/${orderId}?order-status=${status}&request-id=1234`
  );
};

export const placeOrder = async (orderData) => {
  return await axiosInstance.post("/api/v1/open/create/order?request-id=1234", orderData);
};

export const getUserOrders = async () => {
  return await axiosInstance.get(
    "/api/v1/user/get/orders?page-number=0&page-size=1000&request-id=1234"
  );
};
