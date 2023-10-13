// import { Pool} from "pg";
const { Pool } = require("pg");

// const pool = new Pool();
// process.env.PGUSER = "postgres";
// process.env.PGHOST = "localhost";
// process.env.PGPASSWORD = "postgres";
// process.env.PGDATABASE = "ecommerce";
// process.env.PGPORT = 5432;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "postgres",
  port: 5432,
});

async function getUsers() {
  const result = await pool.query("select * from users;");
  console.log(result);
  return result.rows;
}

async function createUsers(
  first_name,
  last_name,
  password,
  email,
  address,
  account_name
) {
  const client = await pool.connect();
  const result = await client.query(
    `INSERT INTO users (first_name, last_name, password, email, address, account_name)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [first_name, last_name, password, email, address, account_name]
  );
  const newUser = result.rows[0];
  return newUser;
}

async function editUsers(
  first_name,
  last_name,
  password,
  address,
  account_name,
  userId
) {
  const client = await pool.connect();
  const result = await client.query(
    "UPDATE users SET first_name = $1, last_name = $2, password = $3, address = $4, account_name = $5 WHERE id = $6 RETURNING *",
    [first_name, last_name, password, address, account_name, userId]
  );

  if (result.rowCount === 0) {
    throw new Error(`User with ID ${userId} does not exist!`);
  }

  const updatedUser = result.rows[0];
  return updatedUser;
}

async function deleteUsers(userId) {
  const client = await pool.connect();
  await client.query("DELETE FROM users WHERE id = $1", [userId]);
}

async function getUserByEmailOrUserName(email, account_name) {
  const client = await pool.connect();
  const result = await client.query(
    "select * from users WHERE email = $1 OR account_name = $2 ;",
    [email, account_name]
  );

  return result.rows[0];
}

module.exports = {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers,
  getUserByEmailOrUserName,
};
