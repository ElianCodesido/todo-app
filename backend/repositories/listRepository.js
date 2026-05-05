// repositories/listRepository.js

let lists = [];

export const listRepository = {
  getAll: () => lists,

  getById: (id) => lists.find((l) => l.id === id),

  create: (list) => {
    const newlist = { id: Date.now(), ...list };
    lists.push(newlist);
    return newlist;
  },

  update: (id, data) => {
    const index = lists.findIndex((l) => l.id === id);
    if (index === -1) return null;

    lists[index] = { ...lists[index], ...data };
    return lists[index];
  },

  delete: (id) => {
    lists = lists.filter((l) => l.id !== id);
  },
};
