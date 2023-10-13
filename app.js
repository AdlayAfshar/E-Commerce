const express = require("express");
const {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers,
  getUserByEmailOrUserName,
} = require("./db/index");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { first_name, last_name, password, email, address, account_name } =
    req.body;
  try {
    const preExistingUser = await getUserByEmailOrUserName(email, account_name);

    if (preExistingUser) {
      res.status(409).json({
        error: `user with email ${email} or account_name ${account_name} already exists.`,
      });
      return;
    }

    const users = await createUsers(
      first_name,
      last_name,
      password,
      email,
      address,
      account_name
    );
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

app.delete("/deleteUser/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await deleteUsers(userId);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
