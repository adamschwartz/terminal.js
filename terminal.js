(function() {
  var getIndexFromDOM, selectorFromDOM;
  window.__currentSelector = 'body';
  window.__currentDOM = document.body;
  getIndexFromDOM = function(dom) {
    return (Array.prototype.slice.call(dom.parentNode.children)).indexOf(dom);
  };
  selectorFromDOM = function(dom) {
    if (dom === document.body) {
      return 'body';
    } else {
      return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')';
    }
  };
  window.__defineGetter__('pwd', function() {
    return window.__currentSelector;
  });
  window.__defineGetter__('ls', function() {
    return window.__currentDOM.querySelectorAll('*');
  });
  window.cd = function(selector) {
    var newDOM;
    if (!selector) {
      return;
    }
    if (selector === '..') {
      return window.__currentDOM = window.__currentDOM.parentNode;
    } else {
      newDOM = window.__currentDOM.querySelector(selector);
      if (newDOM) {
        window.__currentDOM = newDOM;
        window.__currentSelector = selectorFromDOM(newDOM);
      } else {
        console.warn('Could not find', selector);
      }
      return window.__currentSelector;
    }
  };
}).call(this);
