var Util = require('../util');
var Piece = require('./piece');

var King = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
};

King.prototype.getMoveDirs = function () {

};

Util.inherits(King, Piece);

module.exports = King;
