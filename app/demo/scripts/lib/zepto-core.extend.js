/**
 * Created by majun1 on 2015/3/2.
 */

(function($) {
  'use strict';
  var ORIENTATION = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
  var emptyArray = [],
    _guid = 0,
    slice = emptyArray.slice;

  $.slice = slice;
  $.ui = {};

  /**
   * is系列类型判断
   * */
  $.isString = function(obj) {
    return $.type(obj) === 'string';
  };

  $.isBoolean = function(obj) {
    return $.type(obj) === 'bool';
  };

  $.isNumber = function(obj) {
    return $.type(obj) === 'number';
  };

  $.isObject = function(obj) {
    return $.type(obj) === 'object';
  };

  $.isUndefined = function(obj) {
    return obj === void 0;
  };

  $.isNull = function(obj) {
    return obj === null;
  };
  /**
   * 使按钮类元素不可用
   * */
  $.disable = function(selector) {
    var self = $(selector);
    if (self && self.length > 0 && !self.hasClass('disable')) {
      self.addClass('disable');
    }
  };

  /**
   * 使按钮类元素可用
   * */
  $.enable = function(selector) {
    var self = $(selector);
    if (self && self.length > 0 && self.hasClass('disable')) {
      self.removeClass('disable');
    }
  };

  /**
   * 判断按钮类元素是否可用
   * */
  $.isEnable = function(selector) {
    var self = $(selector);
    return self && self.length > 0 && false === self.hasClass('disable');
  };

  /**
   * 转换成字符串
   * */
  $.toString = function(val) {
    return (val || $.isNumber(val)) ? String(val) : '';
  };

  /**
   * 转换成字符串，并过滤特殊字符
   * */
  $.toSafeString = function(val) {
    val = $.toString(val);
    if (val) {
      val = $.trim(val.replace(/null|undefined|NaN/gi, ''));
    } else {
      val = '';
    }
    return val;
  };

  /**
   * 转换成小写
   * */
  $.toLowerCase = function(val) {
    val = $.toSafeString(val);
    return val ? val.toLowerCase() : '';
  };

  /**
   * 转换成数字
   * */
  $.toNumber = function(val) {
    val = Number(val);
    return isNaN(val) ? 0 : val;
  };

  /**
   * 空方法
   * 通常用作默认函数
   * */
  $.emptyFun = function() {};

  /**
   * 防止使用split时，input不是string类型
   * */
  $.split = function(input, split) {
    if ($.isString(input)) {
      return input.split(split);
    }
    return [];
  };

  /**
   * 判断是否相等
   * js语言的弱类型，类型之间可以隐式转换，造成不必要的麻烦
   * */
  $.equal = function(val1, val2) {
    return $.toString(val1) === $.toString(val2);
  };

  /**
   * 把URL中的参数转成对象
   * */
  $.getURLQueryObj = function(url) {
    var query = url || location.search,
      rst = {};

    if (query) {
      query = query.replace('?', '').split('&');
      if (query && query.length > 0) {
        $.each(query, function(key, val) {
          val = val.split('=');
          if (val && val.length > 1) {
            rst[val.shift()] = val.join('=');
          }
        });
      }
    }
    return rst;
  };

  /**
   * 给URL加参数
   * */
  $.addUrlParam = function(url, data) {
    if (!url || !data) {
      return url;
    }

    data = $.param(data);

    if (data) {
      if (url.indexOf('?') > -1) {
        url += '&' + data;
      } else {
        url += '?' + data;
      }
    }
    console.log(url);
    return url;
  };

  /**
   * 清除URL缓存
   * URL
   * */
  $.urlClearCache = function(url, options) {
    options = options || {};
    options.t = (new Date()).getTime();
    return $.addUrlParam(url, options);
  };

  /**
   * 精确小数位
   * 只截取小数位，不做四舍五入
   * @num 输入数字
   * @length 精确长度
   * @thousand 千位数分隔符
   * @decimal 小数链接符
   * */
  $.toFixed = function(num, length, thousand, decimal) {
    var rst, splits, mod, base;
    length = length || 2;
    decimal = decimal || '.';

    rst = Number(num);

    if ($.isNumber(rst) && !isNaN(rst)) {
      rst = String(rst);
      splits = rst.split('.');
      base = splits[0];

      if (thousand) {
        mod = base.length > 3 ? base.length % 3 : 0;
        rst = (mod ? base.substring(0, mod) + thousand : '') + base.substring(mod).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + decimal;
      } else {
        rst = base + decimal;
      }

      if (splits.length > 1) {
        rst += splits[1].substring(0, length);
      }

      var posDecimal = rst.indexOf('.');
      while (rst.length <= posDecimal + length) {
        rst += '0';
      }
    } else {
      rst = 0;
    }

    return $.toSafeString(rst);
  };

  /**
   * 对象扩展
   * 常用于从大对象中抽取出小对象
   * @target 目标对象
   * @source 源对象
   * @isAllString 是否将所有属性转化字符串
   * */
  $.objectExtend = function(target, source, isAllString) {
    var key;
    if (target && source) {
      for (key in target) {
        if (source[key] !== undefined) {
          target[key] = isAllString ? $.toSafeString(source[key]) : source[key];
        }
      }
    }
  };

  /**
   * 延迟执行器
   * 常用于UI操作
   * */
  $.delay = function(func, wait) {
    var args = slice.call(arguments, 2);

    if (!$.isFunction(func)) {
      return;
    }

    wait = wait || 25;

    var num = setTimeout(function() {
      clearTimeout(num);
      return func.apply(null, args);
    }, wait);
  };

  /**
   * 你懂得
   * */
  $.stopEvt = function(evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  /**
   * guid
   * */
  $.guid = function(key) {
    key = $.toString(key) || '';
    return key + _guid++;
  };

  function _stopScorll(evt) {
    $.stopEvt(evt);
  }

  $.stopScorll = function() {
    $(document).on('touchmove', _stopScorll);
  };

  $.enableScroll = function() {
    $(document).off('touchmove', _stopScorll);
  };

  $.safeEach = function(data, callback) {
    if (!data || ($.isArray(data) && data.length === 0)) {
      return;
    }

    $.each(data, callback);
  }

  /*
   * for $.fn
   */

  $.fn.disable = function() {
    $.disable(this);
  };

  $.fn.enable = function() {
    $.enable(this);
  };

  $.fn.isEnable = function() {
    return $.isEnable(this);
  };

  /**
   * 判断横竖屏切换
   * */
  $.fn.orientation = function(callback) {
    $(this).on(ORIENTATION, function(evt) {
      if ($.isFunction(callback)) {
        callback(ORIENTATION, evt);
      }
    });
  };

  /***
   * class 样式开关
   */
  $.fn.triggerCalss = function(className) {
    if (this.hasClass(className)) {
      this.removeClass(className);
    } else {
      this.addClass(className);
    }
  };

  /**
   * 防重复提交事件
   */
  $.fn.safeTap = function(callback, isStop) {
    if (!$.isFunction(callback)) {
      return;
    }

    if (false === (1 in arguments)) {
      isStop = true;
    }

    this.tap(function(evt) {
      var $this = $(this);
      if ($this.isEnable()) {
        $this.disable();

        if (callback($this, evt)) {
          $this.enabled();
        }
      }

      if (isStop) {
        $.stopEvt(evt);
      }
    });
  };

}(window.Zepto));
