var Display = function($root, board) {
  this.$root = $root;
  this.board = board;
};

Display.prototype.setGrid = function () {
  this.$root.append('<ul>');
  $("ul").attr('id','grid');
  var $grid = $('#grid');

  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var pos = [row, col];
      var posSum = row + col;
      var color = (posSum % 2 === 0 ? 'white' : 'black');
      $('<li>').addClass('square ' + color).data('pos', pos).appendTo($grid);
    }
  }

  $grid.append("<div class='white-pawn piece'>♟</div>");
  $(".white-pawn").append("<div class='timer'></div>");
  $('.white-pawn').hover(function() {
    $('.timer').addClass('timer-countdown');
  });
};

module.exports = Display;
