// A VILA: ponto central. Leva para a Floresta, a Caverna e a Taverna.
const prompt = require("prompt-sync")();
const { adicionarItem } = require("../sistemas/inventario");

function vila(heroi) {
  // evento: o velho pescador entrega a moeda furada inicial (só uma vez)
  if (!heroi.recebeuMoeda) {
    console.log("Um velho pescador te entrega uma moeda furada: 'Não vale nada. Guarde mesmo assim.'");
    adicionarItem(heroi, "moeda furada");
    heroi.recebeuMoeda = true;
  }

  console.log("");
  console.log("1 - floresta   2 - caverna   3 - taverna   4 - ver status");
  const escolha = prompt("> ");

  if (escolha === "1") {
    return "floresta";
  } else if (escolha === "2") {
    return "caverna";
  } else if (escolha === "3") {
    return "taverna";
  } else if (escolha === "4") {
    heroi.status();
  } else {
    console.log("Valor inválido.");
  }
  return "vila";
}

module.exports = vila;
