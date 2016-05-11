var Util = require('../util');
var Piece = require('./piece');
var Slide = require('./slide');

function Rook(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.moved = false;
  this.onCooldown = false;

  var self = this;
  self.board.addPiece(self);

  this.moves = Slide.moves.bind(this);
}

Util.inherits(Rook, Piece);

Rook.prototype.getMoveDirs = function () {
  return Piece.STRAIGHTS;
};

module.exports = Rook;
