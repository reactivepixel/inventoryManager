module.exports = {

  // Created a function to get the date
  toTimestamp: function(strDate) {
      const now = new Date();
      const date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
      const time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
      const suffix = ( time[0] < 12 ) ? "AM" : "PM";
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
      time[0] = time[0] || 12;
      for ( var i = 1; i < 3; i++ ) {
          if ( time[i] < 10 ) {
              time[i] = "0" + time[i];
          }
      }
      return date.join("/")+ " "+time.join(":")+" "+suffix;
  }
}
