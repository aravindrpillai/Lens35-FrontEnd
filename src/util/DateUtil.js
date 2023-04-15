export function convertTimeStampToData(timestamp){
    var date_not_formatted = new Date(timestamp);
    if(isNaN(date_not_formatted)){
      return "-"
    }
    var formatted_string = date_not_formatted.getFullYear() + "-";
    
    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMonth() + 1);
    formatted_string += "-";
    
    if(date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    
    return formatted_string;
}

export function formatDDMMM(s) {
  if(s=== null || s === ""){
    return "-"
  }
  var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  var b = s.split(/\D/);
  return b[2] + ' ' + months[b[1]-1];
}

export function convert24To12(time24) {
  if(time24 === null || time24 === ""){
    return "--:--"
  }
  time24 = time24.substr(0,5)
  var H = +time24.substr(0, 2);
  var h = (H % 12) || 12;
  h = (h < 10)?("0"+h):h;
  var ampm = H < 12 ? " AM" : " PM";
  time24 = h + time24.substr(2, 3) + ampm;
  return time24;
}

export function getDifferenceInMinutes(date) {
  return (new Date(date) - new Date())/(1000*60)
}


export function getDefaultBookingStartDate(){
  function addZero(val){
    return val < 10 ? "0"+val : val
   }
  let date = new Date()
  return date.getFullYear() + "-" +addZero(date.getMonth()+1) + "-" +addZero(date.getDate()) + "T" +addZero(date.getHours()+2) + ":" +addZero(date.getMinutes())
}