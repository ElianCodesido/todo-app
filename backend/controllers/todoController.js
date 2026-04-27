let todos = [];

export const getTodos = (req, res) => {
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
  const { title, completed } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: Date.now(),
    title,
    completed: completed ?? false,
  };

  todos.push(newTodo);

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

  todos = todos.map((t) => (t.id === id ? updated : t));

  res.json(updated);
};

export const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Not found" });
  }

  todos = todos.filter((t) => t.id !== id);

  res.status(204).send();
};
