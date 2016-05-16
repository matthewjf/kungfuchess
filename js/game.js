var Display = require('./display');
var Board = require('./board');
var Player = require('./player');
var randomAI = require('./randomAI');
var greedyAI = require('./greedyAI');
var AI = require('./AI');

var Game = function($root) {
  this.board = new Board();
  this.board.populate();
  this.display = new Display($root, this.board);
  this.running = false;

  this.players = {
    white: new Player(this.board),
    black: new AI(this.board, this.display)
  };

  this.renderBoard();
};

Game.prototype.play = function () {
  this.display.setup();
  this.players.black.run();
  this.running = true;
};

Game.prototype.renderBoard = function () {
  this.display.setGrid();
};

Game.prototype.destroy = function () {
  this.running = false;
  this.players.black.kill();
  this.board.destroy();
  this.display.destroy();
};

module.exports = Game;
