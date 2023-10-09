const express = require("express");
const { getUsers } = require("./db/index");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(JSON.stringify(users));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
