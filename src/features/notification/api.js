import { baseApi } from "@/lib/axios";

export async function getNotificationsByUser() {
  try {
    const request = await baseApi.post("/notification");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const request = await baseApi.patch(`/notification/read/${notificationId}`);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function markAllNotificationAsRead() {
  try {
    const request = await baseApi.put(`/notification/readAll/`);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
