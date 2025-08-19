import pool from "./pool";
import bcrypt from "bcryptjs";

type TUser = {
  username: string;
  email: string;
  password: string;
};

export async function getUserById(id: number) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

export async function getUserByUsername(username: string) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username LIKE ($1)",
    [username]
  );
  return rows[0];
}

export async function getUserByEmail(email: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = ($1)", [
    email,
  ]);
  return rows[0];
}

export async function addNewUser(user: TUser) {
  const username = user.username;
  const hash = await bcrypt.hash(user.password, 10);
  const email = user.email;
  await pool.query(
    "INSERT INTO users (username, hash, email) VALUES ($1, $2, $3)",
    [username, hash, email]
  );
}

export async function updateUsersMembership(id: number) {
  await pool.query("UPDATE users SET isAdmin = true WHERE id = ($1)", [id]);
}

export async function addNewMessage(
  userID: number,
  title: string,
  message: string,
  date: string
) {
  try {
    await pool.query(
      "INSERT INTO messages (users_id, title, message, message_date) VALUES ($1, $2, $3, $4)",
      [userID, title, message, date]
    );
  } catch (error) {
    console.log(error);
  }
}
