'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
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

const gameUpdate = function(event){
  event.preventDefault();

  let move = '';
  let indexOfArray = $(this).data("id");
  let value = '';
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
  .done(ui.gameUpdate)
  .fail(ui.failure);
};




const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#game-create').on('click', gameCreation);
  $('#game-update').on('click', gameUpdate);
  $('.cell').on('click', gameUpdate);
  //$('.cell').on('click', playerTurn)
};

module.exports = {
  addHandlers,
};
