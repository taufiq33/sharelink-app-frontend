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

export function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
