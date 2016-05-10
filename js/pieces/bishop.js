var Util = require('../util');
var Piece = require('./piece');

var Bishop = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
};

Bishop.prototype.getMoveDirs = function () {

};

module.exports = Bishop;
