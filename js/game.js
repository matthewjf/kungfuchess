var Display = require('./display');
var Board = require('./board');
var Player = require('./player');
var randomAI = require('./randomAI');

var Game = function($root) {
  this.board = new Board();
  this.board.populate();
  this.display = new Display($root, this.board);

  this.players = {
    white: new Player(this.board),
    black: new randomAI(this.board, this.display)
  };

  this.renderBoard();
};

Game.prototype.play = function () {
  this.display.setup();
  this.players.black.run();
};

Game.prototype.renderBoard = function () {
  this.display.setGrid();
};

module.exports = Game;
