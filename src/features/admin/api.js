import { baseApi } from "@/lib/axios";

export async function getAppStats() {
  try {
    const request = await baseApi.post("/admin/getStats");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function get5LastAppStats() {
  try {
    const request = await baseApi.post("/admin/getRecentStats");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function getAllUsers() {
  try {
    const request = await baseApi.get("/admin/users");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function flagUser(type, id) {
  // active/ block
  try {
    const request = await baseApi.patch(`/admin/users/${type}/${id}`);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function getUserDetail(id) {
  try {
    const request = await baseApi.get(`/admin/users?userId=${id}`);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
