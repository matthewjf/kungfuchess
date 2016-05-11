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
