var Util = require('./util');

function AI(board, display) {
  this.board = board;
  this.display = display;
}

AI.prototype.run = function () {
  this.moveInterval = setInterval(function() {
    if (this.board.isGameOver())
      this.kill();
    var piece = this.findPiece();
    if (piece) {
      var take = this.takeableMove(piece);
      var move = take ? take : this.randMove(piece);
      this.board.move(piece.pos, move, this.display.renderCB);
    }
  }.bind(this), 1250);
  this.kingInterval = setInterval(function(){
    if (this.board.isGameOver())
      this.kill();
    this.protectKing();
  }.bind(this), 500);
};

AI.prototype.kill = function () {
  if (this.moveInterval)
    clearInterval(this.moveInterval);
  if (this.kingInterval)
    clearInterval(this.kingInterval);
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
  var kingThreat = this.findKingThreat();
  if (kingThreat) {
    var taken = this.takePiece(kingThreat);
    if (taken) {
      return;
    } else if (this.board.king('black').isMoveable) {
      this.moveKingSafety();
    }
  }
};

AI.prototype.findKingThreat = function () {
  var whitePieces = this.board.whitePieces;
  for (var i = 0; i < whitePieces.length; i++) {
    if (this.threatensKing(whitePieces[i]))
      return whitePieces[i];
  }
};

AI.prototype.threatensKing = function (piece) {
  var kingPos = this.board.findKing('black');
  if (Util.includesPos(kingPos, piece.moves()))
    return piece;
};

AI.prototype.takePiece = function (whitePiece) {
  var blackPieces = this.moveablePieces();
  for (var i = 0; i < blackPieces.length; i++) {
    var blackPiece = blackPieces[i];
    if (Util.includesPos(whitePiece.pos, blackPieces[i].moves())) {
      this.board.move(blackPiece.pos, whitePiece.pos, this.display.renderCB);
      return blackPiece;
    }
  }
};

AI.prototype.whiteMoves = function () {
  var whitePieces = this.board.whitePieces;
  var moves = [];
  whitePieces.forEach(function(piece){
    moves = moves.concat(piece.moves());
  });

  return moves;
};

AI.prototype.safeKingPos = function() {
  var unsafePos = this.whiteMoves();
  var kingMoves = this.board.king('black').moves();
  for (var i = 0; i < kingMoves.length; i++) {
    if (!Util.includesPos(kingMoves[i], unsafePos)) {
      return kingMoves[i];
    }
  }
};

AI.prototype.moveKingSafety = function () {
  var kingPos = this.board.findKing('black');
  var safePos = this.safeKingPos();
  if (safePos)
    this.board.move(kingPos, safePos, this.display.renderCB);
};

module.exports = AI;
