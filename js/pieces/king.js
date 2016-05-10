var Util = require('../util');
var Piece = require('./piece');

function King(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(King, Piece);

King.prototype.getMoveDirs = function () {

};

module.exports = King;
