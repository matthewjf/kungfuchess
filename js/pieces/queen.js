var Util = require('../util');
var Piece = require('./piece');

function Queen(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(Queen, Piece);

Queen.prototype.getMoveDirs = function () {

};

module.exports = Queen;
