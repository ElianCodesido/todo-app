import { db } from "../config/db.js";

export const getListsByUser = async (id) => {
  const [rows] = await db.query("SELECT * FROM lists WHERE user_id = ?", [id]);
  return rows;
};

export const getListById = async (id) => {
  const [rows] = await db.query("SELECT * FROM lists WHERE id = ?", [id]);
  return rows[0];
};
//prettier-ignore
export const createList = async (title, userId) => {
  const [result] = await db.query("INSERT INTO lists (title, user_id) VALUES (?, ?)", [title, userId]);
  return {
    id: result.insertId,
    title,
    userId,
  };
};

export const updateList = async (id, newtitle) => {
  const [result] = await db.query(
    `
      UPDATE lists
      SET title = ?
      WHERE id = ?
    `,
    [newtitle, id],
  );

  return result.affectedRows > 0;
};

export const deleteList = async (id) => {
  const [result] = await db.query("DELETE FROM lists WHERE id = ?", [id]);

  return result.affectedRows > 0;
};
