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
	var Info = __webpack_require__(20);
	
	$(function () {
	  $('body').addClass('no-select');
	  var $root = $('#game');
	
	  // SPEED SETTINGS
	  var $settings = $('#game-settings');
	  $settings.text('Speed   ');
	  $('<div id="slow" class="setting button">').text('slow').appendTo($settings);
	  $('<div id="normal" class="setting button">').text('normal').appendTo($settings);
	  $('<div id="fast" class="setting button">').text('fast').appendTo($settings);
	  $('.setting').click(function(event) {
	    $('.indicator').removeClass('active');
	    $(event.currentTarget).children('.indicator').addClass('active');
	  });
	  $('.setting').prepend($('<div class="indicator"/>'));
	  $('#normal').children('.indicator').addClass('active');
	
	
	  var $controls = $('#game-controls');
	
	  // START
	  $('<input id="start" type="button" value="start" />').click(function(event){
	    game = new Game($root);
	
	    var $overlay = $('#overlay');
	    var $countdown = $('.countdown').text('3');
	
	    $('#start').prop('disabled', true);
	    $('.setting').addClass('disabled').off();
	
	    setTimeout(function(){
	      $countdown.text('2');
	      setTimeout(function() {
	        $countdown.text('1');
	        setTimeout(function() {
	          $overlay.empty();
	          $overlay.remove();
	          game.play();
	          $('#reset').prop('disabled', false);
	        }, 1000);
	      }, 1000);
	    }, 1000);
	  }).appendTo($controls);
	
	  // RESET
	  $('<input id="reset" type="button" value="reset" disabled/>').click(function(){
	    $('.overlay').empty();
	    $('.overlay').remove();
	    game.destroy();
	    game = new Game($root);
	    var $overlay = $('<div>').attr('id', 'overlay').appendTo('#game');
	    var $countdown = $('<div>')
	      .addClass('countdown')
	      .appendTo($overlay);
	    $('#start').prop('disabled', false);
	    $('#reset').prop('disabled', true);
	    $('.setting').removeClass('disabled').click(function(event) {
	      $('.indicator').removeClass('active');
	      $(event.currentTarget).children('.indicator').addClass('active');
	    });
	  }).appendTo($controls);
	
	  // INFO
	  $('<input id="info" type="button" value="info" />').click(function(){
	    Info.openModal();
	  }).appendTo($controls);
	
	  var game = new Game($root);
	  $('<div>').attr('id', 'overlay').prependTo($('#game'));
	  $('<div>').addClass('countdown').appendTo($('#overlay'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Display = __webpack_require__(2);
	var Board = __webpack_require__(5);
	var Player = __webpack_require__(16);
	var randomAI = __webpack_require__(17);
	var greedyAI = __webpack_require__(18);
	var AI = __webpack_require__(19);
	
	var Game = function($root) {
	  this.root = $root;
	  this.init(this.root);
	};
	
	Game.prototype.init = function ($root) {
	  this.board = new Board();
	  this.display = new Display($root, this.board);
	  this.running = false;
	
	  this.players = {
	    white: new Player(this.board),
	    black: new AI(this.board, this.display)
	  };
	
	  this.renderBoard();
	  this.board.populate();
	  this.display.setup();
	};
	
	Game.prototype.play = function () {
	  this.players.black.run();
	  this.running = true;
	};
	
	Game.prototype.renderBoard = function () {
	  this.display.setGrid();
	};
	
	Game.prototype.destroy = function () {
	  this.running = false;
	  this.players.black.kill();
	  this.board.destroy();
	  this.display.destroy();
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
	  $('#grid').empty();
	  $('#grid').remove();
	  this.$root.append('<ul>');
	  $("ul").attr('id','grid').addClass('section');
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
	          removeSelected();
	
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
	
	Display.prototype.renderPiece = function(piece) {
	  var top = 60 * piece.pos[0];
	  var left = 60 * piece.pos[1];
	  var content = Constants[piece.type()];
	
	  var $pieces = $('.pieces');
	  var newPiece = $('<div>')
	    .addClass(piece.color + '-piece piece')
	    .text(content)
	    .css({top: top + 'px', left: left + 'px'})
	    .attr('pos', piece.pos)
	    .click(function(event) { //// move to player
	      removeSelected();
	
	      var piecePos = [
	        parseInt($(event.target).attr('pos')[0]),
	        parseInt($(event.target).attr('pos')[2])
	      ];
	
	      var p = this.board.piece(piecePos);
	
	      if (p.color === 'white' ) {
	        newPiece.addClass('selected');
	        _selected = p;
	        _selected.moves().forEach(function(pos) {
	          $('li[pos="' + pos[0] + ',' + pos[1] + '"]').addClass('valid-move');
	        });
	      } else if (p.color === 'black'
	          && Util.includesPos(p.pos, _selected.moves())
	          && _selected.isMoveable) {
	        this.board.move(_selected.pos, p.pos, this.renderCB);
	      }
	    }.bind(this))
	    .appendTo($pieces);
	};
	
	Display.prototype.renderCB = function (startPos, endPos, moveCompleted, timerAmount) {
	  removePiece(endPos);
	  if (moveCompleted) {
	    renderPieceMove(startPos, endPos, renderTimer, timerAmount);
	  } else {
	    renderPieceMove(startPos, endPos);
	  }
	};
	
	function renderPieceMove(startPos, endPos, completionCB, timerAmount) {
	  var $piece = $('div[pos="' + startPos[0] + ',' + startPos[1] + '"]');
	
	  var top = 60 * endPos[0];
	  var left = 60 * endPos[1];
	
	  $piece.css({top: top + 'px', left: left + 'px'});
	  $piece.attr('pos', endPos);
	
	  if (completionCB) {
	    setTimeout(function(){
	      completionCB($piece, timerAmount);
	    }, Constants.MoveTime);
	  }
	}
	
	function removePiece(pos) {
	  var $piece = $('div[pos="' + pos[0] + ',' + pos[1] + '"]');
	  $piece.empty();
	  $piece.children().remove();
	  $piece.remove();
	}
	
	function renderTimer ($piece, timerAmount) {
	  $piece.children().remove();
	  var $timer = $('<div>')
	    .addClass('timer')
	    .css({transition: "all " + (timerAmount / 1000).toString() + "s linear"})
	    .appendTo($piece);
	
	  setTimeout(function(){
	    $piece.children().css({height: '0px', marginTop: '60px'});
	    setTimeout(function() {
	      $timer.empty();
	      $timer.remove();
	    }, timerAmount);
	  }, 25);
	}
	
	function removeSelected() {
	  $('.selected').removeClass('selected');
	  $('.valid-move').removeClass('valid-move');
	}
	
	Display.prototype.destroy = function () {
	  this.$root.empty();
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
	  MoveTime: 500,
	  Slow: 8000,
	  Normal: 5000,
	  Fast: 2000,
	  Values: {
	    Bishop: 3,
	    King: 100,
	    Knight: 3,
	    Pawn: 1,
	    Queen: 9,
	    Rook: 5,
	  }
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
	var Constants = __webpack_require__(3);
	
	var Board = function () {
	  this.grid = [];
	  this.whitePieces = [];
	  this.blackPieces = [];
	  this.setSpeed();
	
	  for (var i = 0; i < 8; i++) {
	    this.grid.push([null,null,null,null,null,null,null,null]);
	  }
	};
	
	Board.prototype.move = function (startPos, endPos, renderCB) {
	  if (this.isGameOver()) {
	    this.destroy();
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
	
	Board.prototype.clearPos = function (pos) {
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
	
	Board.prototype.promotePawn = function (piece, renderCB) {
	  var color = piece.color;
	  var pos = piece.pos;
	
	  this.removePiece(piece.pos);
	
	  var q = new Pieces.Queen({color: color, board: this, pos: pos});
	  q.isMoveable = false;
	
	  var $piece = $('div[pos="' + pos[0] + ',' + pos[1] + '"]');
	  $piece.text(Constants.Queen);
	
	  q.setTimer();
	};
	
	Board.prototype.destroy = function () {
	  this.grid = [];
	  this.whitePieces = [];
	  this.blackPieces = [];
	};
	
	Board.prototype.setSpeed = function () {
	  if ($('#normal').children('.indicator').hasClass('active'))
	    this.speed = Constants.Slow;
	  else if ($('#slow').children('.indicator').hasClass('active'))
	    this.speed = Constants.Normal;
	  else
	    this.speed = Constants.Fast;
	};
	
	Board.prototype.populate = function () {
	  this.setSpeed();
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
	    this.isMoveable = false;
	    var stopMoving = false;
	    if (Util.posEquals(newPos, targetPos) || (b.hasPiece(newPos) && b.piece(newPos).color !== this.color)) {
	      stopMoving = true;
	    }
	    if (stopMoving)
	      renderCB(this.pos, newPos, stopMoving, this.board.speed);
	    else
	      renderCB(this.pos, newPos, stopMoving);
	
	    this.board.removePiece(newPos);
	    this.board.clearPos(this.pos);
	
	    this.setPos(newPos);
	    this.board.placePiece(this);
	
	    this.moved = true;
	
	    if (this.board.isGameOver()) {
	      console.log('move attempted, game has ended');
	    }
	
	    if (stopMoving) {
	      this.checkGameOver();
	      if (this.type() === 'Pawn' && (this.pos[0] === 7 || this.pos[0] === 0)) {
	        this.board.promotePawn(this, renderCB);
	      } else {
	        this.setTimer();
	      }
	      return;
	    } else {
	      setTimeout(function(){
	        this.move(targetPos, renderCB);
	      }.bind(this), Constants.MoveTime);
	    }
	  }
	};
	
	Piece.prototype.setTimer = function () {
	  setTimeout(function() {
	    this.isMoveable = true;
	  }.bind(this), this.board.speed + Constants.MoveTime + 25);
	};
	
	Piece.prototype.checkGameOver = function () {
	  if (this.board.isGameOver()) {
	    if ($('#gameover').length === 0)
	      $('<div>')
	        .attr('id', 'gameover')
	        .text('GAME OVER')
	        .prependTo($('#grid'));
	    if ($('#overlay').length === 0)
	      $('<div>').attr('id', 'overlay').prependTo($('#game'));
	    $('.piece').removeClass('selected');
	    $('.square').removeClass('valid-move');
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
	
	  renderCB(this.pos, targetPos, true, this.board.speed);
	
	  this.board.clearPos(this.pos);
	  this.board.removePiece(targetPos);
	  this.setPos(targetPos);
	  this.board.placePiece(this);
	
	  if (this.board.isGameOver()) {
	    console.log('move attempt when game over');
	  }
	
	  this.isMoveable = false;
	  
	  this.checkGameOver();
	  this.setTimer();
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
	      renderCB(rook.pos, newPos, true, this.board.speed);
	      b.clearPos(rook.pos);
	      if (left)
	        rook.setPos([oldPos[0], 3]);
	      else
	        rook.setPos([oldPos[0], 5]);
	      b.placePiece(rook);
	
	      rook.isMoveable = false;
	      setTimeout(function() {
	        rook.isMoveable = true;
	      }, this.board.speed + Constants.MoveTime + 25);
	    }.bind(this), Constants.MoveTime + 25);
	  }
	  Piece.prototype.move.call(this, targetPos, renderCB);
	};
	
	module.exports = King;


/***/ },
/* 16 */
/***/ function(module, exports) {

	function Player(board) {
	  this.selected = undefined;
	  this.addListeners();
	  this.board = board;
	}
	
	Player.prototype.addListeners = function () {
	  $('#grid').click(function(event) {
	    // move logic here
	    // console.log($(event.target).attr('pos'));
	  });
	};
	
	module.exports = Player;


/***/ },
/* 17 */
/***/ function(module, exports) {

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


/***/ },
/* 18 */
/***/ function(module, exports) {

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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var Constants = __webpack_require__(3);
	
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
	
	    if (piece && piece.type() !== "King") {
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
	  if (piece) {
	    var moves = piece.moves();
	    var randMove = moves[Math.floor(Math.random()*moves.length)];
	    return randMove;
	  }
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


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {
	  openModal: function() {
	    var $overlay = $('<div>').attr('id', 'modal-overlay');
	    var $window = $('<div>').attr('id', 'modal-window').addClass('section');
	    var $close = $('<input id="close-modal" type="button" value="close"/>');
	    $close.click(function(event) {
	      $overlay.empty();
	      $overlay.remove();
	    });
	
	    $window.append($('<h2>').text('Kungfu Chess'));
	    $window.append($('<p>').text(
	      "In Kungfu Chess, a player can move any of their available pieces at \
	      any given moment. After a piece is moved, it is delayed (being unable \
	      to move) for a constant and predefined amount of time before it \
	      can be moved again. The movement of the pieces from one position to \
	      another is not immediate but also has its own short duration, leading \
	      to a typical situation where many pieces on the board are moving at \
	      the same time."
	    ));
	    $window.append($('<h3>').text(
	      "How to play"
	    ));
	    $window.append(
	      $('<ul>')
	        .append($('<li>').text('To start a game, click start'))
	        .append($('<li>').text('To move a piece, click it and select a target location'))
	        .append($('<li>').text('The game ends when either King is taken'))
	    );
	    $window.append($('<p>').addClass('help-text').text(
	      "Inspired by the original game, "
	    ).append('<a href="https://en.wikipedia.org/wiki/Kung-Fu_Chess" target=_blank >Kung-Fu Chess</a>'));
	    $close.appendTo($window);
	
	
	    $overlay.prependTo('body');
	    $window.prependTo($overlay);
	  },
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map