var Constants = require('./constants');
var Util = require('./util');

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
    },3000);
  },250);
}

Display.prototype.removeSelected = function () {
  $('.selected').removeClass('selected');
  $('.valid-move').removeClass('valid-move');
};

module.exports = Display;
