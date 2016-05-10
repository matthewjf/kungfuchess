var Game = require('./game');

$(function () {
  var $root = $('#game');
  var game = new Game($root);
  game.play();
});
