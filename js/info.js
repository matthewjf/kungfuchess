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
