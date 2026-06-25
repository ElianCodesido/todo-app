import {
  getTodosByListService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService.js";

export const getTodosByList = async (req, res) => {
  const listId = req.params.listId;

  const todos = await getTodosByListService(req.user.id, listId);

  res.json(todos);
};

export const createTodo = async (req, res) => {
  try {
    const todo = await createTodoService(req.user.id, req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updated = await updateTodoService(
      req.user.id,
      req.params.todoId,
      req.body,
    );
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await deleteTodoService(req.user.id, req.params.todoId);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};
