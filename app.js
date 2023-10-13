const express = require("express");
const { getUsers, createUsers, editUsers, deleteUsers } = require("./db/index");
const app = express();
const port = 3000;

// app.use(express.json());
app.use(express.json());

// app.get("/", async (req, res) => {
//   const users = await getUsers();
//   res.send(JSON.stringify(users));
// });

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
    // const client = await pool.connect();
    // const result = await client.query('SELECT * FROM users');
    // const users = result.rows;
    // client.release();
    // res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  const { first_name, last_name, password, email, address, account_name } =
    req.body;
  try {
    const users = await createUsers(
      first_name,
      last_name,
      password,
      email,
      address,
      account_name
    );
    res.status(200).json(users);
    // const client = await pool.connect();
    // const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    // const newUser = result.rows[0];
    // client.release();
    // res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.put("/", async (req, res) => {
//   const users = await getUsers();
//   res.send(JSON.stringify(users));
// });

// app.post("/", async (req, res) => {
//   const users = await createUsers();
//   res.send(JSON.stringify(users));
// });

// app.put('/updateUser/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { name, email } = req.body;
//   try {
//       const client = await pool.connect();
//       const result = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, userId]);
//       const updatedUser = result.rows[0];
//       client.release();
//       res.json(updatedUser);
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.put("/editUsers/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { first_name, last_name, password, address, account_name } = req.body;
  try {
    const users = await editUsers(
      first_name,
      last_name,
      password,
      address,
      account_name,
      userId
    );
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete('/deleteUser/:id', async (req, res) => {
  // const userId = req.params.id;
  const userId = parseInt(req.params.id);
  try {
      // const client = await pool.connect();
      // await client.query('DELETE FROM users WHERE id = $1', [userId]);
      // client.release();
      const users = await deleteUsers( userId );
      // res.send(users);
      res.json({ message: 'User deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.delete("/", async (req, res) => {
//   const users = await getUsers();
//   res.send(JSON.stringify(users));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
