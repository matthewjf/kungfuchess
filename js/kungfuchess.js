var Game = require('./game');

$(function () {
  var $root = $('#game');
  var game = new Game($root);

  var $controls = $('#game-controls');
  $('<input id="start" type="button" value="start" />').click(function(event){
    var $overlay = $('<div>').addClass('overlay').prependTo($('html'));
    var $modal = $('<div>').addClass('modal').appendTo($overlay);
    var $countdown = $('<div>')
      .addClass('countdown')
      .text('3')
      .appendTo($modal);

    setTimeout(function(){
      $countdown.text('2');
      setTimeout(function() {
        $countdown.text('1');
        setTimeout(function() {
          $overlay.empty();
          $overlay.remove();
        }, 1000);
      }, 1000);
    }, 1000);

    setTimeout(function(){
      game.play();
      $('#restart').prop('disabled', false);
      $('#start').prop('disabled', true);
    }, 3000);
  }).appendTo($controls);
  $('<input id="restart" type="button" value="restart" disabled/>').click(function(){
    game.destroy();
    game = new Game($root);
    $('#start').prop('disabled', false);
    $('#restart').prop('disabled', true);
  }).appendTo($controls);
  $('<input id="info" type="button" value="info" />').click(function(){

  }).appendTo($controls);
});
