import { db } from "../config/db.js";

export const getAllLists = async () => {
  const [rows] = await db.query("SELECT * FROM lists");
  return rows;
};

export const getListById = async (id) => {
  const [rows] = await db.query("SELECT * FROM lists WHERE id = ?", [id]);
  return rows[0];
};
//prettier-ignore
export const createList = async (title) => {
  const [result] = await db.query("INSERT INTO lists (title) VALUES (?)", [title]);
  return {
    id: result.insertId,
    title,
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
  await db.query("DELETE FROM todos WHERE list_id = ?", [id]);
  const [result] = await db.query("DELETE FROM lists WHERE id = ?", [id]);

  return result.affectedRows > 0;
};
