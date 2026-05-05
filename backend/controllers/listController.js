import { listService } from "../services/listService.js";

export const getLists = (req, res) => {
  res.json(listService.getLists());
};

export const getListById = (req, res) => {
  try {
    const list = listService.getListById(Number(req.params.id));
    res.json(list);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createList = (req, res) => {
  try {
    const list = listService.createList(req.body);
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateList = (req, res) => {
  try {
    const updated = listService.updateList(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteList = (req, res) => {
  listService.deleteList(Number(req.params.id));
  res.sendStatus(204);
};
