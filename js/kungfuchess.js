var Game = require('./game');

$(function () {
  var $root = $('#game');

  var $settings = $('#game-settings');
  $settings.text('Speed');
  $('<div id="slow" class="setting button">').text('slow').appendTo($settings);
  $('<div id="medium" class="setting button">').text('medium').appendTo($settings);
  $('<div id="fast" class="setting button">').text('fast').appendTo($settings);
  $('.setting').click(function(event) {
    $('.indicator').removeClass('active');
    $(event.currentTarget).children('.indicator').addClass('active');
  });
  $('.setting').prepend($('<div class="indicator"/>'));
  $('#medium').children('.indicator').addClass('active');

  var $controls = $('#game-controls');
  $('<input id="start" type="button" value="start" />').click(function(event){
    var $overlay = $('<div>').addClass('overlay').prependTo($('body'));
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
      $('#reset').prop('disabled', false);
      $('#start').prop('disabled', true);
    }, 3000);
  }).appendTo($controls);
  $('<input id="reset" type="button" value="reset" disabled/>').click(function(){
    game.destroy();
    game = new Game($root);
    $('#start').prop('disabled', false);
    $('#reset').prop('disabled', true);
  }).appendTo($controls);
  $('<input id="info" type="button" value="info" />').click(function(){
    window.open('https://en.wikipedia.org/wiki/Kung-Fu_Chess');
  }).appendTo($controls);

  var game = new Game($root);
});
