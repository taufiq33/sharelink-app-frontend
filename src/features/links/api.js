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
    const request = await baseApi.get("/links?sort=DESC");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function getUserLinks() {
  try {
    const request = await baseApi.get("/links?sortBy=order&sort=ASC&limit=20");
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

export async function addLink(linkData) {
  try {
    const request = await baseApi.post("/links", linkData);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function deleteLink(linkId) {
  try {
    const request = await baseApi.delete(`/links/${linkId}`);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function editLink(linkId, linkData) {
  try {
    const request = await baseApi.put(`/links/${linkId}`, linkData);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function saveOrder(arrayOfLinksId) {
  try {
    const request = await baseApi.put("/links/reorder", arrayOfLinksId);
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
