var Game = require('./game');
var Info = require('./info');

$(function () {
  $('body').addClass('no-select');
  var $root = $('#game');

  // SPEED SETTINGS
  var $settings = $('#game-settings');
  $settings.text('Speed   ');
  $('<div id="slow" class="setting button">').text('slow').appendTo($settings);
  $('<div id="normal" class="setting button">').text('normal').appendTo($settings);
  $('<div id="fast" class="setting button">').text('fast').appendTo($settings);
  $('.setting').click(function(event) {
    $('.indicator').removeClass('active');
    $(event.currentTarget).children('.indicator').addClass('active');
  });
  $('.setting').prepend($('<div class="indicator"/>'));
  $('#normal').children('.indicator').addClass('active');


  var $controls = $('#game-controls');

  // START
  $('<input id="start" type="button" value="start" />').click(function(event){
    game = new Game($root);

    var $overlay = $('#overlay');
    var $countdown = $('.countdown').text('3');

    $('#start').prop('disabled', true);
    $('.setting').addClass('disabled').off();

    setTimeout(function(){
      $countdown.text('2');
      setTimeout(function() {
        $countdown.text('1');
        setTimeout(function() {
          $overlay.empty();
          $overlay.remove();
          game.play();
          $('#reset').prop('disabled', false);
        }, 1000);
      }, 1000);
    }, 1000);
  }).appendTo($controls);

  // RESET
  $('<input id="reset" type="button" value="reset" disabled/>').click(function(){
    $('.overlay').empty();
    $('.overlay').remove();
    game.destroy();
    game = new Game($root);
    var $overlay = $('<div>').attr('id', 'overlay').appendTo('#game');
    var $countdown = $('<div>')
      .addClass('countdown')
      .appendTo($overlay);
    $('#start').prop('disabled', false);
    $('#reset').prop('disabled', true);
    $('.setting').removeClass('disabled').click(function(event) {
      $('.indicator').removeClass('active');
      $(event.currentTarget).children('.indicator').addClass('active');
    });
  }).appendTo($controls);

  // INFO
  $('<input id="info" type="button" value="info" />').click(function(){
    Info.openModal();
  }).appendTo($controls);

  var game = new Game($root);
  $('<div>').attr('id', 'overlay').prependTo($('#game'));
  $('<div>').addClass('countdown').appendTo($('#overlay'));
});
