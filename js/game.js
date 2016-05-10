var Display = require('./display');
var Board = require('./board');

var Game = function($root) {
  this.board = new Board();
  this.display = new Display($root, this.board);
};

Game.prototype.play = function () {
  this.display.setGrid();
};

module.exports = Game;
