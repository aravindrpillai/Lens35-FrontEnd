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

  

export {capitalizeFirstCharacter, isNotEmpty, extractDomainNameFromURL}