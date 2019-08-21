class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.$el.append(this.setupBoard());
    this.bindEvents();
  }

  makeMove($square) {
    let pos = $square.data("pos");
    let grid = this.game.board.grid;
    let mark = grid[pos[0]][pos[1]];
    if (mark === "x") {
      $square.addClass("x");
      $square.addClass("x::after");
      
    } else {
      $square.addClass("o");
      $square.addClass("o::after");
    }

    if (this.game.isOver()) {
      let $winners = $("." + mark);
      let $rest = $("li").filter(function() {
        return !$(this).hasClass(mark);
      });
        $winners.each(function() {
          // $(this).addClass("winner-" + mark);
          $(this).css({"background-color": "green", "color": "white"});
        });
        $rest.each(function() {
          // $(this).addClass("game-over");
          $(this).css({ "background-color": "white", "color": "red" });
        });
        $("li").off();
        let $caption = $("<h3 text-align=\"center\">You win "+ mark +"!</h3>");
        this.$el.append($caption);
    }
    
  }

  setupBoard() {
    let $ul = $('<ul class="board"></ul>');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li></li>");
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    return $ul;
  }

  bindEvents() {
    let $li = $("li");
    $li.on("click", (e) => {
      this.game.playMove($(e.target).data("pos"));
      this.makeMove($(e.target));
    });
  }
}

module.exports = View;
