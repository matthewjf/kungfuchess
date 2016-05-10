var Display = require('./display');
var Board = require('./board');

var Game = function($root) {
  this.board = new Board();
  this.board.populate();
  this.display = new Display($root, this.board);
  this.players = {white: '', black: ''};
};

Game.prototype.play = function () {
  this.display.setup();
};

module.exports = Game;
