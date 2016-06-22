'use strict';

const app = require('../app.js');
app.playerWins = { X: 0, O: 0};
const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = function(data){
    app.user = data.user;
    console.log(app);
};

const signOutSuccess = function(event){
  app.user = null;
  console.log(app);

};

const gameCreation = function(data){
  app.game = data.game;
};

const gameUpdate = function(data){
  app.game = data.game;
  console.log(app.game);
};

const checkForWinner = function(data) {
  let winner = undefined;
  let winningLetter = '';

  let winning_lines = [[0, 1 ,2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];
winning_lines.forEach(function(line) {
let cell1 = line[0]; // cells are rows
let cell2 = line[1];
let cell3 = line[2];
let cells = data.game.cells;

if('X' === cells[cell1] && cells[cell1] === cells[cell2] && cells[cell2] === cells[cell3] && cells[cell3]) {
  if (data.game.over === true) {
    winner = data.game.player_x || 'X';
    winningLetter = 'X';
  }
}
if('O' === cells[cell1] && cells[cell1] === cells[cell2] && cells[cell2] === cells[cell3] && cells[cell3]) {
  if (data.game.over === true) {
    winner = data.game.player_o || 'O';
    winningLetter = 'O';
  }
}
});
  currentWinner(winner, winningLetter);
  return winner;

};

const gameStat = function(data){
  let userWinners = {};
  let gamesOver = data.games;
  let gamesPlayed = gamesOver.length;

  $("h4#all-winners").text("You have played " + gamesPlayed + " games.");
}


const displayWinner = function(userWinners) {
  console.log(userWinners);
  let textValue = [];
  for( let i = 0; i < Object.keys(userWinners).length; i++) {
    textValue.push("Player: " + Object.keys(userWinners)[i] + " has " + userWinners[Object.keys(userWinners)[i]] + " wins.");
  }

  $('h4#all-winners').text(textValue.join("\n"));
};

const currentWinner = function(currentWin, currentPlayer) {
  if (currentWin == undefined) {
    $('h3#winner').text('There is no winner. There are no more spaces to fill.');
  } else {
    $('h3#winner').text("Player " + currentPlayer + " is the winner!");
  }

};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  gameCreation,
  gameUpdate,
  displayWinner,
  gameStat,
  checkForWinner
};
