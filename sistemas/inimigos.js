// Lista de inimigos do jogo.
//   nome, vida, ataque (dano), chanceAcerto (0 a 1)
//   xp, moedas   -> recompensa quando o herói vence
//   habilidade   -> "roubo" = em vez de dano, rouba um item da mochila
//   chefe        -> true = não dá para fugir
//   drop         -> item exclusivo entregue pelo chefe
// Para trocar o texto de um inimigo, mexa só neste arquivo.
const { sorte } = require("./sorte");

const modelos = {
  // Floresta Sombria
  faquinha: { nome: "bolsominion", vida: 5, ataque: 2, chanceAcerto: 0.6, xp: 2, moedas: 2 },
  ladrao:   { nome: "petista", vida: 5, ataque: 1, chanceAcerto: 0.6, xp: 2, moedas: 2, habilidade: "roubo" },

  // Caverna
  Nikolas:  { nome: "nikolas ferrira", vida: 3, ataque: 1, chanceAcerto: 0.5, xp: 1, moedas: 1 },

  // Taverna: briga rápida
  Janones:   { nome: "janones", vida: 3, ataque: 1, chanceAcerto: 0.4, xp: 1, moedas: 1 },

  // Masmorra: chefes finais
  chefeEsquerda: { nome: "Lula de 10 Dedos", vida: 12, ataque: 3, chanceAcerto: 0.5, xp: 5, moedas: 10, chefe: true, drop: "Dedo do Lula" },
  chefeDireita:  { nome: "Bolsonaro", vida: 12, ataque: 3, chanceAcerto: 0.5, xp: 5, moedas: 10, chefe: true, drop: "Faca do Bolsonaro" },
};

function criarInimigo(tipo) {
  const modelo = modelos[tipo];
  if (!modelo) {
    throw new Error("Inimigo desconhecido: " + tipo);
  }
  // devolve uma cópia, para cada combate ter o seu inimigo com vida própria
  return { ...modelo };
}

// Sorteia o inimigo de um lugar. Devolve o tipo (para criarInimigo) ou null se ninguém aparecer.
function sortearInimigo(lugar) {
  if (lugar === "floresta") {
    if (!sorte(0.6)) {
      return null;
    }
    return sorte(0.5) ? "faquinha" : "ladrao";
  }
  if (lugar === "caverna") {
    return sorte(0.3) ? "Nikolas" : null;
  }
  if (lugar === "taverna") {
    return sorte(0.15) ? "Janones" : null;
  }
  return null;
}

module.exports = { criarInimigo, sortearInimigo };
