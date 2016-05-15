function GreedyAI(board, display) {
  this.board = board;
  this.display = display;
}

GreedyAI.prototype.run = function () {
  this.intervalID = setInterval(function() {
    if (this.board.isGameOver())
      clearInterval(this.intervalID);
    var piece = this.findPiece();
    if (piece) {
      var take = this.takeableMove(piece);
      var move = take ? take : this.randMove(piece);
      this.board.move(piece.pos, move, this.display.renderCB);
    }
  }.bind(this), 1000);
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

GreedyAI.prototype.takeableKing = function (piece) {
  var move;
  for (var i = 0; i < piece.moves().length; i++) {
    move = piece.moves()[i];
    if (this.board.hasPiece(move)
        && this.board.piece(move).color === 'white'
        && this.board.piece(move).type === 'King') {
      return move;
    }
  }
};

GreedyAI.prototype.takeableMove = function (piece) {
  if (typeof piece === 'undefined')
    return;

  var move;
  for (var i = 0; i < piece.moves().length; i++) {
    move = piece.moves()[i];
    if (this.board.hasPiece(move) && this.board.piece(move).color === 'white') {
      return move;
    }
  }
};

GreedyAI.prototype.moveablePieces = function () {
  var pieces = this.board.blackPieces.filter(function(piece) {
    return (piece.isMoveable && piece.moves().length > 0);
  });

  return pieces;
};

GreedyAI.prototype.findPiece = function () {
  var pieces = this.moveablePieces();
  for (var i = 0; i < pieces.length; i++) {
    var move = this.takeableMove(pieces[i]);
    if (move) {
      return pieces[i];
    }
  }

  return this.randPiece();
};

module.exports = GreedyAI;
