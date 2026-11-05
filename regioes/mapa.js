// MAPA: descrições, conexões entre os lugares e a função que roda em cada um.
const vila = require("./vila");
const floresta = require("./floresta");
const caverna = require("./caverna");
const taverna = require("./taverna");
const masmorra = require("./masmorra");

// função que roda em cada lugar (devolve o nome do próximo lugar)
const regioes = { vila, floresta, caverna, taverna, masmorra };

// para onde se pode ir a partir de cada lugar
const conexoes = {
  vila: ["floresta", "caverna", "taverna"],
  floresta: ["vila"],
  caverna: ["vila", "masmorra"],
  taverna: ["vila"],
  masmorra: ["caverna"],
};

// texto mostrado ao chegar em cada lugar
const descricoes = {
  vila: "[VILA] Casas de pedra e barcos puxados na areia. A costa está em perigo e todos olham para você.",
  floresta: "[FLORESTA SOMBRIA] Galhos fechados. Algo se mexe no chão.",
  caverna: "[CAVERNA] Veios de minério brilham na parede. Mais ao fundo, um portão de ferro leva à masmorra.",
  taverna: "[TAVERNA] Cheiro de cachaça e madeira velha. Dá para descansar e fazer negócio.",
  masmorra: "[MASMORRA] O covil final. Dois caminhos se abrem na escuridão.",
};

module.exports = { regioes, conexoes, descricoes };
