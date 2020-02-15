const express = require("express");
const server = express();

/* ROUTES */
server.get("/", (req, res) => {
  return res.status(200).json({ Hello: "World" });
});

server.listen(3000);
