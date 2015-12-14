// Gravity Application API | function calls for API
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// add  var APIFunctions = require('./../functions.js'); to any page that needs these function calls
// FIXME: Remove this page
module.exports = function (){
  var APIFunctions = {
    idGenerator : function(){
      function s4() {
        // handles making unique characters in sets of 4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      // combine and return a string of random characters several.
      // the first character MUST be a letter for id's to work. we've gone with "J"
      return "j" + s4() + s4() +  s4() +  s4() +  s4() + s4() + s4() + s4();
    }
  };

  return APIFunctions;
}();

module.exports = APIFunctions;