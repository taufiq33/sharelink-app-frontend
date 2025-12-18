import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { baseURLApi } from "./axios";
import { formatDistanceToNow, isYesterday, isToday, format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getDeviceId() {
  const deviceId = localStorage.getItem("sharelink-app_device_ID");

  if (!deviceId) {
    const newDeviceId = v4();
    localStorage.setItem("sharelink-app_device_ID", newDeviceId);
  }

  return localStorage.getItem("sharelink-app_device_ID");
}

export function formatDateTime(date) {
  const d = new Date(date);

  if (isToday(d)) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  if (isYesterday(d)) {
    return "yesterday";
  }

  return format(d, "dd MMM yyyy, p");
}

export function getUserProfilePictureUrl(username) {
  return `${baseURLApi}/public/photoProfile/${username}`;
}
