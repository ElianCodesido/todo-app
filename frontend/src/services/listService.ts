import type { List } from "../types/List";
import { authHeaders } from "../helpers/authHeaders";

const API_URL = import.meta.env.VITE_API_URL + "/lists";

const throwError = async (res: Response) => {
  const errorData = await res.json();
  throw new Error(errorData.error || "Unknown error");
};

export const getLists = async (): Promise<List[]> => {
  const res = await fetch(`${API_URL}`, {
    headers: authHeaders(),
  });
  if (!res.ok) await throwError(res);
  return res.json();
};

export const createList = async (title: string): Promise<List> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title }),
  });

  if (!res.ok) await throwError(res);
  return res.json();
};

export const updateList = async (id: number, title: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    await throwError(res);
  }
  return res.json();
};

export const removeList = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) await throwError(res);
};
