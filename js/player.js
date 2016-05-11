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
