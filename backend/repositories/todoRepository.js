let todos = [];

export const todoRepository = {
  getAll: () => todos,

  getById: (id) => todos.find((t) => t.id === id),

  create: (data) => {
    const newTodo = { id: Date.now(), ...data };
    todos.push(newTodo);
    return newTodo;
  },

  update: (id, data) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...data };
    return todos[index];
  },

  delete: (id) => {
    todos = todos.filter((t) => t.id !== id);
  },

  deleteByList: (listId) => {
    todos = todos.filter((t) => t.listId !== listId);
  },
};
