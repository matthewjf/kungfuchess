var Util = require('../util');
var Piece = require('./piece');

function Pawn(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(Pawn, Piece);

Pawn.prototype.getMoveDirs = function () {

};


module.exports = Pawn;
