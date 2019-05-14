var urlParameter = function urlParameter(sParam) {
  var pageUrl = window.location.search.substring(1),
    urlVariables = pageUrl.split("&"),
    parameterName,
    i;

  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split("=");
    if (parameterName[0] === sParam) {
      return parameterName[1] === undefined
        ? true
        : decodeURIComponent(parameterName[1]);
    }
  }
};
