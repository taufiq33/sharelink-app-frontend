import { baseApi } from "@/lib/axios";

export async function fetchMe() {
  try {
    const { data } = await baseApi.get("/me");
    return data.data.user;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function updateProfile(payload, apiProperty) {
  const { method, url } = apiProperty;
  try {
    const { data } =
      method === "PUT"
        ? await baseApi.put(url, payload)
        : await baseApi.post(url, payload);
    return data.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function removePhotoProfile() {
  try {
    const { data } = await baseApi.delete("/me/photoProfile");
    return data.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
