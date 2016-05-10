var Util = require('../util');
var Piece = require('./piece');

function Knight(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;

  var self = this;
  self.board.addPiece(self);
}

Util.inherits(Knight, Piece);

Knight.prototype.getMoveDirs= function () {

};

module.exports = Knight;
