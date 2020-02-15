const express = require("express");
const server = express();

server.use(express.json());

/* MIDDLEWARE */
const checkNumber = (req, res, callback) => {
  const data = req.params.number;
  console.log(data);

  if (isNaN(data) === true)
    return res.status(400).json({ error: "Not a number!" });
  else if (data < -99999)
    return res.status(400).json({ error: "Number is under -99999!" });
  else if (data > 99999)
    return res.status(400).json({ error: "Number is over 99999!" });

  return callback();
};

/* ROUTES */
server.get("/:number", checkNumber, (req, res) => {
  const unidades = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
    "dez",
    "onze",
    "doze",
    "treze",
    "catorze",
    "quize",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove"
  ];
  const dezenas = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa"
  ];
  const centenas = [
    "",
    "cem",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos"
  ];

  const number = req.params.number;

  return res.status(200).json({ extenso: number });
});

server.listen(3000);
