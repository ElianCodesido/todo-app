import { db } from "../config/db.js";

export const getAllTodos = async (listId) => {
  let query = `
    SELECT
      id,
      title,
      completed,
      list_id AS listId
    FROM todos
  `;

  const values = [];

  if (listId !== undefined) {
    query += " WHERE list_id = ?";
    values.push(listId);
  }

  const [rows] = await db.query(query, values);

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
export const createTodo = async (title, listId) => {
  const [result] = await db.query("INSERT INTO todos (title, completed, list_id) VALUES (?, ?, ?)", [title, false, listId]);
  return {
    id: result.insertId,
    title,
    completed: false,
    listId,
  };
};

export const updateTodo = async (id, newTitle, completed) => {
  const [result] = await db.query(
    `
      UPDATE todos
      SET title = ?, completed = ?
      WHERE id = ?
    `,
    [newTitle, completed, id],
  );

  return result.affectedRows > 0;
};

export const deleteTodo = async (id) => {
  const [result] = await db.query("DELETE FROM todos WHERE id = ?", [id]);

  return result.affectedRows > 0;
};
