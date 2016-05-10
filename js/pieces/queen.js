var Util = require('../util');
var Piece = require('./piece');

var Queen = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
};

Queen.prototype.getMoveDirs = function () {

};

Util.inherits(Queen, Piece);

module.exports = Queen;
