function RandomAI(board, display) {
  this.board = board;
  this.display = display;
}

RandomAI.prototype.run = function () {
  this.intervalID = setInterval(function() {
    if (this.board.isGameOver())
      clearInterval(this.intervalID);
    var piece = this.randPiece();
    var move = this.randMove(piece);
    this.board.move(piece.pos, move, this.display.renderCB);
  }.bind(this), 500);
};

RandomAI.prototype.kill = function () {
  if (this.intervalID)
    clearInterval(this.intervalID);
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
