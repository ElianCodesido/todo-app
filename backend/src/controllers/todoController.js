import {
  getTodosService,
  getTodoByIdService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService.js";

export const getTodos = async (req, res) => {
  const listId = req.query.listId ? Number(req.query.listId) : undefined;

  const todos = await getTodosService(listId);

  res.json(todos);
};
export const getTodoById = async (req, res) => {
  try {
    const todo = await getTodoByIdService(Number(req.params.id));
    res.json(todo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await createTodoService(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updated = await updateTodoService(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  await deleteTodoService(Number(req.params.id));
  res.sendStatus(204);
};
