var Pieces = require('./pieces/pieces.js');

var Board = function () {
  this.grid = [];
  this.whitePieces = [];
  this.blackPieces = [];

  for (var i = 0; i < 8; i++) {
    this.grid.push([null,null,null,null,null,null,null,null]);
  }
};

Board.prototype.placePiece = function (piece) {
  var pos = piece.pos;
  this.grid[pos[0]][pos[1]] = piece;
};

Board.prototype.addPiece = function (piece) {
  if (piece.color === "white") {
    this.whitePieces.push(piece);
  } else {
    this.blackPieces.push(piece);
  }
  this.placePiece(piece);
};

Board.prototype.inBounds = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < 8 &&
    pos[1] >= 0 && pos[1] < 8
  );
};

Board.prototype.isEmpty = function (pos) {
  return Boolean(this.inBounds(pos) && this.grid[pos[0]][pos[1]]);
};

Board.prototype.hasPiece = function (pos) {
  return !this.isEmpty();
};

Board.prototype.pieces = function (color) {
  if (typeof color === 'undefined') {
    return this.whitePieces.concat(this.blackPieces);
  } else if (color === "white") {
    return this.whitePieces;
  } else if (color === "black") {
    return this.blackPieces;
  }
};

Board.prototype.findKing = function (color) {
  var pos;
  this.pieces(color).forEach(function (piece) {
    if (piece.toString() === "king") {
      pos = piece.pos;
    }
  });
  return pos;
};

Board.prototype.removePiece = function (piece) {
  var idx;
  if (piece.color === "white") {
    idx = this.whitePieces.indexOf(piece);
    this.whitePieces.splice(idx,1);
  } else {
    idx = this.blackPieces.indexOf(piece);
    this.blackPieces.splice(idx,1);
  }
  this.grid[piece.pos[0]][piece.pos[1]] = null;
};

Board.prototype.populate = function () {
  new Pieces.Pawn({color: "black", board: this, pos: [1,0]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,1]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,2]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,3]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,4]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,5]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,6]});
  new Pieces.Pawn({color: "black", board: this, pos: [1,7]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,0]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,1]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,2]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,3]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,4]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,5]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,6]});
  new Pieces.Pawn({color: "white", board: this, pos: [6,7]});
  new Pieces.Bishop({color: "white", board: this, pos: [7,2]});
  new Pieces.Bishop({color: "white", board: this, pos: [7,5]});
  new Pieces.Bishop({color: "black", board: this, pos: [0,2]});
  new Pieces.Bishop({color: "black", board: this, pos: [0,5]});
  new Pieces.Knight({color: "white", board: this, pos: [7,1]});
  new Pieces.Knight({color: "white", board: this, pos: [7,6]});
  new Pieces.Knight({color: "black", board: this, pos: [0,1]});
  new Pieces.Knight({color: "black", board: this, pos: [0,6]});
  new Pieces.Rook({color: "white", board: this, pos: [7,0]});
  new Pieces.Rook({color: "white", board: this, pos: [7,7]});
  new Pieces.Rook({color: "black", board: this, pos: [0,7]});
  new Pieces.Rook({color: "black", board: this, pos: [0,0]});
  new Pieces.Queen({color: "white", board: this, pos: [7,3]});
  new Pieces.Queen({color: "black", board: this, pos: [0,3]});
  new Pieces.King({color: "black", board: this, pos: [0,4]});
  new Pieces.King({color: "white", board: this, pos: [7,4]});
};


module.exports = Board;
