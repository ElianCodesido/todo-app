import type { Task } from "../types/Task";

const API_URL = "http://localhost:3000/todos";

const throwError = async (res: Response) => {
  try {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unknown error");
  } catch {
    throw new Error("Server error");
  }
};

export const getTodos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    await throwError(res);
  }
  return res.json();
};

export const createTodo = async (todo: Omit<Task, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    await throwError(res);
  }
  return res.json();
};

export const updateTodo = async (id: number, todo: Omit<Task, "id">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
  });

  if (!res.ok) {
    await throwError(res);
  }
};
