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
