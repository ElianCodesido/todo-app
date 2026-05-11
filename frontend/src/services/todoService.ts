import type { Task } from "../types/Task";

const API_URL = import.meta.env.VITE_API_URL + "/todos";

const throwError = async (res: Response) => {
  try {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unknown error");
  } catch {
    throw new Error("Server error");
  }
};

export const getTodos = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      await throwError(res);
    }
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const getTodosByList = async (listId: number): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_URL}?listId=${listId}`);

    if (!res.ok) {
      await throwError(res);
    }

    return await res.json();
  } catch (error) {
    throw new Error("Error fetching todos for this list");
  }
};

export const createTodo = async (todo: Omit<Task, "id">) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      await throwError(res);
    }
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const updateTodo = async (id: number, todo: Omit<Task, "id">) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      await throwError(res);
    }
    return res.json();
  } catch {
    throw new Error("Cannot connect to server");
  }
};

export const removeTodo = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      await throwError(res);
    }
  } catch {
    throw new Error("Cannot connect to server");
  }
};
