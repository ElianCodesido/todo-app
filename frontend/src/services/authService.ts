import type { Auth } from "../types/Auth.ts";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

const throwError = async (res: Response) => {
  try {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unknown error");
  } catch {
    throw new Error("Server error");
  }
};

const postAuth = async (endpoint: string, data: object) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) await throwError(res);
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

//prettier-ignore
export const registerService = async (email: string, password: string): Promise<Auth> => {
  return postAuth("/register", { email, password });
};
export const loginService = async (
  email: string,
  password: string,
): Promise<Auth> => {
  return postAuth("/login", { email, password });
};

//export const logout = async () => {}
