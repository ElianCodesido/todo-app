import { todoRepository } from "../repositories/todoRepository.js";

export const todoService = {
  getTodos: () => {
    return todoRepository.getAll();
  },
  getTodoById: (id) => {
    const todo = todoRepository.getById(id);

    if (!todo) {
      throw new Error("Not found");
    }

    return todo;
  },

  createTodo: (data) => {
    if (!data.title) {
      throw new Error("title is required");
    }

    return todoRepository.create(data);
  },
  updateTodo: (id, data) => {
    if (data.title !== undefined && !data.title.trim()) {
      throw new Error("title is required");
    }

    const updated = todoRepository.update(id, data);

    if (!updated) {
      throw new Error("Not found");
    }

    return updated;
  },

  deleteTodo: (id) => {
    todoRepository.delete(id);
  },
};
