var Util = require('../util');
var Piece = require('./piece');

var Rook = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
};

Rook.prototype.getMoveDirs = function () {

};

Util.inherits(Rook, Piece);

module.exports = Rook;
