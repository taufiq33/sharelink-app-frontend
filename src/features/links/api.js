import { baseApi } from "@/lib/axios";
import { getDeviceId } from "@/lib/utils";

export async function getPublicLinksByUsername(username) {
  try {
    const request = await baseApi.get("/public/links/" + username);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function getUserStatistics() {
  try {
    const request = await baseApi.get("/me/statistics");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function getUserRecentLinks() {
  try {
    const request = await baseApi.get("/links?order=DESC");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function trackLink(linkId) {
  try {
    const request = await baseApi.post("/public/tracklink", {
      deviceId: getDeviceId(),
      linkId: linkId,
    });
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
