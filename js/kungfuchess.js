var Game = require('./game');

$(function () {
  var $root = $('#game');
  var game = new Game($root);

  var $controls = $('#game-controls');
  $('<input id="start" type="button" value="start" />').click(function(event){
    game.play();
  }).appendTo($controls);
  $('<input id="restart" type="button" value="restart" />').click(function(){
    game = new Game($root);
  }).appendTo($controls);
  $('<input id="info" type="button" value="info" />').click(function(){

  }).appendTo($controls);
});
