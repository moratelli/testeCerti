const express = require("express");
const server = express();

server.use(express.json());

/* MIDDLEWARE */
const checarNumero = (req, res, callback) => {
  const data = req.params.numero;

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
    "dez"
  ];
  const dezenasIrregulares = [
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
    "dez",
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

  const numero = req.params.numero;
  let numeroArr = ("" + numero).split("").reverse();
  let wordsArr = [];

  /* caso seja número negativo */
  if (numero < 0) {
    const numeroPositivo = Math.abs(numero);
    numeroArr = ("" + numeroPositivo).split("").reverse();
    wordsArr.push("menos");
  }

  /* caso o número seja 0 */
  if (numero == 0) return res.status(200).json({ extenso: "zero" });

  let stringifyUnidades = arr => {
    wordsArr.push(unidades[arr[0]]);
  };

  let stringifyDezenas = arr => {
    let num = arr[1] + arr[0];

    if (num < 10) stringifyUnidades(arr);
    else if (num % 10 == 0) wordsArr.push(dezenas[arr[1]]);
    else if (num <= 19) wordsArr.push(dezenasIrregulares[arr[0]]);
    else {
      wordsArr.push(`${dezenas[arr[1]]} e`);
      stringifyUnidades(arr[0]);
    }
  };

  let stringifyCentenas = arr => {
    let num = arr[2] + arr[1] + arr[0];

    if (num < 100) stringifyDezenas(arr);
    else if (num == 100) wordsArr.push("cem");
    else if (num % 100 == 0) wordsArr.push(centenas[arr[2]]);
    else {
      wordsArr.push(`${centenas[arr[2]]} e`);
      stringifyDezenas(arr);
    }
  };

  let stringifyMilhares = arr => {
    let num = arr[3] + arr[2] + arr[1] + arr[0];
    if (num % 1000 == 0) wordsArr.push(`${unidades[arr[3]]} mil`);
    else if ((arr[3] = 1)) {
      wordsArr.push(`mil e`);
      stringifyCentenas(arr);
    } else {
      wordsArr.push(`${unidades[arr[3]]} mil e`);
      stringifyCentenas(arr);
    }
  };

  let stringifyDezenasMilhares = arr => {
    let num = [arr[3], arr[4]];
    stringifyDezenas(num);
    wordsArr.push(`mil e`);
    stringifyCentenas(arr);
  };

  if (numeroArr.length == 1) stringifyUnidades(numeroArr);
  else if (numeroArr.length == 2) stringifyDezenas(numeroArr);
  else if (numeroArr.length == 3) stringifyCentenas(numeroArr);
  else if (numeroArr.length == 4) stringifyMilhares(numeroArr);
  else if (numeroArr.length == 5) stringifyDezenasMilhares(numeroArr);

  let cleanArray = wordsArr.filter(elem => elem != "");

  let resultado = cleanArray.join(" ");

  return res.status(200).json({ extenso: resultado });
});

server.listen(3000);
