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

	var Game = __webpack_require__(1);
	
	$(function () {
	  var $root = $('#game');
	  var game = new Game($root);
	  $root.append('<input type="button" value="test" />');
	  game.play();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Display = __webpack_require__(2);
	var Board = __webpack_require__(5);
	var Player = __webpack_require__(16);
	
	var Game = function($root) {
	  this.board = new Board();
	  this.board.populate();
	  this.display = new Display($root, this.board);
	  this.players = {white: new Player(this.board), black: ''};
	};
	
	Game.prototype.play = function () {
	  this.display.setup();
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Constants = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	var _selected; //// move to player
	
	var Display = function($root, board) {
	  this.$root = $root;
	  this.board = board;
	};
	
	Display.prototype.setup = function () {
	  this.setGrid();
	  this.renderAllPieces();
	};
	
	Display.prototype.setGrid = function () {
	  this.$root.append('<ul>');
	  $("ul").attr('id','grid');
	  var $grid = $('#grid');
	  $("<div>").addClass('pieces').appendTo($grid);
	
	  for (var row = 0; row < 8; row++) {
	    for (var col = 0; col < 8; col++) {
	      var pos = [row, col];
	      var posSum = row + col;
	      var color = (posSum % 2 === 0 ? 'white' : 'black');
	      $('<li>')
	        .addClass('square ' + color)
	        .attr('pos', pos)
	        .click(function(event) { //// move to player
	          this.removeSelected();
	
	          var newPos = [
	            parseInt($(event.target).attr('pos')[0]),
	            parseInt($(event.target).attr('pos')[2])
	          ];
	
	          if (_selected && _selected.isMoveable && Util.includesPos(newPos, _selected.moves())) {
	            this.board.move(_selected.pos, newPos, this.renderCB);
	          }
	        }.bind(this))
	        .appendTo($grid);
	    }
	  }
	};
	
	Display.prototype.renderAllPieces = function () {
	  $('#grid').find('.piece').remove();
	  this.board.pieces().forEach(function(piece) {
	    this.renderPiece(piece);
	  }.bind(this));
	
	};
	
	Display.prototype.renderPiece = function (piece) {
	  var top = 60 * piece.pos[0];
	  var left = 60 * piece.pos[1] + 40;
	  var content = Constants[piece.type()];
	
	  var $pieces = $('.pieces');
	  var newPiece = $('<div>')
	    .addClass(piece.color + '-piece piece')
	    .text(content)
	    .css({top: top + 'px', left: left + 'px'})
	    .attr('pos', piece.pos)
	    .click(function(event) { //// move to player
	      this.removeSelected();
	
	      var piecePos = [
	        parseInt($(event.target).attr('pos')[0]),
	        parseInt($(event.target).attr('pos')[2])
	      ];
	
	      if (!Util.posEquals(piecePos, piece.pos))
	        alert('something bad happened, game is broken');
	
	      if (piece.color === 'white' ) {
	        newPiece.addClass('selected');
	        _selected = piece;
	        _selected.moves().forEach(function(pos) {
	          $('li[pos="' + pos[0] + ',' + pos[1] + '"]').addClass('valid-move');
	        });
	      } else if (piece.color === 'black'
	          && Util.includesPos(piece.pos, _selected.moves())
	          && _selected.isMoveable) {
	        this.board.move(_selected.pos, piece.pos, this.renderCB);
	      }
	    }.bind(this))
	    .appendTo($pieces);
	};
	
	Display.prototype.renderCB = function (startPos, endPos, moveCompleted) {
	  removePiece(endPos);
	  if (moveCompleted) {
	    renderPieceMove(startPos, endPos, renderTimer);
	  } else {
	    renderPieceMove(startPos, endPos);
	  }
	};
	
	function renderPieceMove(startPos, endPos, completionCB) {
	  var $piece = $('div[pos="' + startPos[0] + ',' + startPos[1] + '"]');
	
	  var top = 60 * endPos[0];
	  var left = 60 * endPos[1] + 40;
	
	  $piece.css({top: top + 'px', left: left + 'px'});
	  $piece.attr('pos', endPos);
	
	  if (completionCB) {
	    setTimeout(function(){
	      completionCB(endPos);
	    },250);
	  }
	}
	
	function removePiece(pos) {
	  var $piece = $('div[pos="' + pos[0] + ',' + pos[1] + '"]');
	  $piece.remove();
	}
	
	function renderTimer (pos) {
	  var $piece = $('div[pos="' + pos[0] + ',' + pos[1] + '"]');
	  $('<div>').addClass('timer').appendTo($piece);
	
	  setTimeout(function(){
	    $piece.children().css({height: '0px', marginTop: '60px'});
	    setTimeout(function() {
	      $piece.children().remove();
	    }, Constants.Timer);
	  },250);
	}
	
	Display.prototype.removeSelected = function () {
	  $('.selected').removeClass('selected');
	  $('.valid-move').removeClass('valid-move');
	};
	
	module.exports = Display;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  Bishop: "♝",
	  King: "♚",
	  Knight: "♞",
	  Pawn: "♟",
	  Queen: "♛",
	  Rook: "♜",
	  Timer: 4000
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Util = {};
	
	Util.inherits = function (subclass, parentClass) {
	  var Surrogate = function () {};
	  Surrogate.prototype = parentClass.prototype;
	  subclass.prototype = new Surrogate();
	  subclass.prototype.constructor = subclass;
	};
	
	
	Util.posEquals = function (pos1, pos2) {
	  if (!pos1 || !pos2) {
	    return false;
	  }
	  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
	};
	
	Util.includesPos = function(pos, array) {
	  for (var i = 0; i < array.length; i++) {
	    if (this.posEquals(pos, array[i]))
	      return true;
	  }
	
	  return false;
	};
	
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Pieces = __webpack_require__(6);
	var Util = __webpack_require__(4);
	
	var Board = function () {
	  this.grid = [];
	  this.whitePieces = [];
	  this.blackPieces = [];
	
	  for (var i = 0; i < 8; i++) {
	    this.grid.push([null,null,null,null,null,null,null,null]);
	  }
	};
	
	Board.prototype.move = function (startPos, endPos, renderCB) {
	  if (this.isGameOver()) {
	    alert('game over');
	    return console.log('game is over, stop playing');
	  }
	
	  if (this.isEmpty(startPos)) {
	    alert('something went wrong');
	    return console.log('tried to move from empty board pos');
	  }
	
	  if (!Util.includesPos(endPos, this.piece(startPos).moves())) {
	    alert('something went wrong');
	    return console.log('tried to move to invalid pos');
	  }
	
	  var piece = this.piece(startPos);
	
	  if (!piece.isMoveable) {
	    alert("cant move yet");
	    return console.log('tried to move piece before timer, something boke');
	  }
	
	  piece.move(endPos, renderCB);
	};
	
	Board.prototype.piece = function (pos) {
	  return this.grid[pos[0]][pos[1]];
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
	
	Board.prototype.hasPiece = function (pos) {
	  return Boolean(this.inBounds(pos) && this.grid[pos[0]][pos[1]]);
	};
	
	Board.prototype.isEmpty = function (pos) {
	  return !this.hasPiece(pos);
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
	  return this.king(color).pos;
	};
	
	Board.prototype.king = function (color) {
	  var king;
	  this.pieces(color).forEach(function (piece) {
	    if (piece.type() === "King") {
	      king = piece;
	    }
	  });
	  return king;
	};
	
	Board.prototype.isGameOver = function () {
	  var result = (this.king('white') && this.king('black')) ? false : true;
	  return result;
	};
	
	Board.prototype.clearPiece = function (pos) {
	  if (this.hasPiece(pos)) {
	    var piece = this.piece(pos);
	    piece.setPos(null);
	  }
	
	  this.grid[pos[0]][pos[1]] = null;
	};
	
	Board.prototype.removePiece = function (pos) {
	  if (this.hasPiece(pos)) {
	    var piece = this.piece(pos);
	    var idx;
	    if (piece.color === "white") {
	      idx = this.whitePieces.indexOf(piece);
	      this.whitePieces.splice(idx,1);
	    } else {
	      idx = this.blackPieces.indexOf(piece);
	      this.blackPieces.splice(idx,1);
	    }
	    this.grid[piece.pos[0]][piece.pos[1]] = null;
	    piece.setPos(null);
	  }
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Pawn = __webpack_require__(7),
	    Bishop = __webpack_require__(10),
	    Knight = __webpack_require__(12),
	    Rook = __webpack_require__(13),
	    Queen = __webpack_require__(14),
	    King = __webpack_require__(15);
	
	module.exports = {
	  Pawn: Pawn,
	  Bishop: Bishop,
	  Knight: Knight,
	  Rook: Rook,
	  Queen: Queen,
	  King: King
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Step = __webpack_require__(9);
	
	function Pawn(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Step.moves.bind(this);
	}
	
	Util.inherits(Pawn, Piece);
	
	Pawn.prototype.getMoveDirs = function () {
	  var b = this.board;
	  var dirs = [];
	  var isWhite = this.color === "white";
	  var startingRank = isWhite ? 6 : 1;
	  var direction = isWhite ? -1 : 1;
	
	  var nextPos = [this.pos[0] + direction, this.pos[1]];
	  if (b.isEmpty(nextPos)) {
	    dirs.push([direction, 0]);
	    if(this.pos[0] === startingRank &&
	      b.isEmpty([this.pos[0] + (2 * direction), this.pos[1]])) {
	        dirs.push([direction * 2, 0]);
	    }
	  }
	
	  var left = [this.pos[0] + direction, this.pos[1] - 1];
	  var right = [this.pos[0] + direction, this.pos[1] + 1];
	
	  if (b.inBounds(left)
	      && b.hasPiece(left)
	      && b.piece(left).color !== this.color)
	    dirs.push([direction, -1]);
	
	  if (b.inBounds(right)
	      && b.hasPiece(right)
	      && b.piece(right).color !== this.color)
	    dirs.push([direction, 1]);
	
	  return dirs;
	};
	
	
	module.exports = Pawn;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Constants = __webpack_require__(3);
	
	var Piece = function(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.isMoveable = true;
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
	
	Piece.prototype.move = function (targetPos, renderCB) {
	  var b = this.board;
	  var dx = targetPos[0] - this.pos[0];
	  var dy = targetPos[1] - this.pos[1];
	  var xDir = dx !== 0 ? dx / Math.abs(dx) : 0;
	  var yDir = dy !== 0 ? dy / Math.abs(dy) : 0;
	  var newPos = [this.pos[0] + xDir, this.pos[1] + yDir];
	
	  if (Util.includesPos(newPos, this.moves())) {
	    var stopMoving = false;
	    if (Util.posEquals(newPos, targetPos) || (b.hasPiece(newPos) && b.piece(newPos).color !== this.color)) {
	      stopMoving = true;
	    }
	
	    renderCB(this.pos, newPos, stopMoving);
	
	    this.board.clearPiece(this.pos);
	    this.board.removePiece(newPos);
	
	    this.setPos(newPos);
	    this.board.placePiece(this);
	
	    this.moved = true;
	
	    if (this.board.isGameOver()) {
	      alert('game over');
	    }
	
	    if (stopMoving) {
	      this.isMoveable = false;
	      setTimeout(function() {
	        this.isMoveable = true;
	      }.bind(this), Constants.Timer + 500);
	      return;
	    } else {
	      setTimeout(function(){
	        this.move(targetPos, renderCB);
	      }.bind(this), 250);
	    }
	  }
	};
	
	Piece.STRAIGHTS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	Piece.DIAGONALS = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
	
	module.exports = Piece;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
	  moves: function () {
	    var moves = [];
	    var board = this.board;
	    var dirs = this.getMoveDirs();
	    for (var i = 0; i < dirs.length; i++) {
	      var move = [this.pos[0] + dirs[i][0], this.pos[1] + dirs[i][1]];
	      if (!board.inBounds(move)) {
	        continue;
	      } else if (board.hasPiece(move) && board.piece(move).color !== this.color) {
	        moves.push(move);
	      } else if (!board.hasPiece(move)) {
	        moves.push(move);
	      }
	    }
	    return moves;
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Slide = __webpack_require__(11);
	
	function Bishop(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Slide.moves.bind(this);
	}
	
	Util.inherits(Bishop, Piece);
	
	Bishop.prototype.getMoveDirs = function () {
	  return Piece.DIAGONALS;
	};
	
	module.exports = Bishop;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
	  moves: function () {
	    var moves = [];
	    var board = this.board;
	    var dirs = this.getMoveDirs();
	    for (var i = 0; i < dirs.length; i++) {
	      for (var d = 1; d < 8; d++) {
	        var pos = [this.pos[0] + (dirs[i][0] * d), this.pos[1] + (dirs[i][1] * d)];
	        if (!this.board.inBounds(pos)) {
	          break;
	        } else if (this.board.inBounds(pos) && !this.board.hasPiece(pos)) {
	          moves.push(pos);
	        } else if (this.board.hasPiece(pos) && this.board.piece(pos).color !== this.color) {
	          moves.push(pos);
	          break;
	        } else {
	          break;
	        }
	      }
	    }
	    return moves;
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Step = __webpack_require__(9);
	var Constants = __webpack_require__(3);
	
	function Knight(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Step.moves.bind(this);
	}
	
	Util.inherits(Knight, Piece);
	
	Knight.prototype.getMoveDirs= function () {
	  return [[2,1], [-2,1], [-2,-1], [2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];
	};
	
	Knight.prototype.move = function (targetPos, renderCB) {
	  if (Util.posEquals(targetPos, this.pos))
	    return;
	
	  var b = this.board;
	
	  renderCB(this.pos, targetPos, true);
	
	  this.board.clearPiece(this.pos);
	  this.board.removePiece(targetPos);
	  this.setPos(targetPos);
	  this.board.placePiece(this);
	
	  if (this.board.isGameOver()) {
	    alert('game over');
	  }
	
	  this.isMoveable = false;
	  setTimeout(function() {
	    this.isMoveable = true;
	  }.bind(this), Constants.Timer + 500);
	};
	
	module.exports = Knight;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Slide = __webpack_require__(11);
	
	function Rook(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.moved = false;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Slide.moves.bind(this);
	}
	
	Util.inherits(Rook, Piece);
	
	Rook.prototype.getMoveDirs = function () {
	  return Piece.STRAIGHTS;
	};
	
	module.exports = Rook;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Slide = __webpack_require__(11);
	
	function Queen(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Slide.moves.bind(this);
	}
	
	Util.inherits(Queen, Piece);
	
	Queen.prototype.getMoveDirs = function () {
	  return Piece.STRAIGHTS.concat(Piece.DIAGONALS);
	};
	
	module.exports = Queen;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Piece = __webpack_require__(8);
	var Step = __webpack_require__(9);
	var Constants = __webpack_require__(3);
	
	function King(attrs){
	  this.color = attrs.color;
	  this.board = attrs.board;
	  this.pos = attrs.pos;
	  this.moved = false;
	  this.isMoveable = true;
	
	  var self = this;
	  self.board.addPiece(self);
	
	  this.moves = Step.moves.bind(this);
	}
	
	Util.inherits(King, Piece);
	
	King.prototype.getMoveDirs = function () {
	  var dirs = Piece.STRAIGHTS.concat(Piece.DIAGONALS);
	
	  var isClearLeft = (this.board.isEmpty([this.pos[0], this.pos[1] - 1])
	    && this.board.isEmpty([this.pos[0], this.pos[1] - 2])
	    && this.board.isEmpty([this.pos[0], this.pos[1] - 3]));
	  var isClearRight = (this.board.isEmpty([this.pos[0], this.pos[1] + 1])
	    && this.board.isEmpty([this.pos[0], this.pos[1] + 2]));
	  var canCastleLeft = (isClearLeft
	    && !this.moved
	    && this.board.hasPiece([this.pos[0], 0])
	    && this.board.piece([this.pos[0], 0]).type() === 'Rook'
	    && !this.board.piece([this.pos[0], 0]).moved);
	  var canCastleRight = (isClearRight
	    && !this.moved
	    && this.board.hasPiece([this.pos[0], 7])
	    && this.board.piece([this.pos[0], 7]).type() === 'Rook'
	    && !this.board.piece([this.pos[0], 7]).moved);
	
	  if (canCastleLeft) {
	    dirs.push([0, -2]);
	  }
	  if (canCastleRight) {
	    dirs.push([0, 2]);
	  }
	
	  return dirs;
	};
	
	King.prototype.move = function (targetPos, renderCB) {
	  var dx = Math.abs(targetPos[0] - this.pos[0]);
	  var dy = Math.abs(targetPos[1] - this.pos[1]);
	  var left = targetPos[1] === 2 ? true : false;
	  var b = this.board;
	  var rook;
	  if (left) {
	    rook = this.board.piece([this.pos[0], 0]);
	  } else {
	    rook = this.board.piece([this.pos[0], 7]);
	  }
	
	  if (dy > 1) {
	    setTimeout(function() {
	      var newPos = left ? [rook.pos[0], 3] : [rook.pos[0], 5];
	      var oldPos = rook.pos;
	      renderCB(rook.pos, newPos, true);
	      b.clearPiece(rook.pos);
	      if (left)
	        rook.setPos([oldPos[0], 3]);
	      else
	        rook.setPos([oldPos[0], 5]);
	      b.placePiece(rook);
	
	      rook.isMoveable = false;
	      setTimeout(function() {
	        rook.isMoveable = true;
	      }, Constants.Timer + 500);
	    }, 500);
	  }
	  Piece.prototype.move.call(this, targetPos, renderCB);
	};
	
	module.exports = King;


/***/ },
/* 16 */
/***/ function(module, exports) {

	function Player(board) {
	  this.selected = undefined;
	  this.clickHandlers();
	  this.board = board;
	}
	
	Player.prototype.clickHandlers = function () {
	  $('#grid').click(function(event) {
	    // this.selected = undefined;
	    debugger;
	    console.log(event.target.attr('pos'));
	  });
	};
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map