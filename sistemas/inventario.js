// Sistema de inventário: funções para mexer na mochila + tabelas de itens do jogo.

// Minérios: XP ao minerar e valor de venda (em moedas) na Taverna.
const MINERIOS = {
  Bronze:   { xp: 1, valor: 1 },
  Prata:    { xp: 2, valor: 3 },
  Diamante: { xp: 5, valor: 10 },
};

// Armas: "bonus" é o dano extra enquanto a arma estiver na mochila.
// As que têm "preco" são vendidas pelo mercador da Masmorra; as outras são drops de chefe.
const ARMAS = {
  "Faquinha":   { bonus: 1, preco: 5 },
  "Arma":   { bonus: 2, preco: 12 },
  "Carteira de Trabalho": { bonus: 3, preco: 25 },
  "Dedo do Lula":       { bonus: 1 },
  "Faca do Bolsonaro":     { bonus: 3 },
};

function temItem(heroi, item) {
  return heroi.inventario.includes(item);
}

function adicionarItem(heroi, item) {
  heroi.inventario.push(item);
}

function removerItem(heroi, item) {
  const posicao = heroi.inventario.indexOf(item);
  if (posicao !== -1) {
    heroi.inventario.splice(posicao, 1);
  }
}

function contarItem(heroi, item) {
  let total = 0;
  for (const atual of heroi.inventario) {
    if (atual === item) {
      total = total + 1;
    }
  }
  return total;
}

// Maior bônus de dano entre as armas que o herói carrega.
function bonusDeArma(heroi) {
  let melhor = 0;
  for (const item of heroi.inventario) {
    if (ARMAS[item] && ARMAS[item].bonus > melhor) {
      melhor = ARMAS[item].bonus;
    }
  }
  return melhor;
}

// Texto da mochila agrupado: "Bronze x2, poção, moeda furada".
function resumoInventario(heroi) {
  if (heroi.inventario.length === 0) {
    return "vazia";
  }
  const vistos = [];
  const partes = [];
  for (const item of heroi.inventario) {
    if (!vistos.includes(item)) {
      vistos.push(item);
      const qtd = contarItem(heroi, item);
      partes.push(qtd > 1 ? item + " x" + qtd : item);
    }
  }
  return partes.join(", ");
}

module.exports = {
  MINERIOS, ARMAS,
  temItem, adicionarItem, removerItem, contarItem, bonusDeArma, resumoInventario,
};
