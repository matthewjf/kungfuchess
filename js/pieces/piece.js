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
    this.isMoveable = false;
    var stopMoving = false;
    if (Util.posEquals(newPos, targetPos) || (b.hasPiece(newPos) && b.piece(newPos).color !== this.color)) {
      stopMoving = true;
    }
    if (stopMoving)
      renderCB(this.pos, newPos, stopMoving, this.board.speed);
    else
      renderCB(this.pos, newPos, stopMoving);

    this.board.removePiece(newPos);
    this.board.clearPos(this.pos);

    this.setPos(newPos);
    this.board.placePiece(this);

    this.moved = true;

    if (this.board.isGameOver()) {
      console.log('move attempted, game has ended');
    }

    if (stopMoving) {
      this.checkGameOver();
      if (this.type() === 'Pawn' && (this.pos[0] === 7 || this.pos[0] === 0)) {
        this.board.promotePawn(this, renderCB);
      } else {
        this.setTimer();
      }
      return;
    } else {
      setTimeout(function(){
        this.move(targetPos, renderCB);
      }.bind(this), Constants.MoveTime);
    }
  }
};

Piece.prototype.setTimer = function () {
  setTimeout(function() {
    this.isMoveable = true;
  }.bind(this), this.board.speed + Constants.MoveTime + 25);
};

Piece.prototype.checkGameOver = function () {
  if (this.board.isGameOver()) {
    if ($('#gameover').length === 0)
      $('<div>')
        .attr('id', 'gameover')
        .text('GAME OVER')
        .prependTo($('#grid'));
    if ($('#overlay').length === 0)
      $('<div>').attr('id', 'overlay').prependTo($('#game'));
    $('.piece').removeClass('selected');
    $('.square').removeClass('valid-move');
  }
};

Piece.STRAIGHTS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
Piece.DIAGONALS = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

module.exports = Piece;
