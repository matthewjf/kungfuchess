var Util = require('../util');
var Piece = require('./piece');
var Slide = require('./slide');

function Queen(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.onCooldown = false;

  var self = this;
  self.board.addPiece(self);

  this.moves = Slide.moves.bind(this);
}

Util.inherits(Queen, Piece);

Queen.prototype.getMoveDirs = function () {
  return Piece.STRAIGHTS.concat(Piece.DIAGONALS);
};

module.exports = Queen;
