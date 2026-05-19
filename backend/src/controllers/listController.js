import {
  getListsService,
  getListByIdService,
  createListService,
  updateListService,
  deleteListService,
} from "../services/listService.js";

export const getLists = async (req, res) => {
  const lists = await getListsService();
  res.json(lists);
};

export const getListById = async (req, res) => {
  try {
    const list = await getListByIdService(Number(req.params.id));
    res.json(list);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createList = async (req, res) => {
  try {
    const list = await createListService(req.body);
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const updated = await updateListService(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteList = async (req, res) => {
  await deleteListService(Number(req.params.id));
  res.sendStatus(204);
};
