// A TAVERNA: descanso e comércio.
const prompt = require("prompt-sync")();
const { sorte } = require("../sistemas/sorte");
const { MINERIOS, adicionarItem, removerItem, contarItem } = require("../sistemas/inventario");
const combate = require("../sistemas/combate");
const { criarInimigo, sortearInimigo } = require("../sistemas/inimigos");

const PRECO_BEBIDA = 1;
const PRECO_CACHACA = 1;
const PRECO_POCAO = 3;

// Evento surpresa depois de beber: Janones aparece.
function eventoBriga(heroi) {
  const tipo = sortearInimigo("taverna");
  if (tipo) {
    console.log("");
    console.log("Janones apareceu e quer te converter para o EXERCITO DO LULA!");
    combate(heroi, criarInimigo(tipo));
  }
}

function comprarBebida(heroi) {
  if (heroi.moedas < PRECO_BEBIDA) {
    console.log("Você não tem moedas.");
  } else if (heroi.vida >= heroi.vidaMaxima) {
    console.log("Você já está com a vida cheia.");
  } else {
    heroi.moedas = heroi.moedas - PRECO_BEBIDA;
    heroi.vida = Math.min(heroi.vida + 3, heroi.vidaMaxima);
    console.log("Você bebe e descansa. Vida: " + heroi.vida + " | Moedas: " + heroi.moedas);
    eventoBriga(heroi);
  }
}

// A Cachaça da Sorte: o efeito depende da sorte do momento.
function beberCachaca(heroi) {
  if (heroi.moedas < PRECO_CACHACA) {
    console.log("Você não tem moedas.");
    return;
  }
  heroi.moedas = heroi.moedas - PRECO_CACHACA;
  console.log("Você vira a cachaça misteriosa...");

  if (sorte(0.5)) {
    // BUFF (sorte alta)
    if (sorte(0.5)) {
      heroi.vida = Math.min(heroi.vida + 3, heroi.vidaMaxima);
      console.log("Que cachaça boa! Você recupera vida extra. Vida: " + heroi.vida);
    } else {
      heroi.buffAtaque = 2;
      heroi.buffTurnos = 3;
      console.log("Você sente a força subir! +2 de ataque nos próximos 3 turnos de combate.");
    }
  } else {
    // NERF (sorte baixa)
    if (sorte(0.5)) {
      heroi.vida = Math.max(heroi.vida - 2, 1);
      console.log("Queimou a garganta! Você perde 2 de vida. Vida: " + heroi.vida);
    } else {
      heroi.tonto = 1;
      console.log("A taverna gira... você ficará tonto por 1 turno no próximo combate.");
    }
  }
  eventoBriga(heroi);
}

function comprarPocao(heroi) {
  if (heroi.moedas < PRECO_POCAO) {
    console.log("Poção custa " + PRECO_POCAO + " moedas.");
  } else {
    heroi.moedas = heroi.moedas - PRECO_POCAO;
    adicionarItem(heroi, "poção");
    console.log("Você compra uma poção. Moedas: " + heroi.moedas);
  }
}

function venderMinerios(heroi) {
  let total = 0;
  for (const nome of Object.keys(MINERIOS)) {
    const qtd = contarItem(heroi, nome);
    for (let i = 0; i < qtd; i++) {
      removerItem(heroi, nome);
    }
    total = total + qtd * MINERIOS[nome].valor;
  }
  if (total === 0) {
    console.log("Você não tem minérios para vender.");
  } else {
    heroi.moedas = heroi.moedas + total;
    console.log("Você vende seus minérios por " + total + " moedas. Moedas: " + heroi.moedas);
  }
}

function taverna(heroi) {
  console.log("");
  console.log("1 - bebida (" + PRECO_BEBIDA + " moeda, +3 vida)   2 - Cachaça da Sorte (" + PRECO_CACHACA + " moeda)");
  console.log("3 - poção (" + PRECO_POCAO + " moedas)   4 - vender minérios   5 - voltar para a vila   6 - ver status");
  const escolha = prompt("> ");

  if (escolha === "1") {
    comprarBebida(heroi);
  } else if (escolha === "2") {
    beberCachaca(heroi);
  } else if (escolha === "3") {
    comprarPocao(heroi);
  } else if (escolha === "4") {
    venderMinerios(heroi);
  } else if (escolha === "5") {
    return "vila";
  } else if (escolha === "6") {
    heroi.status();
  } else {
    console.log("Valor inválido.");
  }
  return "taverna";
}

module.exports = taverna;
