// Props to Phillion for beta testing and breaking my game first try    

// All winning states of the game
win_arrays = [
    ["#_1", "#_2", "#_3"], // row 1
    ["#_4", "#_5", "#_6"], // row 2
    ["#_7", "#_8", "#_9"], // row 3
    ["#_1", "#_4", "#_7"], // col 1
    ["#_2", "#_5", "#_8"], // col 2
    ["#_3", "#_6", "#_9"], // col 3
    ["#_1", "#_5", "#_9"], // diag 1
    ["#_3", "#_5", "#_7"] // diag 2
  ],
  // game variables
  game_over = false,
  player = "X",
  AI = "O",
  first_turn = 1,
  turn = "X",
  moves = 0,
  EMPTY = "&nbsp;";

// resets
$("#b_X").click();
$("#b_one").click();

// Set player identifiers X & O & restart game
$("#b_X").click(
  function() {
    //console.log("changed player to X");
    $("#b_O").css("opacity", "0.5");
    $("#b_X").css("opacity", "1");
    if (player === "X") {
      return;
    } else {
      player = "X", AI = "O";
    }
    if (first_turn === 1) {
      turn = player
    } else {
      turn = AI
    }
    new_game();
  });
$("#b_O").click(
  function() {
    //console.log("changed player to O");
    $("#b_X").css("opacity", "0.5");
    $("#b_O").css("opacity", "1");
    if (player === "O") {
      return;
    } else {
      player = "O", AI = "X";
    }
    if (first_turn === 1) {
      turn = player
    } else {
      turn = AI
    }
    new_game();
  });
// Set who starts and restart game
$("#b_one").click(
  function() {
    //console.log("changed turn to player");
    turn = player;
    first_turn = 1;
    $("#b_two").css("opacity", "0.5");
    $("#b_one").css("opacity", "1");
    new_game();
  });
$("#b_two").click(
  function() {
    //console.log("changed turn to AI");
    turn = AI;
    first_turn = 2;
    $("#b_one").css("opacity", "0.5");
    $("#b_two").css("opacity", "1");
    new_game();
  });
// clears the board and gets board ready for play
function clear_board() {
  $("td").each(function() {
    $(this).html(EMPTY);
    $(this).data("owner", EMPTY);
    $(this).click(play);
  });
}

// clears board AND resets game
new_game = function() {
  game_over = false;
  clear_board();
  moves = 0;
  turn = player;
  //console.log("player is " + player + ", AI is " + AI);
  //console.log(turn + " is starting first");
  // If Ai's turn, ai goes first

}

// identify if a winning state is true or false
win = function(v, owner) {
  var array_score;
  for (x in win_arrays) {
    array_score = 0;
    for (y in win_arrays[x]) {
      // compare the current player (turn) to the owner of the array items 
      if ($(win_arrays[x][y]).data("owner") === owner) {
        array_score += 1;
        //console.log(array_score);
        //console.log($(win_arrays[x]));
        if (array_score === v) {
          return true;
        }
      }
    }
  }
  return false;
}

// public method returning array of cells owned by argument 'identity'
getOwnedCells = function(identity) {
  this.cells = [];
  // create an array of available moves
  $(".cell").each(function() {
    if ($(this).data("owner") === identity) {
      cells.push(this.id);
    }
  });
  //console.log(identity + " : " + cells);
  return cells;
}

// simple dumb unbeatable ai
ai_turn = function() {
    if (!aiMoved) {
      console.log("Ai takes turn");
      var emptyCells = getOwnedCells(EMPTY);
      aiMoved = false;
      // take center
      if ($("#_5").data("owner") === EMPTY) {
        $("#_5").click();
        aiMoved = true;
        // take opposite sides to opponent
      } else if (emptyCells.length === 7) {
        if ($("#_1").data("owner") == player) {
          $("#_9").click();
          aiMoved = true;
        } else if ($("#_3").data("owner") == player) {
          $("#_7").click();
          aiMoved = true;
        } else if ($("#_7").data("owner") == player) {
          $("#_3").click();
          aiMoved = true;
        } else {
          $("#_1").click();
          aiMoved = true;
        }

      } else {
        // check if someone can win
        for (x in win_arrays) {
          var playerWin = 0,
            aiWin = 0;
          for (y in win_arrays[x]) {
            if ($(win_arrays[x][y]).data("owner") === player) {
              playerWin += 1;
            }
            if ($(win_arrays[x][y]).data("owner") == AI) {
              aiWin += 1;
            }
            // if player can win, block him
            if (playerWin === 2 && aiMoved === false) {
              for (y in win_arrays[x]) {
                if ($(win_arrays[x][y]).data("owner") === EMPTY) {
                  $(win_arrays[x][y]).click();
                  console.log("player can win, clicked: " + win_arrays[x][y] + "\nFrom this array" + win_arrays[x]);
                  aiMoved = true;
                  return 0;
                }
              }
            }
            // if ai can win, win
            if (aiWin === 2 && aiMoved === false) {
              for (y in win_arrays[x]) {
                if ($(win_arrays[x][y]).data("owner") === EMPTY) {
                  $(win_arrays[x][y]).click();
                  console.log("ai can win, clicked: " + win_arrays[x][y] + "\nFrom this array" + win_arrays[x]);
                  aiMoved = true;
                  return 0;
                }
              }
            }
          }
        }
      }
      // private function for the ai to select an edge based on what diag is fill, and if that fails: take a corner
      takeEdge = function(a) {
        console.log("starting takeEdge function");
        if (a === 6) {
          console.log("clicking for diag 1");
          if ($("#_6").data("owner") === EMPTY) {
            $("#_2").click();
            aiMoved = true;
            console.log("clicked 6");
          } else if ($("#_8").data("owner") === EMPTY) {
            $("#_8").click();
            aiMoved = true;
            console.log("clicked 8");
          } else {
            takeCorner();
          }
        } else if (a === 7) {
          console.log("clicking for diag 2");
          if ($("#_4").data("owner") === EMPTY) {
            $("#_4").click();
            console.log("clicked 4");
            aiMoved = true;
          }else if ($("#_2").data("owner") === EMPTY) {
            $("#_2").click();
            aiMoved = true;
            console.log("clicked 2");
          } else {
            takeCorner();
          }
        } else {
          return;
        }
      }

      console.log("checking diags");
      // check for diag 1 to be full
      if (!aiMoved) {
        this.aScore = 0;
        this.diagFull = false;
        for (x in win_arrays[6]) {
          if ($(win_arrays[6][x]).data("owner") != EMPTY) {
            this.aScore += 1;
            console.log(this.aScore + " : " + $(win_arrays[6][x]).data("owner"));
          }
        }
        if (this.aScore === 3) {
          this.diagFull = true;
          takeEdge(6);
          console.log("diag 1 : " + win_arrays[6] + " is full!");
          return 0;
        }
        // check for diag 2 to be fill
        if (!diagFull) {
          this.aScore = 0;
          for (x in win_arrays[7]) {
            if ($(win_arrays[7][x]).data("owner") != EMPTY) {
              this.aScore += 1;
              console.log(this.aScore + " : " + $(win_arrays[7][x]).data("owner"));
            }
          }
          if (this.aScore === 3) {
            console.log("diag 2 : " + win_arrays[7] + " is full!");
            this.diagFull = true;
            takeEdge(7);
            return 0;
          }
        }
      }
      // private function to take a corner
      takeCorner = function() {
        if (!aiMoved) {
          console.log("taking corner");
          if ($("#_1").data("owner") === EMPTY) {
            $("#_1").click();
            aiMoved = true;
            console.log("clicked 1");
          } else if ($("#_3").data("owner") === EMPTY) {
            $("#_3").click();
            aiMoved = true;
            console.log("clicked 3");
          } else if ($("#_7").data("owner") === EMPTY) {
            $("#_7").click();
            aiMoved = true;
            console.log("clicked 7");
          } else if ($("#_9").data("owner") === EMPTY) {
            $("#_9").click();
            aiMoved = true;
            console.log("clicked 9");
          }
        }
        aiMoved = true;
      }
      if (!aiMoved) {
        console.log("ai hasn't moved yet");
        takeCorner();
        console.log("ai should have movedby now");

      }
      if (!aiMoved) {
        console.log("ai didn't move");
      } else {
        console.log("ai moved");
      }
    }
    aiMoved = true;
  console.log("AI finished turn");
  }
  // run play on target cell when clicked
play = function() {

    // check for game over
    // if cell is owned do nothing
    if ($(this).html() !== EMPTY) {
      return;
      // if cell is free update board and player turn
    } else {
      //apply the move
      $(this).html(turn);
      $(this).data("owner", turn);
      moves += 1;
      // check for a win
      if (win(3, turn)) {
        game_over = true;
        setTimeout(function(){},500);
        alert("GAME OVER " + turn + " wins!");
        setTimeout(function() {
          new_game();
        }, 200);
        // check for a draw
      } else if (moves === 9) {
        alert("Cat's Game!");
        setTimeout(function() {
          new_game();
        }, 200);
      } else {
        // change turns
        turn = turn === "X" ? "O" : "X";
        // if ai's turn, ai takes turn
        if (turn === AI) {
          aiMoved = false;
          ai_turn();
        }
      }
    }

  }
  // play the game
new_game();