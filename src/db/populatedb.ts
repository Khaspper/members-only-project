import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// users DB
const username = "Khaspper";
const hash = "abc";
const isAdmin = true;
const email = "abc@gmail.com";
// users DB

// messages DB
const title = "This is the title";
const message = "This is the message";
const message_date = new Date();
// messages DB

async function main() {
  console.log("Seeding...");
  // First determine the connection string
  const connectionString = process.env.LOCAL_DATABASE_URL;
  // Then setup the connection using the Client from PG
  const client = new Client({
    connectionString: connectionString,
    // ssl: { rejectUnauthorized: false },
  });
  // Then connect
  await client.connect();
  // Make queries
  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 55 ) UNIQUE NOT NULL,
  hash VARCHAR ( 255 ) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
  email VARCHAR ( 255 ) UNIQUE NOT NULL);
  `);

  await client.query(`
  CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  users_id INTEGER,
  title VARCHAR ( 55 ) NOT NULL,
  message VARCHAR ( 300 ) NOT NULL,
  message_date TIMESTAMPTZ NOT NULL
  );
  `);

  await client.query(
    `
  INSERT INTO users (username, hash, isAdmin, email)
  VALUES ($1, $2, $3, $4)
  `,
    [username, hash, isAdmin, email]
  );

  const { rows } = await client.query(
    `
    SELECT id FROM users
    WHERE username = ($1)
  `,
    [username]
  );

  await client.query(
    `
    INSERT INTO messages (users_id, title, message, message_date)
    VALUES ($1, $2, $3, $4)
  `,
    [rows[0].id, title, message, message_date]
  );
  await client.end();
  console.log("Done");
}
main();
