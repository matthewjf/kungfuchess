var Util = require('../util');
var Piece = require('./piece');

function Bishop(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(Bishop, Piece);

Bishop.prototype.getMoveDirs = function () {

};

module.exports = Bishop;
