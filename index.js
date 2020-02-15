const express = require("express");
const server = express();

server.use(express.json());

/* MIDDLEWARE */
const checkNumber = (req, res, callback) => {
  const data = req.params.number;
  console.log(data);

  if (isNaN(data) === true)
    return res.status(400).json({ error: "Not a number!" });
  else if (data <= -100000)
    return res.status(400).json({ error: "Number is under -99999!" });
  else if (data >= 100000)
    return res.status(400).json({ error: "Number is over 99999!" });

  return callback();
};

/* ROUTES */
server.get("/:number", checkNumber, (req, res) => {
  const number = req.params.number;

  return res.status(200).json({ All: "Good!" });
});

server.listen(3000);
