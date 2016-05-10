var Util = require('../util');
var Piece = require('./piece');

function Rook(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(Rook, Piece);

Rook.prototype.getMoveDirs = function () {

};

module.exports = Rook;
