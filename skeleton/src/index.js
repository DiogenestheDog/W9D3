const View = require('./ttt-view');
const Game = require('../../solution/game.js');

  $(() => {
    // Your code here
    let g1 = new Game();
    let figure = $("figure");
    let view = new View(g1, figure);
  });
