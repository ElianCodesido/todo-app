import { listRepository } from "../repositories/listRepository.js";
import { todoRepository } from "../repositories/todoRepository.js";

export const listService = {
  getLists: () => {
    return listRepository.getAll();
  },
  getListById: (id) => {
    const list = listRepository.getById(id);

    if (!list) {
      throw new Error("Not found");
    }

    return list;
  },

  createList: (data) => {
    if (!data.title) {
      throw new Error("Text is required");
    }

    return listRepository.create(data);
  },
  updateList: (id, data) => {
    if (data.title !== undefined && !data.title.trim()) {
      throw new Error("Text is required");
    }

    const updated = listRepository.update(id, data);

    if (!updated) {
      throw new Error("Not found");
    }

    return updated;
  },

  deleteList: (id) => {
    todoRepository.deleteByList(id);
    listRepository.delete(id);
  },
};
