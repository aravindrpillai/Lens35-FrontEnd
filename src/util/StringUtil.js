function capitalizeFirstCharacter(str) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}

function isNotEmpty(obj){
    return (typeof obj !== undefined && obj !== undefined && obj !== null && obj !== "")
}


function extractDomainNameFromURL(url) {
    let domain;
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    if (domain.indexOf("www.") === 0) {
      domain = domain.substring(4);
    }
    const parts = domain.split('.');
    if (parts.length > 1) {
      parts.pop();
      domain = parts.join('.');
    }
    return domain;
  }

  
  function formatEventName(event_code){
    switch(event_code.toLowerCase()){
      case "wedding": return "Wedding"
      case "engagement": return "Engagement"
      case "family": return "Family"
      case "party": return "Party"
      case "portrait": return "Portrait"
      case "event": return "Event"
      case "maternity": return "Maternity"
      case "real_estate": return "Real Estate"
      case "graduation": return "Graduation"
      case "team_and_office": return "Team and office"
      case "product": return "Product"
      case "modelling": return "Modelling"
      case "food": return "Food"
      case "vehicles": return "Vehicles"
      case "baby": return "Baby"
      case "kids": return "Kids"
      case "sport": return "Sport"
      case "pet": return "Pet"
      case "religious": return "Religious"
      case "short_film": return "Short Film"
      case "other": return "Other"
      default : return "--Unknown-Event--"
    }
  }

  
  function formatServiceName(service_code){
    switch(service_code.toLowerCase()){
      case "photographer" : return "Photographer"
      case "videographer" : return "Videographger"
      case "drone_photographer" : return "Drone Photographer"
      case "photo_editor" : return "Photo Editor" 
      case "video_editor" : return "Video Editor"
      //Actual values are as follows
      case "photography" : return "Photography"
      case "videography" : return "Videography"
      case "drone_photography" : return "Drone Photography"
      case "photo_editing" : return "Photo Editing" 
      case "video_editing" : return "Video Editing"
      default : return "--Unknown-Service--"
    }
  }

export {capitalizeFirstCharacter, isNotEmpty, extractDomainNameFromURL, formatEventName, formatServiceName}