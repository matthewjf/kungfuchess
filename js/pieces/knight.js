var Util = require('../util');
var Piece = require('./piece');

var Knight = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
};

Knight.prototype.getMoveDirs= function () {

};

Util.inherits(Knight, Piece);

module.exports = Knight;
