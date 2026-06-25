import { authHeaders } from "../helpers/authHeaders";
import type { Task } from "../types/Task";

const API_URL = import.meta.env.VITE_API_URL + "/todos";

const throwError = async (res: Response) => {
  const errorData = await res.json();
  throw new Error(errorData.error || "Unknown error");
};

export const getTodosByList = async (listId: number): Promise<Task[]> => {
  const res = await fetch(`${API_URL}` + `/${listId}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    await throwError(res);
  }

  return await res.json();
};

export const createTodo = async (todo: Omit<Task, "id" | "createdAt">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    await throwError(res);
  }

  return res.json();
};

export const updateTodo = async (
  id: number,
  todo: Omit<Task, "id" | "createdAt">,
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    await throwError(res);
  }
  return res.json();
};

export const removeTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    await throwError(res);
  }
};
