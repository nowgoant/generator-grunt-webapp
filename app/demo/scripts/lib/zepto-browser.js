(function ($, win) {
  'use strict';
  var _browser = {
      jdjr: false
    },
    navigator = win.navigator,
    userAgent = navigator && navigator.userAgent.toLowerCase() || '',
    regExp = /(jdjr|msie|trident|chrome|crios|firefox|webkit|opera|safari|ipad|iPhone|Android|MicroMessenger|qq|ucbrowser)[ \/os]*([\d_.]+)/ig;

  //alert(userAgent);
  //console.log(userAgent);
  userAgent.replace(regExp, function (n, core, number) {
    //alert(n + ' ' + core + ' ' + number);
    if (!_browser[core]) {
      _browser[core] = number;
    }
  });

  _browser.jdjr = /jdjr/.test(userAgent);

  console.log(_browser);
  $.browser = _browser;
}(window.Zepto, window));
