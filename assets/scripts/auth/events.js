'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const app = require('../app');
const ui = require('./ui');

let turn = 0;

const onSignUp = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.success)
  .fail(ui.failure);
};


const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
};

const onSignOut = function(event){
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.error);
};

const onChangePassword = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

const gameCreation = function(event){
  event.preventDefault();
  api.gameCreation()
  .done(ui.gameCreation)
  .fail(ui.failure);
};

const gameStat = function(data){
  api.gameStat()
  .done(ui.gameStat)
  .fail(ui.failure);
};

const checkForWinner = function(data) {
  let winner = null;

  let currentPlayer = turn % 2 === 0 ? 'O' : 'X';
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
let cells = data.game.cells;
if(currentPlayer === cells[cell1] && cells[cell1] === cells[cell2] && cells[cell2] === cells[cell3] && cells[cell3]) {
  winner = currentPlayer;
  api.gameOver()
    .done(gameStat)
    .done(ui.gameUpdate);
}
let filledCellsCount = data.game.cells.filter( function (item) {
  return item.trim().length > 0;
}).length;
console.log(filledCellsCount);
if (winner === null && filledCellsCount === 9) {
  api.gameOver()
  .done(gameStat)
  .done(ui.gameUpdate);
}
});
}

const gameUpdate = function(event){
  event.preventDefault();
  if (app.game && !app.game.over) {
    let move = '';
    let priorValue = $(this).text();
    let indexOfArray = $(this).data("id");
    let value = '';
    if (!priorValue.includes('X') && !priorValue.includes('O')) {
      if (turn % 2 === 0) {
        move = 'X';
        $(this).text(move);
        value = move;
        ++turn;
      } else {
        move = 'O';
        $(this).text(move);
        value = move;
        ++turn;
      }
      api.gameUpdate(indexOfArray, value)
      .done(checkForWinner)
      .done(ui.gameUpdate)
      .fail(ui.failure);
    }
  }
};

const resetGame = function (event) {
  event.preventDefault();
  $('.cell').text('');
  $("h3#winner").text('');
  api.gameCreation()
    .done(ui.gameCreation);
};



const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#game-create').on('click', gameCreation);
  $('#game-update').on('click', gameUpdate);
  $('.cell').on('click', gameUpdate);
  $('#reset-button').on('click', resetGame);
  //$('.cell').on('click', playerTurn)
};

module.exports = {
  addHandlers,
};
