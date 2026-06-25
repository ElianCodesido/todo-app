import {
  getListsService,
  createListService,
  updateListService,
  deleteListService,
} from "../services/listService.js";

export const getLists = async (req, res) => {
  const lists = await getListsService(req.user.id);
  res.json(lists);
};

export const createList = async (req, res) => {
  try {
    const list = await createListService(req.user.id, req.body);
    res.status(201).json(list);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};

export const updateList = async (req, res) => {
  try {
    const updated = await updateListService(
      req.user.id,
      req.params.id,
      req.body,
    );
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    await deleteListService(req.user.id, req.params.id);
  } catch (error) {
    res.sendStatus(err.status || 500).json({
      error: err.message,
    });
  }
};
