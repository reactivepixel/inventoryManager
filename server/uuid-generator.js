'use strict';
module.exports = {

  // Create a function to generate a new UUID number
  generateUUID() {
    function generateRandomNumber() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return  "j" + generateRandomNumber() + generateRandomNumber() + generateRandomNumber() +
            generateRandomNumber() + generateRandomNumber() + generateRandomNumber() +
            generateRandomNumber() + generateRandomNumber();
  }
};
