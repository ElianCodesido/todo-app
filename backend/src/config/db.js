import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "todo_user",
  password: "cancerbero",
  database: "todo_app",
});
