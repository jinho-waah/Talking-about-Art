import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getKstTimeString = (): string => {
  const currentTime = new Date();
  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  const kstTime = new Date(utc + 9 * 60 * 60 * 1000);
  const year = kstTime.getFullYear();
  const month = String(kstTime.getMonth() + 1).padStart(2, "0");
  const day = String(kstTime.getDate()).padStart(2, "0");
  const hours = String(kstTime.getHours()).padStart(2, "0");
  const minutes = String(kstTime.getMinutes()).padStart(2, "0");
  const seconds = String(kstTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const FormatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};