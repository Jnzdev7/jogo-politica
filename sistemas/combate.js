// Sistema de combate por turnos.
// Uso: const venceu = combate(heroi, criarInimigo("faquinha"));
// Retorna true se o herói venceu, false se o herói caiu ou fugiu.
// Se o herói morrer, o combate liga heroi.gameOver = true.
const prompt = require("prompt-sync")();
const { sorte, sortearIndice, bonusDano, resistencia } = require("./sorte");
const { temItem, adicionarItem, removerItem, bonusDeArma } = require("./inventario");

const DANO_BASE = 2;
const CHANCE_ACERTO_HEROI = 0.7;
const CURA_POCAO = 5;

// Dano do herói: base + bônus de XP + arma + buff temporário da Taverna.
function danoDoHeroi(heroi) {
  return DANO_BASE + bonusDano(heroi.xp) + bonusDeArma(heroi) + heroi.buffAtaque;
}

function turnoDoHeroi(heroi, inimigo) {
  if (heroi.tonto > 0) {
    heroi.tonto = heroi.tonto - 1;
    console.log("Você está tonto e perde o turno!");
    return;
  }
  if (sorte(CHANCE_ACERTO_HEROI)) {
    const dano = danoDoHeroi(heroi);
    inimigo.vida = inimigo.vida - dano;
    console.log("Você acerta! " + inimigo.nome + " perde " + dano + " de vida.");
  } else {
    console.log("Você erra o golpe.");
  }
  if (heroi.buffTurnos > 0) {
    heroi.buffTurnos = heroi.buffTurnos - 1;
    if (heroi.buffTurnos === 0) {
      heroi.buffAtaque = 0;
      console.log("O efeito da bebida passou.");
    }
  }
}

function turnoDoInimigo(heroi, inimigo) {
  if (!sorte(inimigo.chanceAcerto)) {
    console.log(inimigo.nome + " erra o ataque.");
    return;
  }
  // habilidade especial: rouba um item em vez de causar dano
  if (inimigo.habilidade === "roubo" && heroi.inventario.length > 0) {
    const item = heroi.inventario[sortearIndice(heroi.inventario.length)];
    removerItem(heroi, item);
    inimigo.roubados.push(item);
    console.log(inimigo.nome + " rouba \"" + item + "\" da sua mochila!");
    return;
  }
  const dano = Math.max(1, inimigo.ataque - resistencia(heroi.xp));
  heroi.vida = heroi.vida - dano;
  console.log(inimigo.nome + " te acerta! Você perde " + dano + " de vida.");
}

function usarPocao(heroi) {
  removerItem(heroi, "poção");
  const antes = heroi.vida;
  heroi.vida = Math.min(heroi.vida + CURA_POCAO, heroi.vidaMaxima);
  console.log("Você bebe a poção e recupera " + (heroi.vida - antes) + " de vida.");
}

function recompensa(heroi, inimigo) {
  // o ladrão derrotado devolve o que roubou
  for (const item of inimigo.roubados) {
    adicionarItem(heroi, item);
    console.log("Você recupera \"" + item + "\".");
  }
  heroi.xp = heroi.xp + inimigo.xp;
  heroi.moedas = heroi.moedas + inimigo.moedas;
  console.log("+" + inimigo.xp + " XP, +" + inimigo.moedas + " moedas.");
  if (inimigo.drop) {
    adicionarItem(heroi, inimigo.drop);
    console.log("Item obtido: " + inimigo.drop + "!");
  }
}

function combate(heroi, inimigo) {
  inimigo.roubados = [];

  console.log("");
  console.log("[COMBATE] " + inimigo.nome + " aparece! (vida " + inimigo.vida + ")");

  while (heroi.vida > 0 && inimigo.vida > 0) {
    console.log("");
    console.log(heroi.nome + ": " + heroi.vida + " de vida | " + inimigo.nome + ": " + inimigo.vida + " de vida");
    let menu = "1 - atacar   2 - fugir";
    if (temItem(heroi, "poção")) {
      menu = menu + "   3 - usar poção";
    }
    console.log(menu);
    const escolha = prompt("> ");

    if (escolha === "1") {
      turnoDoHeroi(heroi, inimigo);
      if (inimigo.vida > 0) {
        turnoDoInimigo(heroi, inimigo);
      }
    } else if (escolha === "2") {
      if (inimigo.chefe) {
        console.log("Não há por onde fugir. É lutar ou morrer!");
        turnoDoInimigo(heroi, inimigo);
      } else {
        console.log("Você foge do combate.");
        return false;
      }
    } else if (escolha === "3" && temItem(heroi, "poção")) {
      usarPocao(heroi);
      turnoDoInimigo(heroi, inimigo);
    } else {
      console.log("Valor inválido.");
    }
  }

  if (heroi.vida <= 0) {
    console.log("Você foi derrotado por " + inimigo.nome + ".");
    heroi.gameOver = true;
    return false;
  }

  console.log("Você derrotou " + inimigo.nome + "!");
  recompensa(heroi, inimigo);
  return true;
}

module.exports = combate;
