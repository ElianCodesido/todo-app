import { db } from "../config/db.js";

export const getListsByUser = async (id) => {
  const [rows] = await db.query(
    "SELECT id, title FROM lists WHERE user_id = ?",
    [id],
  );
  return rows;
};

export const getListById = async (userId, listId) => {
  const [rows] = await db.query(
    "SELECT id, title FROM lists WHERE id = ? AND user_id = ?",
    [listId, userId],
  );
  return rows[0];
};
//prettier-ignore
export const createList = async (userId, title) => {
  const [result] = await db.query("INSERT INTO lists (title, user_id) VALUES (?, ?)", [title, userId]);
  if (result.affectedRows === 0) {
    return null;
  }
  return {
    id: result.insertId,
    title,
  };
};

export const updateList = async (userId, listId, newtitle) => {
  const [result] = await db.query(
    `
      UPDATE lists
      SET title = ?
      WHERE id = ?
      AND user_id = ?
    `,
    [newtitle, listId, userId],
  );

  return result.affectedRows > 0;
};

export const deleteList = async (userId, listId) => {
  const [result] = await db.query(
    "DELETE FROM lists WHERE id = ? AND user_id = ?",
    [listId, userId],
  );

  return result.affectedRows > 0;
};
