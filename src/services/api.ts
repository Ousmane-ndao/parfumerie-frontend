import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
export const API_BASE = API_URL.replace(/\/api\/?$/, "");
export const TOKEN_KEY = "salaicha_admin_token";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Préfixe les URLs d'upload servies par le backend Express. */
export function resolveMediaUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE}${url}`;
  return url;
}
