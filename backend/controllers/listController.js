let lists = [];

export const getTodos = (req, res) => {
  res.json(lists);
};

export const getTodoById = (req, res) => {
  const id = Number(req.params.id);
  const todo = lists.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(todo);
};

export const createTodo = (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is required" });
  }

  const newList = {
    id: Date.now(),
    text,
  };

  lists.push(newList);

  res.status(201).json(newList);
};

export const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const existing = lists.find((t) => t.id === id);
  if (!existing) {
    return res.status(404).json({ error: "Not found" });
  }

  if (!body.text || body.text.trim() === "") {
    return res.status(400).json({ error: "text is required" });
  }

  const updated = { ...existing, ...body };

  lists = lists.map((t) => (t.id === id ? updated : t));

  res.json(updated);
};

export const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  const exists = lists.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Not found" });
  }

  lists = lists.filter((t) => t.id !== id);
  todos = todos.filter((t) => t.listId !== id);

  res.status(204).send();
};
