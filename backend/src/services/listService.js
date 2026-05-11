import {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} from "../repositories/listRepository.js";

export const getListsService = async () => {
  return await getAllLists();
};

export const getListByIdService = async (id) => {
  const list = await getListById(id);

  if (!list) {
    throw new Error("List not found");
  }

  return list;
};

export const createListService = async (data) => {
  if (!data.title?.trim()) {
    throw new Error("title is required");
  }

  return await createList(data.title);
};

export const updateListService = async (id, data) => {
  if (data.title !== undefined && !data.title.trim()) {
    throw new Error("title is required");
  }

  const updated = await updateList(id, data.title);

  if (!updated) {
    throw new Error("List not found");
  }

  return await getListById(id);
};

export const deleteListService = async (id) => {
  const deleted = await deleteList(id);

  if (!deleted) {
    throw new Error("List not found");
  }

  return deleted;
};
