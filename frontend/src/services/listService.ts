import type { List } from "../types/List";

const API_URL = import.meta.env.VITE_API_URL + "/lists";

const throwError = async (res: Response) => {
  try {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unknown error");
  } catch {
    throw new Error("Server error");
  }
};

export const getLists = async (): Promise<List[]> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) await throwError(res);
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const createList = async (title: string): Promise<List> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) await throwError(res);
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const updateList = async (id: number, list: Omit<List, "id">) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });

    if (!res.ok) {
      await throwError(res);
    }
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const removeList = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) await throwError(res);
  } catch {
    throw new Error("Cannot connect to server");
  }
};
