var Util = require('../util');
var Constants = require('../constants');

var Piece = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.isMoveable = true;
};

Piece.prototype.setPos = function (pos) {
  this.pos = pos;
};

Piece.prototype.pos = function () {
  return this.pos;
};

Piece.prototype.color = function () {
  return this.color;
};

Piece.prototype.type = function () {
  return this.constructor.name;
};

Piece.prototype.move = function (targetPos, renderCB) {
  var b = this.board;
  var dx = targetPos[0] - this.pos[0];
  var dy = targetPos[1] - this.pos[1];
  var xDir = dx !== 0 ? dx / Math.abs(dx) : 0;
  var yDir = dy !== 0 ? dy / Math.abs(dy) : 0;
  var newPos = [this.pos[0] + xDir, this.pos[1] + yDir];

  if (Util.includesPos(newPos, this.moves())) {
    var stopMoving = false;
    if (Util.posEquals(newPos, targetPos) || (b.hasPiece(newPos) && b.piece(newPos).color !== this.color)) {
      stopMoving = true;
    }

    renderCB(this.pos, newPos, stopMoving);

    this.board.clearPiece(this.pos);
    this.board.removePiece(newPos);

    this.setPos(newPos);
    this.board.placePiece(this);

    this.moved = true;

    if (this.board.isGameOver()) {
      alert('game over');
    }

    if (stopMoving) {
      this.isMoveable = false;
      setTimeout(function() {
        this.isMoveable = true;
      }.bind(this), Constants.Timer + 500);
      return;
    } else {
      setTimeout(function(){
        this.move(targetPos, renderCB);
      }.bind(this), 250);
    }
  }
};

Piece.STRAIGHTS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
Piece.DIAGONALS = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

module.exports = Piece;
