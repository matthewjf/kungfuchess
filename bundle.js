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
	  window.Game = game;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Pieces = __webpack_require__(4);
	
	window.Pieces = Pieces;
	
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
	  this.display = new Display($root, this.board);
	};
	
	Game.prototype.play = function () {
	  this.display.setGrid();
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Display = function($root, board) {
	  this.$root = $root;
	  this.board = board;
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
	
	  $grid.append("<div class='white-pawn piece'>♟</div>");
	  $(".white-pawn").append("<div class='timer'></div>");
	  $('.white-pawn').hover(function() {
	    $('.timer').addClass('timer-countdown');
	  });
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
	
	var Pawn = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.players = {white: '', black: ''};
	};
	
	Pawn.prototype.getMoveDirs = function () {
	
	};
	
	Util.inherits(Pawn, Piece);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	var Bishop = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	Bishop.prototype.getMoveDirs = function () {
	
	};
	
	module.exports = Bishop;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	var Knight = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	Knight.prototype.getMoveDirs= function () {
	
	};
	
	Util.inherits(Knight, Piece);
	
	module.exports = Knight;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	var Rook = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	Rook.prototype.getMoveDirs = function () {
	
	};
	
	Util.inherits(Rook, Piece);
	
	module.exports = Rook;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	var Queen = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	Queen.prototype.getMoveDirs = function () {
	
	};
	
	Util.inherits(Queen, Piece);
	
	module.exports = Queen;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Piece = __webpack_require__(7);
	
	var King = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	};
	
	King.prototype.getMoveDirs = function () {
	
	};
	
	Util.inherits(King, Piece);
	
	module.exports = King;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map