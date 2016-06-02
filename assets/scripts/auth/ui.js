'use strict';

const app = require('../app.js');

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
  console.log(app);
}

const gameUpdate = function(data){
  app.game = data.game;
  console.log(app);
}


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  gameCreation,
  gameUpdate,
};
