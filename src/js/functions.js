const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

/* modification of rating bar */
Handlebars.registerHelper("percentCalc", function(rating) {
  return rating*10;
});

Handlebars.registerHelper("backgroundColor", function(rating) {
  if(rating < 6){
      return "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
  } else if(rating > 6 && rating <= 8){
      return "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)"
  }else if(rating > 8 && rating <= 9){
      return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
  }else if(rating > 9){
      return "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
  }
});
