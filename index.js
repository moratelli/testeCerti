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

  let numero = req.params.numero;
  console.log(numero);
  let numeroArr = ("" + numero).split("").reverse();
  let wordsArr = [];

  /* caso seja número negativo */
  const negativo = "menos";
  if (numero < 0) {
    wordsArr.push(negativo);
    numero = Math.abs(numero);
    numeroArr = ("" + numero).split("").reverse();
    console.log(numeroArr);
  }

  if (numero == 0) return res.status(200).json({ extenso: "zero" });

  let stringifyUnidades = arr => {
    wordsArr.push(unidades[arr[0]]);
  };

  let stringifyDezenas = arr => {
    let soma = arr[1] + arr[0];
    console.log(soma);

    if (soma < 10) stringifyUnidades(arr);
    else if (soma % 10 == 0) wordsArr.push(dezenas[arr[1]]);
    else if (soma <= 19) wordsArr.push(dezenasIrregulares[arr[0]]);
    else {
      wordsArr.push(`${dezenas[arr[1]]} e`);
      stringifyUnidades(arr[0]);
    }
  };

  let stringifyCentenas = arr => {
    if (numero == 100) wordsArr.push("cem");
    else if (numero % 100 == 0) wordsArr.push(centenas[arr[2]]);
    else {
      wordsArr.push(`${centenas[arr[2]]} e`);
      stringifyDezenas(arr);
    }
  };

  if (numeroArr.length == 1) stringifyUnidades(numeroArr);
  else if (numeroArr.length == 2) stringifyDezenas(numeroArr);
  else if (numeroArr.length == 3) stringifyCentenas(numeroArr);

  /* caso esteja entre 1000 e 9999 */
  if (numero >= 1000 && numeroArr.length == 4) {
    let inicio = unidades[numeroArr[0]];
    let final = [numeroArr[1], numeroArr[2], numeroArr[3]];

    if (numero == 1000) wordsArr.push("mil");
    else if (numero % 1000 == 0) wordsArr.push(`${inicio} mil`);
    else if (numeroArr[1] == 0 && numeroArr[2] == 0)
      wordsArr.push(`${inicio} mil e ${unidades[numeroArr[3]]}`);
    else if (numeroArr[1] == 0) {
      if (numero % 10 == 0)
        wordsArr.push(`${inicio} mil e ${dezenas[numeroArr[2]]}`);
      else if (numeroArr[2] == 1)
        wordsArr.push(`${inicio} mil e ${dezenasIrregulares[numeroArr[3]]}`);
      else
        wordsArr.push(
          `${inicio} mil e ${dezenas[numeroArr[2]]} e ${unidades[numeroArr[3]]}`
        );
    } else {
      wordsArr.push(`${inicio} mil e`);
      stringifyCentenas(final);
    }
  }

  const resultado = wordsArr.join(" ");
  return res.status(200).json({ extenso: resultado });
});

server.listen(3000);

/* TRANSFORMAR ELSE/IF EM FUNCOES */
/* FLIPAR NUMEROARR E COLOCAR PRIMEIRAS CASAS EM PRIMEIRO LUGAR */
/* DESFLIPPAR APÓS TRABLHAR */
