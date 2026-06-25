import { getListById } from "../repositories/listRepository.js";
import {
  getTodosByListAndUser,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../repositories/todoRepository.js";
import { textValidation } from "../validations/textValidation.js";
import { HttpError } from "../errors/HttpError.js";
export const getTodosByListService = async (userId, listId) => {
  return await getTodosByListAndUser(userId, listId);
};

export const createTodoService = async (userId, data) => {
  const title = textValidation(data.title, 30);

  if (!data.listId || data.listId <= 0) {
    throw new HttpError(400, "ListId is required.");
  }

  const list = await getListById(userId, data.listId);

  if (!list) {
    throw new HttpError(404, "List not found.");
  }
  const newTodo = await createTodo(userId, title, data.listId);
  if (!newTodo) {
    throw new HttpError(404, "Failed to create todo.");
  }
  return newTodo;
};

export const updateTodoService = async (userId, todoId, data) => {
  const title = textValidation(data.title, 30);

  const updated = await updateTodo(userId, todoId, title, data.completed);

  if (!updated) {
    throw new HttpError(404, "Todo not found.");
  }

  return await getTodoById(todoId);
};

export const deleteTodoService = async (userId, todoId) => {
  const deleted = await deleteTodo(userId, todoId);

  if (!deleted) {
    throw new HttpError(404, "Todo not found.");
  }

  return deleted;
};
