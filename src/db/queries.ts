import pool from "./pool";

export async function getUserByUsername(username: string) {
  const { rows } = await pool.query(
    "SELECT username FROM users WHERE username = ($1)",
    [username]
  );
  return rows;
}

export async function getUserByEmail(email: string) {
  const { rows } = await pool.query(
    "SELECT email FROM users WHERE email = ($1)",
    [email]
  );
  return rows;
}
