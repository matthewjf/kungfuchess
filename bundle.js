/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	
	$(function () {
	  var $root = $('#game');
	  var game = new Game($root);
	  game.play();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Pieces = __webpack_require__(4);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Display = __webpack_require__(3);
	var Board = __webpack_require__(1);
	
	var Game = function($root) {
	  this.board = new Board();
	  this.board.populate();
	  this.display = new Display($root, this.board);
	  this.players = {white: '', black: ''};
	};
	
	Game.prototype.play = function () {
	  this.display.setup();
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Constants = __webpack_require__(13);
	
	var Display = function($root, board) {
	  this.$root = $root;
	  this.board = board;
	};
	
	Display.prototype.setup = function () {
	  this.setGrid();
	  this.setPieces();
	};
	
	Display.prototype.setGrid = function () {
	  this.$root.append('<ul>');
	  $("ul").attr('id','grid');
	  var $grid = $('#grid');
	
	  for (var row = 0; row < 8; row++) {
	    for (var col = 0; col < 8; col++) {
	      var pos = [row, col];
	      var posSum = row + col;
	      var color = (posSum % 2 === 0 ? 'white' : 'black');
	      $('<li>').addClass('square ' + color).data('pos', pos).appendTo($grid);
	    }
	  }
	};
	
	Display.prototype.setPieces = function () {
	  console.log(this.board.pieces());
	  this.renderPiece(this.board.pieces()[0]);
	};
	
	Display.prototype.renderPiece = function (piece) {
	  var top = -480 + 60 * piece.pos[0];
	  var left = 60 * piece.pos[1];
	  var content = Constants[piece.type()];
	
	  var $grid = $('#grid');
	  $('<div>').addClass(piece.color).text(content).css({left: left, top: top}).appendTo($grid);
	};
	
	module.exports = Display;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Pawn = __webpack_require__(5),
	    Bishop = __webpack_require__(8),
	    Knight = __webpack_require__(9),
	    Rook = __webpack_require__(10),
	    Queen = __webpack_require__(11),
	    King = __webpack_require__(12);
	
	module.exports = {
	  Pawn: Pawn,
	  Bishop: Bishop,
	  Knight: Knight,
	  Rook: Rook,
	  Queen: Queen,
	  King: King
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function Pawn(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(Pawn, Piece);
	
	Pawn.prototype.getMoveDirs = function () {
	
	};
	
	
	module.exports = Pawn;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Util = {};
	
	Util.inherits = function (subclass, parentClass) {
	  var Surrogate = function () {};
	  Surrogate.prototype = parentClass.prototype;
	  subclass.prototype = new Surrogate();
	  subclass.prototype.constructor = subclass;
	};
	
	
	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Piece = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	Piece.prototype.addToBoard = function () {
	
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
	  return this.constructor.name;
	};
	
	Piece.prototype.validMove = function (pos) {
	
	};
	
	Piece.prototype.moves = function () {
	
	};
	
	module.exports = Piece;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function Bishop(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(Bishop, Piece);
	
	Bishop.prototype.getMoveDirs = function () {
	
	};
	
	module.exports = Bishop;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function Knight(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(Knight, Piece);
	
	Knight.prototype.getMoveDirs= function () {
	
	};
	
	module.exports = Knight;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function Rook(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(Rook, Piece);
	
	Rook.prototype.getMoveDirs = function () {
	
	};
	
	module.exports = Rook;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function Queen(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(Queen, Piece);
	
	Queen.prototype.getMoveDirs = function () {
	
	};
	
	module.exports = Queen;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	function King(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	
	  var self = this;
	  self.board.addPiece(self);
	}
	
	Util.inherits(King, Piece);
	
	King.prototype.getMoveDirs = function () {
	
	};
	
	module.exports = King;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
	  Bishop: "♝",
	  King: "♚",
	  Knight: "♞",
	  Pawn: "♟",
	  Queen: "♛",
	  Rook: "♜"
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map