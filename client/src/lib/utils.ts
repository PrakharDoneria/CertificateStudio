import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateCertificateId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = `CERT-${new Date().getFullYear()}-`;
  for (let i = 0; i < 9; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
