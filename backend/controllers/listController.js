import { lists, setLists, deleteTodosInList } from "../data/store.js";

export const getlists = (req, res) => {
  res.json(lists);
};

export const getListById = (req, res) => {
  const id = Number(req.params.id);
  const list = lists.find((l) => l.id === id);

  if (!list) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(list);
};

export const createList = (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const newList = {
    id: Date.now(),
    title,
  };

  setLists([...lists, newList]);

  res.status(201).json(newList);
};

export const updateList = (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const existing = lists.find((l) => l.id === id);
  if (!existing) {
    return res.status(404).json({ error: "Not found" });
  }

  if (!body.title || body.title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const updated = { ...existing, ...body };

  setLists(lists.map((l) => (l.id === id ? updated : l)));

  res.json(updated);
};

export const deleteList = (req, res) => {
  const id = Number(req.params.id);

  const index = lists.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  deleteTodosInList(id);
  setLists(lists.filter((t) => t.id !== id));

  res.status(204).send();
};
