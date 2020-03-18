
var moment = require('moment');
var str1 = '2020-03-14T02:14:24.763Z';

function  format(str){
      var translate_time = moment(str).format("YYYY-MM-DD HH:mm:ss")
      return translate_time

//     var dateString = str.substring(0,10);

//     var timeString = str.substring(12, 19);

//     return dateString+" "+timeString;

}

console.log(format(str1))

