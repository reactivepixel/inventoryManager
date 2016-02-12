module.exports = {

  //Create a function to generate a new UUID number
  uuid: function() {
    function number() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return  "j" + number() + number() + number() + number() + number() + number() + number() + number();
  }
};
