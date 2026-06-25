import { db } from "../config/db.js";

export const getTodosByListAndUser = async (userId, listId) => {
  const [rows] = await db.query(
    `
    SELECT
      todos.id,
      todos.title,
      todos.completed,
      todos.list_id AS listId,
      todos.created_at AS createdAt
    FROM todos
    JOIN lists
      ON todos.list_id = lists.id
    WHERE todos.list_id = ?
      AND lists.user_id = ?
    `,
    [listId, userId],
  );

  return rows.map((todo) => ({
    ...todo,
    completed: Boolean(todo.completed),
  }));
};

export const getTodoById = async (id) => {
  const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
  const todo = rows[0];

  if (!todo) return null;

  return {
    id: todo.id,
    title: todo.title,
    completed: Boolean(todo.completed),
    listId: todo.list_id,
  };
};
//prettier-ignore
export const createTodo = async (userId, title, listId) => {
  const [lists] = await db.query(
    `
    SELECT id
    FROM lists
    WHERE id = ? AND user_id = ?
    `,
    [listId, userId]
  );

  if (lists.length === 0) {
    return null;
  }

  const [result] = await db.query(
    `
    INSERT INTO todos (title, completed, list_id)
    VALUES (?, ?, ?)
    `,
    [title, false, listId]
  );

  const [rows] = await db.query(
  `
  SELECT
    id,
    title,
    completed,
    list_id AS listId,
    created_at AS createdAt
  FROM todos
  WHERE id = ?
  `,
  [result.insertId]
);

return rows[0];
};

export const updateTodo = async (userId, todoId, newTitle, completed) => {
  const [rows] = await db.query(
    `
    SELECT todos.id
    FROM todos
    JOIN lists
      ON todos.list_id = lists.id
    WHERE todos.id = ?
      AND lists.user_id = ?
    `,
    [todoId, userId],
  );

  if (rows.length === 0) {
    return false;
  }

  const [result] = await db.query(
    `
    UPDATE todos
    SET title = ?, completed = ?
    WHERE id = ?
    `,
    [newTitle, completed, todoId],
  );

  return result.affectedRows > 0;
};

export const deleteTodo = async (userId, todoId) => {
  const [result] = await db.query(
    `DELETE todos FROM todos 
    JOIN lists
      ON todos.list_id = lists.id
    WHERE todos.id = ?
      AND lists.user_id = ?`,
    [todoId, userId],
  );

  return result.affectedRows > 0;
};
