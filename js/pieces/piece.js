var Piece = function(attrs){
  this.color = attrs.color;
  this.board = attrs.board;
  this.pos = attrs.pos;
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
  return this.toString();
};

Piece.prototype.validMove = function (pos) {

};

Piece.prototype.moves = function () {

};

module.exports = Piece;
