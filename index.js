'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js');

// styles
require('./assets/styles/index.scss');

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

// attach getFormFields globally

require('expose?getFormFields!./lib/get-form-fields.js');


playerTurn =

function checkForWinner() {
  let winning_lines = [[0, 1 ,2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];
winning_lines.forEach(function(line) {
let cell1 = line[0];
let cell2 = line[1];
let cell3 = line[2];
if(current_player === 'cell'[cell1] && 'cell'[cell1] === 'cell'[cell2] && 'cell'[cell2] === 'cell'[cell3] && 'cell'[cell3]) {
  winner = current_player;
}
});
}

function endGame() {
  checkForWinner()=
}





$(document).ready(function tictactoe() {
  let BLANK = '';
  let board = [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK];
  let x = "X";
  let o = "O";
  let current_player = x;
  let winner = "none";
  let move = 0;
  let computer = o;
  let start_message = $('#message').clone();

  function virtualPlayer(player) {
    computer = player;
    $('#message').empty();
    $('#message').text("Fine, I will be " + computer.toUpperCase());
    if(current_player === computer){
      virtualMove();
    }
  }

  function virtualMove() {
    let box = Math.floor(Math.random() * 8);
    if(board[box] === BLANK) {
      $('*[data-position="' + box + '"]').trigger("click");
    } else {
      box = board.indexOf(BLANK);
      if(box===-1) {
        checkForWinner();
      } else {
        $('*[data-position="' + box + '"]').trigger("click");
      }
    }
  }

  function resetState() {
    board = [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK];
    current_player = x;
    computer = o;
    winner = "none";
    move = 0;
    drawBoard();
    $('#message').replaceWith(start_message);
    $('#x').click(function(){
      event.preventDefault();
      virtualPlayer(o);
    });
    $('#o').click(function() {
      event.preventDefault();
      virtualPlayer(x);
    });
    $('#game-over').css({display: 'none'});
    $('#board').css({display: 'block'});
  }

  $('.cell').click(play);

  function play(event) {
    if(winner === "none" && move < 9){
      playerTurn(event);
    }
    endGame();
  }

  function playerTurn(event) {
    let position = $(event.target).attr('data-position');
    if(board[position] !== BLANK) {
      displayMessage("This square is taken; please select a free square.", '#ff9999');
    } else if(board[position] === BLANK) {
      board[position] = current_player;
      drawBoard();
      checkForWinner();
      current_player = (current_player === x ? o : x);
      if(current_player === computer) {
        virtualMove();
      }
      displayMessage("Your turn, " + current_player, 'lightgray');
    }
  }

  function drawBoard() {
    for(let i = 0; i < 9; i++) {
      $('.cell[data-position="' + i + '"]').text(board[i]);
    }
  }

  function displayMessage(message, color) {
    $('#message').text(message).css({'background-color': color});
  }

  function checkForWinner() {
    let winning_lines = [[0, 1 ,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],[2, 4, 6]];
    winning_lines.forEach(function(line) {
      let cell1 = line[0];
      let cell2 = line[1];
      let cell3 = line[2];
      if(current_player === board[cell1] && board[cell1] === board[cell2] && board[cell2] === board[cell3]) {
        winner = current_player;
      }
    });
  }

  function endGame() {
    if(board.indexOf(BLANK) === -1 && winner === "none") {
      $('#board').css({display: 'none'});
      $('#game-over').text("Stalemate! All squares were filled without either player getting three in a row. Click here to play again.").css({display: 'block'});
    } else if(winner !== "none") {
      $('#board').css({display: 'none'});
      if(winner === computer) {
        $('#game-over').text("Yay! I win this time! Click here to play again.").css({display: 'block'});
      } else {
        $('#game-over').text("Congratulations, " + winner + "! You win this time! Click here to play again.").css({display: 'block'});
      }
    }
    $('#game-over').one("click", resetState);
  }

  $('#x').click(function(){
    event.preventDefault();
    virtualPlayer(o);
  });
  $('#o').click(function() {
    event.preventDefault();
    virtualPlayer(x);
  });
});
