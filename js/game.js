var Display = require('./display');
var Board = require('./board');
var Player = require('./player');

var Game = function($root) {
  this.board = new Board();
  this.board.populate();
  this.display = new Display($root, this.board);
  this.players = {white: new Player(this.board), black: ''};
};

Game.prototype.play = function () {
  this.display.setup();
};

module.exports = Game;
