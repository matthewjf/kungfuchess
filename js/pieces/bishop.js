var Util = require('../util');
var Piece = require('./piece');
var Slide = require('./slide');

function Bishop(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.isMoveable = true;

  var self = this;
  self.board.addPiece(self);

  this.moves = Slide.moves.bind(this);
}

Util.inherits(Bishop, Piece);

Bishop.prototype.getMoveDirs = function () {
  return Piece.DIAGONALS;
};

module.exports = Bishop;
