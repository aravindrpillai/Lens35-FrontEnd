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
  const now = new Date();
  const later = new Date(now.getTime());
  later.setHours(later.getHours() + 4);//Adding 4 hours extra to the default booking start date
  const year = later.getFullYear();
  const month = String(later.getMonth() + 1).padStart(2, "0");
  const day = String(later.getDate()).padStart(2, "0");
  const hours = String(later.getHours()).padStart(2, "0"); 
  const minutes = String(later.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getTodaysDate(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export function getTomorrowsDate(){
  function addZero(val){
    return val < 10 ? "0"+val : val
   }
  let today = new Date()
  let tomorrow = (new Date(today.getTime() + (24 * 60 * 60 * 1000)))
  return tomorrow.getFullYear() + "-" +addZero(tomorrow.getMonth()+1) + "-" +addZero(tomorrow.getDate())
}