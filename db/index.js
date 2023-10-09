// import { Pool} from "pg";

const { Pool } = require("pg");

process.env.PGUSER = "postgres";
process.env.PGHOST = "localhost";
process.env.PGPASSWORD = "postgres";
process.env.PGDATABASE = "ecommerce";
process.env.PGPORT = 5432;

// const pool = new Pool({
//     host: signerOptions.hostname,
//     port: signerOptions.port,
//     user: signerOptions.username,
//     database: 'my-db',
//     password: getPassword,
//   })

const pool = new Pool();

// const res = await pool.query("SELECT NOW()");
// await pool.end();

// export const query = (text, params, callback) => {
//   return pool.query(text, params, callback);
// };

async function getUsers() {
  const result = await pool.query("select * from users;");
  console.log(result);

  return result.rows;
}

module.exports = { getUsers };
