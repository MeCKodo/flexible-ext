;(function(win, lib) {
      var doc = win.document;
      var docEl = doc.documentElement;
      var metaEl = doc.querySelector('meta[name="viewport"]');
      var tid;
      var flexible = lib.flexible || (lib.flexible = {});

      var ua = navigator.userAgent;
      var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
      var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
      var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
      var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
      var dpr = win.devicePixelRatio || 1;
      if (!isIos && !(matches && matches[1] >= 537) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
      } else {
        if (dpr >= 3 && (!dpr || dpr >= 3)) {
          dpr = 3;
        } else if (dpr >= 2 && (!dpr || dpr >= 2)){
          dpr = 2;
        } else {
          dpr = 1;
        }
      }
      var scale = 1 / dpr;
      docEl.setAttribute('data-dpr', dpr);
      if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl);
        } else {
          var wrap = doc.createElement('div');
          wrap.appendChild(metaEl);
          doc.write(wrap.innerHTML);
        }
      }
      function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
          width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        var realitySize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
        if (rem !== realitySize) {
          rem = rem * rem / realitySize;
          docEl.style.fontSize = rem + 'px';
        }
        flexible.rem = win.rem = rem;
      }

      win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }, false);
      win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      }, false);

      refreshRem();

      flexible.dpr = win.dpr = dpr;
      flexible.refreshRem = refreshRem;
      flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
        }
        return val;
      }
      flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
        }
        return val;
      }

    })(window, window['lib'] || (window['lib'] = {}));
