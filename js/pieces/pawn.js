var Util = require('../util');
var Piece = require('./piece');
var Step = require('./step');

function Pawn(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
  this.isMoveable = true;

  var self = this;
  self.board.addPiece(self);

  this.moves = Step.moves.bind(this);
}

Util.inherits(Pawn, Piece);

Pawn.prototype.getMoveDirs = function () {
  var b = this.board;
  var dirs = [];
  var isWhite = this.color === "white";
  var startingRank = isWhite ? 6 : 1;
  var direction = isWhite ? -1 : 1;

  var nextPos = [this.pos[0] + direction, this.pos[1]];
  if (b.isEmpty(nextPos)) {
    dirs.push([direction, 0]);
    if(this.pos[0] === startingRank &&
      b.isEmpty([this.pos[0] + (2 * direction), this.pos[1]])) {
        dirs.push([direction * 2, 0]);
    }
  }

  var left = [this.pos[0] + direction, this.pos[1] - 1];
  var right = [this.pos[0] + direction, this.pos[1] + 1];

  if (b.inBounds(left)
      && b.hasPiece(left)
      && b.piece(left).color !== this.color)
    dirs.push([direction, -1]);

  if (b.inBounds(right)
      && b.hasPiece(right)
      && b.piece(right).color !== this.color)
    dirs.push([direction, 1]);

  return dirs;
};


module.exports = Pawn;
