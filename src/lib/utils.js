import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

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
