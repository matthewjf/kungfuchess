var Util = require('./util');
var Constants = require('./constants');

function AI(board, display) {
  this.board = board;
  this.display = display;
  if (this.board.speed === Constants.Slow)
    this.speed = 1500;
  else if (this.board.speed === Constants.Normal)
    this.speed = 1000;
  else
    this.speed = 750;
}

AI.prototype.setSpeed = function (speed) {
  this.speed = speed;
};

AI.prototype.run = function () {
  // regular piece moves
  this.moveInterval = setInterval(function() {
    if (this.board.isGameOver())
      this.kill();
    var pieceMove = this.findPieceMove();
    if (pieceMove) {
      var piece = pieceMove[0];
      var move = pieceMove[1];
    }

    if (piece) {
      this.board.move(piece.pos, move, this.display.renderCB);
    }
  }.bind(this), (this.speed));

  // protect king
  this.kingInterval = setInterval(function(){
    if (this.board.isGameOver())
      this.kill();
    this.protectKing();
  }.bind(this), (this.speed / 2));
};

AI.prototype.kill = function () {
  if (this.moveInterval)
    clearInterval(this.moveInterval);
  if (this.kingInterval)
    clearInterval(this.kingInterval);
};

// random move fallback
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

// take pieces
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
  if (typeof piece === 'undefined' )
    return;
  var bestNet = -5;
  var move;
  for (var i = 0; i < piece.moves().length; i++) {
    var currMove = piece.moves()[i];

    if (this.board.hasPiece(currMove) && this.board.piece(currMove).color === 'white') {
      var targetVal = Constants.Values[this.board.piece(currMove).type()];
      var thisVal = Constants.Values[piece.type()];
      var currNet = targetVal - thisVal;
      if (currNet > bestNet) {
        bestNet = currNet;
        move = currMove;
      }
    }
  }

  if (move)
    return [move, bestNet];
  else
    return;
};

AI.prototype.moveablePieces = function () {
  var pieces = this.board.blackPieces.filter(function(piece) {
    return (piece.isMoveable && piece.moves().length > 0);
  });

  return pieces;
};

AI.prototype.findPieceMove = function () {
  var pieces = this.moveablePieces();

  var bestNet = -5;
  var move;
  var piece;

  for (var i = 0; i < pieces.length; i++) {
    var curr = this.takeableMove(pieces[i]);
    if (curr && curr[1] > bestNet) {
      piece = pieces[i];
      move = curr[0];
      bestNet = curr[1];
    }
  }

  if (!piece) {
    piece = this.randPiece();
    move = this.randMove(piece);
  }

  return [piece, move];
};

// king stuff
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

// perform move
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

// helpers
AI.prototype.whiteMoves = function () {
  var whitePieces = this.board.whitePieces;
  var moves = [];
  whitePieces.forEach(function(piece){
    moves = moves.concat(piece.moves());
  });

  return moves;
};

module.exports = AI;
