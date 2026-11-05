// A CAVERNA: mineração. O minério depende da sorte (Diamante > Prata > Bronze).
// Também dá acesso à Masmorra, mais ao fundo.
const prompt = require("prompt-sync")();
const { sorte, sortearMinerio } = require("../sistemas/sorte");
const { MINERIOS, adicionarItem } = require("../sistemas/inventario");
const combate = require("../sistemas/combate");
const { criarInimigo, sortearInimigo } = require("../sistemas/inimigos");

function minerar(heroi) {
  // encontro aleatório: inimigo ou evento
  const tipo = sortearInimigo("caverna");
  if (tipo) {
    combate(heroi, criarInimigo(tipo));
    return;
  }
  if (sorte(0.1)) {
    heroi.vida = heroi.vida - 1;
    console.log("O teto desaba em cima de você! Vida: " + heroi.vida);
    if (heroi.vida <= 0) {
      console.log("Você foi soterrado.");
      heroi.gameOver = true;
    }
    return;
  }

  const minerio = sortearMinerio();
  adicionarItem(heroi, minerio);
  heroi.xp = heroi.xp + MINERIOS[minerio].xp;
  console.log("Você minera " + minerio + "! +" + MINERIOS[minerio].xp + " XP (XP: " + heroi.xp + ")");
}

function caverna(heroi) {
  console.log("");
  console.log("1 - minerar   2 - voltar para a vila   3 - descer para a masmorra   4 - ver status");
  const escolha = prompt("> ");

  if (escolha === "1") {
    minerar(heroi);
  } else if (escolha === "2") {
    return "vila";
  } else if (escolha === "3") {
    return "masmorra";
  } else if (escolha === "4") {
    heroi.status();
  } else {
    console.log("Valor inválido.");
  }
  return "caverna";
}

module.exports = caverna;
