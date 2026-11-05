// A FLORESTA SOMBRIA: inimigos aparecem de forma aleatória (sorte). Cada vitória dá 2 de XP e moedas.
const prompt = require("prompt-sync")();
const { sorte } = require("../sistemas/sorte");
const combate = require("../sistemas/combate");
const { criarInimigo, sortearInimigo } = require("../sistemas/inimigos");

function floresta(heroi) {
  console.log("");
  console.log("1 - explorar   2 - voltar para a vila   3 - ver status");
  const escolha = prompt("> ");

  if (escolha === "1") {
    const tipo = sortearInimigo("floresta");
    if (tipo) {
      combate(heroi, criarInimigo(tipo));
    } else if (sorte(0.3)) {
      heroi.moedas = heroi.moedas + 1;
      console.log("Entre as raízes você acha uma moeda. Moedas: " + heroi.moedas);
    } else {
      console.log("Era só o vento.");
    }
  } else if (escolha === "2") {
    return "vila";
  } else if (escolha === "3") {
    heroi.status();
  } else {
    console.log("Valor inválido.");
  }
  return "floresta";
}

module.exports = floresta;
