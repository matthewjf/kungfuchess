var Util = require('../util');
var Piece = require('./piece');
var Step = require('./step');

function King(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.moved = false;
  this.isMoveable = true;

  var self = this;
  self.board.addPiece(self);

  this.moves = Step.moves.bind(this);
}

Util.inherits(King, Piece);

King.prototype.getMoveDirs = function () {
  var dirs = Piece.STRAIGHTS.concat(Piece.DIAGONALS);

  var isClearLeft = (this.board.isEmpty([this.pos[0], this.pos[1] - 1])
    && this.board.isEmpty([this.pos[0], this.pos[1] - 2])
    && this.board.isEmpty([this.pos[0], this.pos[1] - 3]));
  var isClearRight = (this.board.isEmpty([this.pos[0], this.pos[1] + 1])
    && this.board.isEmpty([this.pos[0], this.pos[1] + 2]));
  var canCastleLeft = (isClearLeft
    && !this.moved
    && this.board.hasPiece([this.pos[0], 0])
    && this.board.piece([this.pos[0], 0]).type() === 'Rook'
    && !this.board.piece([this.pos[0], 0]).moved);
  var canCastleRight = (isClearRight
    && !this.moved
    && this.board.hasPiece([this.pos[0], 7])
    && this.board.piece([this.pos[0], 7]).type() === 'Rook'
    && !this.board.piece([this.pos[0], 7]).moved);

  if (canCastleLeft) {
    dirs.push([0, -2]);
  }
  if (canCastleRight) {
    dirs.push([0, 2]);
  }

  return dirs;
};

King.prototype.move = function (targetPos, renderCB) {
  var dx = Math.abs(targetPos[0] - this.pos[0]);
  var dy = Math.abs(targetPos[1] - this.pos[1]);
  var left = targetPos[1] === 2 ? true : false;
  var b = this.board;
  var rook;
  if (left) {
    rook = this.board.piece([this.pos[0], 0]);
  } else {
    rook = this.board.piece([this.pos[0], 7]);
  }

  if (dy > 1) {
    setTimeout(function() {
      var newPos = left ? [rook.pos[0], 3] : [rook.pos[0], 5];
      var oldPos = rook.pos;
      renderCB(rook.pos, newPos, true);
      b.clearPiece(rook.pos);
      if (left)
        rook.setPos([oldPos[0], 3]);
      else
        rook.setPos([oldPos[0], 5]);
      b.placePiece(rook);

      rook.isMoveable = false;
      setTimeout(function() {
        rook.isMoveable = true;
      }, 3500);
    }, 500);
  }
  Piece.prototype.move.call(this, targetPos, renderCB);
};

module.exports = King;
