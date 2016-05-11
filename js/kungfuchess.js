var Game = require('./game');

$(function () {
  var $root = $('#game');
  var game = new Game($root);
  $root.append('<input type="button" value="test" />');
  game.play();
});
