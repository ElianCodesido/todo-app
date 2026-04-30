export let todos = [];
export let lists = [];

export const setTodos = (newTodos) => {
  todos = newTodos;
};

export const setLists = (newList) => {
  lists = newList;
};

export const deleteTodosInList = (id) => {
  setTodos(todos.filter((t) => t.listId !== id));
};
