import { setTodos, todos } from "../data/store.js";

export const getTodos = (req, res) => {
  const listIdStr = req.query.listId;

  if (listIdStr) {
    const listId = Number(listIdStr);
    const filtered = todos.filter((t) => t.listId === listId);
    return res.json(filtered);
  }

  res.json(todos);
};

export const getTodoById = (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(todo);
};

export const createTodo = (req, res) => {
  const { title, completed, listId } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: Date.now(),
    title,
    completed: completed ?? false,
    listId,
  };

  setTodos([...todos, newTodo]);

  res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const existing = todos.find((t) => t.id === id);
  if (!existing) {
    return res.status(404).json({ error: "Not found" });
  }

  if (!body.title || body.title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const updated = { ...existing, ...body };

  setTodos(todos.map((t) => (t.id === id ? updated : t)));

  res.json(updated);
};

export const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Not found" });
  }

  setTodos(todos.filter((t) => t.id !== id));

  res.status(204).send();
};
