// Gravity Application API | id-Generator
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// add var APIFunctions = require('./../functions.js'); to any page that needs these function calls
module.exports = function (){
  var idGenerator = {
    generateNew : function(){
      function s4() {
        // handles making unique characters in sets of 4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      // combine and return a string of random characters several.
      // the first character MUST be a letter for id's to work. we've gone with "J"
      return "j" + s4() + s4() +  s4() +  s4() +  s4() + s4() + s4() + s4();
    }



  };
  console.log(idGenerator.generateNew);
  return idGenerator;
}();

