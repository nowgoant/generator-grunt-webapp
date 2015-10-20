!function(a){"use strict";function b(b){a.stopEvt(b)}var c="onorientationchange"in window?"orientationchange":"resize",d=[],e=0,f=d.slice;a.slice=f,a.ui={},a.isString=function(b){return"string"===a.type(b)},a.isBoolean=function(b){return"bool"===a.type(b)},a.isNumber=function(b){return"number"===a.type(b)},a.isObject=function(b){return"object"===a.type(b)},a.isUndefined=function(a){return void 0===a},a.isNull=function(a){return null===a},a.disable=function(b){var c=a(b);c&&c.length>0&&!c.hasClass("disable")&&c.addClass("disable")},a.enable=function(b){var c=a(b);c&&c.length>0&&c.hasClass("disable")&&c.removeClass("disable")},a.isEnable=function(b){var c=a(b);return c&&c.length>0&&!1===c.hasClass("disable")},a.toString=function(b){return b||a.isNumber(b)?String(b):""},a.toSafeString=function(b){return b=a.toString(b),b=b?a.trim(b.replace(/null|undefined|NaN/gi,"")):""},a.toLowerCase=function(b){return b=a.toSafeString(b),b?b.toLowerCase():""},a.toNumber=function(a){return a=Number(a),isNaN(a)?0:a},a.emptyFun=function(){},a.split=function(b,c){return a.isString(b)?b.split(c):[]},a.equal=function(b,c){return a.toString(b)===a.toString(c)},a.getURLQueryObj=function(b){var c=b||location.search,d={};return c&&(c=c.replace("?","").split("&"),c&&c.length>0&&a.each(c,function(a,b){b=b.split("="),b&&b.length>1&&(d[b.shift()]=b.join("="))})),d},a.addUrlParam=function(b,c){return b&&c?(c=a.param(c),c&&(b+=b.indexOf("?")>-1?"&"+c:"?"+c),b):b},a.urlClearCache=function(b,c){return c=c||{},c.t=(new Date).getTime(),a.addUrlParam(b,c)},a.toFixed=function(b,c,d,e){var f,g,h,i;if(c=c||2,e=e||".",f=Number(b),a.isNumber(f)&&!isNaN(f)){f=String(f),g=f.split("."),i=g[0],d?(h=i.length>3?i.length%3:0,f=(h?i.substring(0,h)+d:"")+i.substring(h).replace(/(\d{3})(?=\d)/g,"$1"+d)+e):f=i+e,g.length>1&&(f+=g[1].substring(0,c));for(var j=f.indexOf(".");f.length<=j+c;)f+="0"}else f=0;return a.toSafeString(f)},a.objectExtend=function(b,c,d){var e;if(b&&c)for(e in b)void 0!==c[e]&&(b[e]=d?a.toSafeString(c[e]):c[e])},a.delay=function(b,c){var d=f.call(arguments,2);if(a.isFunction(b)){c=c||25;var e=setTimeout(function(){return clearTimeout(e),b.apply(null,d)},c)}},a.stopEvt=function(a){a&&(a.stopPropagation(),a.preventDefault())},a.guid=function(b){return b=a.toString(b)||"",b+e++},a.stopScorll=function(){a(document).on("touchmove",b)},a.enableScroll=function(){a(document).off("touchmove",b)},a.safeEach=function(b,c){!b||a.isArray(b)&&0===b.length||a.each(b,c)},a.fn.disable=function(){a.disable(this)},a.fn.enable=function(){a.enable(this)},a.fn.isEnable=function(){return a.isEnable(this)},a.fn.orientation=function(b){a(this).on(c,function(d){a.isFunction(b)&&b(c,d)})},a.fn.triggerCalss=function(a){this.hasClass(a)?this.removeClass(a):this.addClass(a)},a.fn.safeTap=function(b,c){a.isFunction(b)&&(!1==1 in arguments&&(c=!0),this.tap(function(d){var e=a(this);e.isEnable()&&(e.disable(),b(e,d)&&e.enabled()),c&&a.stopEvt(d)}))}}(window.Zepto),function(a,b){"use strict";var c={jdjr:!1},d=b.navigator,e=d&&d.userAgent.toLowerCase()||"",f=/(jdjr|msie|trident|chrome|crios|firefox|webkit|opera|safari|ipad|iPhone|Android|MicroMessenger|qq|ucbrowser)[ \/os]*([\d_.]+)/gi;e.replace(f,function(a,b,d){c[b]||(c[b]=d)}),c.jdjr=/jdjr/.test(e),a.browser=c}(window.Zepto,window),function(a,b){"use strict";var c={add:function(a,b){var c,d,e;try{c=a.toString().split(".")[1].length}catch(f){c=0}try{d=b.toString().split(".")[1].length}catch(f){d=0}return e=Math.pow(10,Math.max(c,d)),(a*e+b*e)/e}};b.amount=c}(window,window.Zepto);