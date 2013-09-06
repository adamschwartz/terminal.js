(function() {
  var getIndexFromDOM, selectorFromDOM;
  window.__currentSelector = 'body';
  window.__currentDOM = document.body;
  getIndexFromDOM = function(dom) {
    return (Array.prototype.slice.call(dom.parentNode.children)).indexOf(dom);
  };
  selectorFromDOM = function(dom) {
    if (dom === document.documentElement) {
      return 'html';
    }
    if (dom === document.body) {
      return 'body';
    }
    return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')';
  };
  window.__defineGetter__('pwd', function() {
    console.log(window.__currentSelector);
    return window.__currentDOM;
  });
  window.__defineGetter__('ls', function() {
    var children;
    children = window.__currentDOM.children;
    console.log((Array.prototype.slice.call(children)).map(function(d) {
      return d.tagName.toLowerCase();
    }).join('\n'));
    return children;
  });
  window.cd = function(selector) {
    var newDOM;
    if (selector == null) {
      selector = "*";
    }
    if (selector === '..') {
      newDOM = window.__currentDOM.parentNode;
    } else {
      newDOM = window.__currentDOM.querySelector(selector);
    }
    if (newDOM) {
      window.__currentDOM = newDOM;
      window.__currentSelector = selectorFromDOM(newDOM);
    } else {
      console.warn('Could not find', selector);
    }
    return window.__currentSelector;
  };
}).call(this);
