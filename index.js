const express = require("express");
const server = express();

server.use(express.json());

/* MIDDLEWARE */
const checarNumero = (req, res, callback) => {
  const data = req.params.numero;
  console.log(data);

  if (isNaN(data) === true)
    return res.status(400).json({ error: "Não é um número!" });
  else if (data < -99999)
    return res.status(400).json({ error: "Número menor que -99999!" });
  else if (data > 99999)
    return res.status(400).json({ error: "Número maior que 99999!" });

  return callback();
};

/* ROUTES */
server.get("/:numero", checarNumero, (req, res) => {
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
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos"
  ];

  let numero = req.params.numero;
  let wordsArr = [];

  /* caso seja número negativo */
  const negativo = "menos";
  if (numero < 0) {
    wordsArr.push(negativo);
    numero = Math.abs(numero);
    console.log(numero);
  }

  /* caso seja 0 */
  if (numero == 0) return res.status(200).json({ extenso: "zero" });

  /* caso esteja entre 1 - 19 */
  if (numero < 20) {
    wordsArr.push(unidades[numero]);
  }

  const resultado = wordsArr.join(" ");
  return res.status(200).json({ extenso: resultado });
});

server.listen(3000);
