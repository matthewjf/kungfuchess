var Util = require('../util');
var Piece = require('./piece');
var Step = require('./step');

function Knight(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.isMoveable = true;

  var self = this;
  self.board.addPiece(self);

  this.moves = Step.moves.bind(this);
}

Util.inherits(Knight, Piece);

Knight.prototype.getMoveDirs= function () {
  return [[2,1], [-2,1], [-2,-1], [2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];
};

Knight.prototype.move = function (targetPos, renderCB) {
  if (Util.posEquals(targetPos, this.pos))
    return;

  var b = this.board;

  renderCB(this.pos, targetPos, true);

  this.board.clearPiece(this.pos);
  this.board.removePiece(targetPos);
  this.setPos(targetPos);
  this.board.placePiece(this);

  if (this.board.isGameOver()) {
    alert('game over');
  }

  this.isMoveable = false;
  setTimeout(function() {
    this.isMoveable = true;
  }.bind(this), 3500);
};

module.exports = Knight;
