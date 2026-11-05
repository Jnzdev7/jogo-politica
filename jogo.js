// Loop principal do jogo: estado, interface do terminal e Game Over.
// Rodar com: node jogo.js
const prompt = require("prompt-sync")();
const heroi = require("./heroi");
const mapa = require("./regioes/mapa");

// Roda o jogo até o herói vencer ("vitoria") ou morrer ("gameover").
function jogar() {
  let local = "vila";
  let anterior = null;

  while (true) {
    // só descreve o lugar quando o herói chega nele
    if (local !== anterior) {
      console.log("");
      console.log(mapa.descricoes[local]);
      anterior = local;
    }

    const destino = mapa.regioes[local](heroi);

    if (heroi.gameOver) {
      return "gameover";
    }
    if (destino === "fim") {
      return "vitoria";
    }
    // só anda por rotas que existem no mapa
    if (destino !== local && mapa.conexoes[local].includes(destino)) {
      local = destino;
    }
  }
}

let jogarDeNovo = true;

while (jogarDeNovo) {
  heroi.reiniciar();
  heroi.nome = prompt("Qual é o nome do seu herói? ") || "Herói";

  console.log("");
  console.log(heroi.nome + ", a costa está ameaçada. Explore, minere, junte XP e enfrente os chefes da masmorra.");

  const resultado = jogar();

  if (resultado === "gameover") {
    console.log("");
    console.log("GAME OVER. " + heroi.nome + " caiu e o jogo recomeça do zero.");
  } else {
    console.log("");
    console.log("FIM: " + heroi.nome + " salvou a costa com " + heroi.vida + " de vida, " + heroi.xp + " de XP e " + heroi.moedas + " moedas.");
    jogarDeNovo = prompt("Jogar de novo? (s/n) ") === "s";
  }
}
