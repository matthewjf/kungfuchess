function AI(board, display) {
  this.board = board;
  this.display = display;
}

AI.prototype.run = function () {
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

AI.prototype.kill = function () {
  if (this.intervalID)
    clearInterval(this.intervalID);
};

AI.prototype.randPiece = function () {
  var pieces = this.moveablePieces();
  var randPiece = pieces[Math.floor(Math.random()*pieces.length)];
  return randPiece;
};

AI.prototype.randMove = function (piece) {
  var moves = piece.moves();
  var randMove = moves[Math.floor(Math.random()*moves.length)];
  return randMove;
};

AI.prototype.takeableKing = function (piece) {
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

AI.prototype.takeableMove = function (piece) {
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

AI.prototype.moveablePieces = function () {
  var pieces = this.board.blackPieces.filter(function(piece) {
    return (piece.isMoveable && piece.moves().length > 0);
  });

  return pieces;
};

AI.prototype.findPiece = function () {
  var pieces = this.moveablePieces();
  for (var i = 0; i < pieces.length; i++) {
    var move = this.takeableMove(pieces[i]);
    if (move) {
      return pieces[i];
    }
  }

  return this.randPiece();
};

AI.prototype.protectKing = function () {
  var whitePieces = this.board.whitePieces;
  var kingPos = this.board.findKing('black').pos;
};

AI.prototype.threatensKing = function (piece) {
  var kingPos = this.board.findKing('black').pos;
  if (piece.moves().includes(kingPos))
    return piece.pos;
  else
    return false;
};

module.exports = AI;
