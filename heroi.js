// PERSONAGEM: vida, XP, moedas, inventário e efeitos temporários.
const { resumoInventario } = require("./sistemas/inventario");

const heroi = {
  nome: "",
  vida: 10,
  vidaMaxima: 10,
  xp: 0,
  moedas: 0,
  inventario: [],        // itens, minérios, armas e poções
  buffAtaque: 0,         // dano extra temporário (cachaça da sorte)
  buffTurnos: 0,         // por quantos turnos o buff dura
  tonto: 0,              // turnos em que o herói perde o ataque
  recebeuMoeda: false,   // o pescador da Vila só entrega a moeda furada uma vez
  gameOver: false,       // o combate liga isto quando o herói morre
};

// Volta tudo ao começo (usado no Game Over).
heroi.reiniciar = function () {
  this.nome = "";
  this.vida = 10;
  this.vidaMaxima = 10;
  this.xp = 0;
  this.moedas = 0;
  this.inventario = [];
  this.buffAtaque = 0;
  this.buffTurnos = 0;
  this.tonto = 0;
  this.recebeuMoeda = false;
  this.gameOver = false;
};

heroi.status = function () {
  console.log("");
  console.log("--- " + this.nome + " ---");
  console.log("Vida: " + this.vida + "/" + this.vidaMaxima + " | XP: " + this.xp + " | Moedas: " + this.moedas);
  console.log("Mochila: " + resumoInventario(this));
  if (this.buffTurnos > 0) {
    console.log("Efeito: +" + this.buffAtaque + " de ataque por " + this.buffTurnos + " turno(s)");
  }
};

module.exports = heroi;
