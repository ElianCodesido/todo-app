import { getListById } from "../repositories/listRepository.js";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../repositories/todoRepository.js";

export const getTodosService = async (listId) => {
  return await getAllTodos(listId);
};

export const getTodoByIdService = async (id) => {
  const todos = await getTodoById(id);

  if (!todos) {
    throw new Error("todos not found");
  }

  return todos;
};

export const createTodoService = async (data) => {
  if (!data.title?.trim()) {
    throw new Error("title is required");
  }

  if (!data.listId) {
    throw new Error("List id is required");
  }

  const list = await getListById(data.listId);

  if (!list) {
    throw new Error("List not found");
  }

  return await createTodo(data.title, data.listId);
};

export const updateTodoService = async (id, data) => {
  if (data.title !== undefined && !data.title.trim()) {
    throw new Error("title is required");
  }

  const updated = await updateTodo(id, data.title, data.completed);

  if (!updated) {
    throw new Error("Todo not found");
  }

  return await getTodoById(id);
};

export const deleteTodoService = async (id) => {
  const deleted = await deleteTodo(id);

  if (!deleted) {
    throw new Error("Todo not found");
  }

  return deleted;
};
