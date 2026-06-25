import type { AuthResponse } from "../types/Auth.ts";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

const throwError = async (res: Response) => {
  const errorData = await res.json();
  throw new Error(errorData.error ?? "Unknown error");
};

const postAuth = async (endpoint: string, data: object) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await throwError(res);
  }

  return res.json();
};

//prettier-ignore
export const registerService = async (email: string, password: string): Promise<AuthResponse> => {
  return postAuth("/register", { email, password });
};
export const loginService = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return postAuth("/login", { email, password });
};
