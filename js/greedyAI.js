function GreedyAI(board, display) {
  this.board = board;
  this.display = display;
}

GreedyAI.prototype.run = function () {
  this.intervalID = setInterval(function() {
    if (this.board.isGameOver())
      clearInterval(this.intervalID);
    var piece = this.randPiece();
    var move = this.randMove(piece);
    this.board.move(piece.pos, move, this.display.renderCB);
  }.bind(this), 500);
};

GreedyAI.prototype.kill = function () {
  if (this.intervalID)
    clearInterval(this.intervalID);
};

GreedyAI.prototype.randPiece = function () {
  var pieces = this.moveablePieces();
  var randPiece = pieces[Math.floor(Math.random()*pieces.length)];
  return randPiece;
};

GreedyAI.prototype.randMove = function (piece) {
  var moves = piece.moves();
  var randMove = moves[Math.floor(Math.random()*moves.length)];
  return randMove;
};

GreedyAI.prototype.takeableMove = function (piece) {
  var move;
  for (var i = 0; i < piece.moves().length; i++) {
    move = piece.moves()[i];
    if (this.board.hasPiece(move) && this.board.piece(move).color === 'white') {
      return piece;
    }
  }
};

GreedyAI.prototype.moveablePieces = function () {
  var pieces = this.board.blackPieces.filter(function(piece) {
    return piece.isMoveable;
  });

  return pieces;
};

GreedyAI.prototype.findPiece = function () {
  var move;
  var pieces = this.moveablePieces();
  for (var i = 0; i < pieces.length; i++) {
    move = this.takeableMove(pieces[i]);
    if (move) {
      return move;
    }
  }

  return this.randMove();
};

module.exports = GreedyAI;
