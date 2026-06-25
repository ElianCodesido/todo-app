import {
  getListsByUser,
  getListById,
  createList,
  updateList,
  deleteList,
} from "../repositories/listRepository.js";
import { HttpError } from "../errors/HttpError.js";
import { textValidation } from "../validations/textValidation.js";

export const getListsService = async (id) => {
  return await getListsByUser(id);
};

export const createListService = async (userId, data) => {
  const title = textValidation(data.title, 20);

  const created = await createList(userId, title);

  if (!created) throw new HttpError(500, "List not found.");

  return created;
};

export const updateListService = async (userId, listId, data) => {
  const title = textValidation(data.title, 20);

  const updated = await updateList(userId, listId, title);

  if (!updated) {
    throw new HttpError(404, "List not found.");
  }

  const list = await getListById(userId, listId);

  if (!list) throw new HttpError(404, "List not found.");

  return list;
};

export const deleteListService = async (userId, listId) => {
  const deleted = await deleteList(userId, listId);

  if (!deleted) {
    throw new HttpError(404, "List not found.");
  }

  return deleted;
};
