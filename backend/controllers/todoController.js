import { todoService } from "../services/todoService.js";

export const getTodos = (req, res) => {
  res.json(todoService.getTodos());
};

export const getTodoById = (req, res) => {
  try {
    const todo = todoService.getTodoById(Number(req.params.id));
    res.json(todo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createTodo = (req, res) => {
  try {
    const todo = todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTodo = (req, res) => {
  try {
    const updated = todoService.updateTodo(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTodo = (req, res) => {
  todoService.deleteTodo(Number(req.params.id));
  res.sendStatus(204);
};
