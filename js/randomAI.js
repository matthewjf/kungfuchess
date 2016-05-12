function RandomAI(board, display) {
  this.board = board;
  this.display = display;
}

RandomAI.prototype.run = function () {
  setInterval(function() {
    var piece = this.randPiece();
    var move = this.randMove(piece);
    this.board.move(piece.pos, move, this.display.renderCB);
  }.bind(this), 250);
};

RandomAI.prototype.randPiece = function () {
  var pieces = this.board.blackPieces.filter(function(piece) {
    return piece.isMoveable;
  });
  var randPiece = pieces[Math.floor(Math.random()*pieces.length)];
  return randPiece;
};

RandomAI.prototype.randMove = function (piece) {
  var moves = piece.moves();
  var randMove = moves[Math.floor(Math.random()*moves.length)];
  return randMove;
};

module.exports = RandomAI;
