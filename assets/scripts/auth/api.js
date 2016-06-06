'use strict';
const app = require('../app.js');

const signUp = (data) => {
  return $.ajax({
      url: app.host + '/sign-up/',
      method: 'POST',
      data: data
  });
};

const signIn = (data) => {
  return $.ajax({
    url: app.host + '/sign-in/',
    method: 'POST',
    data
  });
};

const signOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

const changePassword = (data) => {
  return $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const gameUpdate = (indexOfArray, value) => {
  return $.ajax({
    url: app.host + '/games/' + app.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": indexOfArray,
          "value": value
        },
        "over": false
      }
    }
  });
};

const gameOver = () => {
    return $.ajax({
      url: app.host + '/games/' + app.game.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + app.user.token
      },
      data: {
        "game": {
          "over": true
        }
      }
    });
};

const gameCreation = () => {
  return $.ajax({
      url: app.host + '/games',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      }
  });
};

const cell = (data) => {
  return $.ajax({
    url: app.host + '/games/' + app.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data
  });
};



module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  gameUpdate,
  gameCreation,
  cell,
  gameOver
};
