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

const displayWinner = function(currentPlayer) {
  if (currentPlayer === null) {
    $('h3#winner').text('There is no winner. There are no more spaces to fill.');
  } else {
    $('h3#winner').text("Player " + currentPlayer + " is the winner!");
    app.playerWins[currentPlayer] += 1;
    $('h4#player-x-wins').text("Player X has " + app.playerWins['X'] + " wins");
    $('h4#player-o-wins').text('Player O has ' + app.playerWins['O'] + " wins");
  }
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  gameCreation,
  gameUpdate,
  displayWinner
};
