// A MASMORRA: o covil final. Exige 10 de XP. Tem um mercador de armas e dois chefes.
const prompt = require("prompt-sync")();
const { ARMAS, temItem, adicionarItem } = require("../sistemas/inventario");
const combate = require("../sistemas/combate");
const { criarInimigo } = require("../sistemas/inimigos");

const XP_MINIMO = 10;

function mercador(heroi) {
  const venda = Object.keys(ARMAS).filter(function (nome) {
    return ARMAS[nome].preco !== undefined;
  });

  let comprando = true;
  while (comprando) {
    console.log("");
    console.log("Mercador misterioso: 'Armas especiais, só por moedas.' (suas moedas: " + heroi.moedas + ")");
    for (let i = 0; i < venda.length; i++) {
      const arma = ARMAS[venda[i]];
      console.log((i + 1) + " - " + venda[i] + " (+" + arma.bonus + " de dano) - " + arma.preco + " moedas");
    }
    console.log("0 - sair");
    const escolha = prompt("> ");
    const nome = venda[Number(escolha) - 1];

    if (escolha === "0") {
      comprando = false;
    } else if (!nome) {
      console.log("Valor inválido.");
    } else if (temItem(heroi, nome)) {
      console.log("Você já tem essa arma.");
    } else if (heroi.moedas < ARMAS[nome].preco) {
      console.log("Moedas insuficientes.");
    } else {
      heroi.moedas = heroi.moedas - ARMAS[nome].preco;
      adicionarItem(heroi, nome);
      console.log("Você compra: " + nome + ".");
    }
  }
}

function masmorra(heroi) {
  // requisito de entrada
  if (heroi.xp < XP_MINIMO) {
    console.log("");
    console.log("Uma força te empurra para trás. Você precisa de " + XP_MINIMO + " de XP para entrar (você tem " + heroi.xp + ").");
    return "caverna";
  }

  console.log("");
  console.log("1 - falar com o mercador   2 - caminho da esquerda   3 - caminho da direita   4 - voltar para a caverna");
  const escolha = prompt("> ");

  if (escolha === "1") {
    mercador(heroi);
  } else if (escolha === "2" || escolha === "3") {
    const chefe = escolha === "2" ? criarInimigo("chefeEsquerda") : criarInimigo("chefeDireita");
    if (combate(heroi, chefe)) {
      console.log("");
      console.log("O covil treme e desaba em silêncio. A costa está salva!");
      return "fim";
    }
    // se o herói morreu, heroi.gameOver já está ligado e o jogo reinicia do zero
  } else if (escolha === "4") {
    return "caverna";
  } else {
    console.log("Valor inválido.");
  }
  return "masmorra";
}

module.exports = masmorra;
