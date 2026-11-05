// REGRAS: sorte (Math.random), sorteio de minérios e bônus de XP.
// Tudo que depende de sorte no jogo passa por aqui.

const TESTE = false; // true = a sorte fica fixa em 0.2, útil para testar sempre a mesma coisa

// Devolve true com a probabilidade "chance" (de 0 a 1). Ex.: sorte(0.3) = 30% de chance.
function sorte(chance) {
  let valor = Math.random();
  if (TESTE) {
    valor = 0.2;
  }
  return valor < chance;
}

// Sorteia um índice de 0 até tamanho - 1 (para escolher um item de um vetor).
function sortearIndice(tamanho) {
  return Math.floor(Math.random() * tamanho);
}

// Minério da Caverna. Hierarquia de raridade: Diamante > Prata > Bronze.
function sortearMinerio() {
  if (sorte(0.05)) {
    return "Diamante";   // lendário: 5%
  }
  if (sorte(0.25)) {
    return "Prata";      // raro: ~24%
  }
  return "Bronze";       // comum: o resto
}

// Bônus de XP: quanto mais XP, mais dano e mais resistência.
function bonusDano(xp) {
  return Math.floor(xp / 5);      // +1 de dano a cada 5 de XP
}

function resistencia(xp) {
  return Math.floor(xp / 10);     // -1 de dano recebido a cada 10 de XP
}

module.exports = { sorte, sortearIndice, sortearMinerio, bonusDano, resistencia };
