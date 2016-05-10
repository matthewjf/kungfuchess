var Util = require('../util');
var Piece = require('./piece');

var Pawn = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.players = {white: '', black: ''};
};

Pawn.prototype.getMoveDirs = function () {

};

Util.inherits(Pawn, Piece);

module.exports = Pawn;
