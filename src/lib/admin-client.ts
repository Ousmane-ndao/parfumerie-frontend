import type { AxiosRequestConfig } from "axios";
import { api, TOKEN_KEY } from "@/services/api";

function normalizePath(url: string): string {
  return url.startsWith("/api") ? url.slice(4) : url;
}

export async function adminFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const config: AxiosRequestConfig = {
    url: normalizePath(url),
    method: (init?.method ?? "GET").toLowerCase() as AxiosRequestConfig["method"],
  };

  if (init?.body) {
    config.data = typeof init.body === "string" ? JSON.parse(init.body) : init.body;
  }

  try {
    const { data } = await api.request<T>(config);
    return data;
  } catch (error) {
    const message =
      axiosErrorMessage(error) ?? `Erreur ${(error as { response?: { status?: number } }).response?.status ?? "réseau"}`;
    throw new Error(message);
  }
}

function axiosErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === "object" && "response" in error) {
    const data = (error as { response?: { data?: { error?: string } } }).response?.data;
    return data?.error;
  }
  return undefined;
}

export async function checkAdminSession() {
  try {
    return await adminFetch<{ email: string; id: number }>("/api/admin/me");
  } catch {
    return null;
  }
}

export async function adminLogin(email: string, password: string) {
  const data = await adminFetch<{ ok: boolean; email: string; id: number; token: string }>("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function adminLogout() {
  try {
    await adminFetch("/api/admin/logout", { method: "POST" });
  } finally {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function adminUpload(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<{ url: string }>("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}
