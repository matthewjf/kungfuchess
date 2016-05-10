var Constants = require('./constants');

var Display = function($root, board) {
  this.$root = $root;
  this.board = board;
};

Display.prototype.setup = function () {
  this.setGrid();
  this.setPieces();
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
};

Display.prototype.setPieces = function () {
  console.log(this.board.pieces());
  this.renderPiece(this.board.pieces()[0]);
};

Display.prototype.renderPiece = function (piece) {
  var top = -480 + 60 * piece.pos[0];
  var left = 60 * piece.pos[1];
  var content = Constants[piece.type()];

  var $grid = $('#grid');
  $('<div>').addClass(piece.color).text(content).css({left: left, top: top}).appendTo($grid);
};

module.exports = Display;
