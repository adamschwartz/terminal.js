(function() {
  var getIndexFromDOM, removeDOM, selectorFromDOM, toArray;
  window.__currentSelector = 'body';
  window.__currentDOM = document.body;
  toArray = function(thing) {
    return Array.prototype.slice.call(thing);
  };
  getIndexFromDOM = function(dom) {
    return (toArray(dom.parentNode.children)).indexOf(dom);
  };
  selectorFromDOM = function(dom) {
    if (dom === document.documentElement) {
      return 'html';
    }
    return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')';
  };
  removeDOM = function(dom) {
    return dom.parentNode.removeChild(dom);
  };
  window.__defineGetter__('pwd', function() {
    console.log(window.__currentSelector);
    return window.__currentDOM;
  });
  window.__defineGetter__('ls', function() {
    var children;
    children = window.__currentDOM.children;
    console.log((toArray(children)).map(function(d) {
      return d.tagName.toLowerCase();
    }).join('\n'));
    return children;
  });
  window.cd = function(selector) {
    var newDOM;
    if (selector == null) {
      selector = "*";
    }
    if (selector === 'html') {
      newDOM = document.documentElement;
    } else if (selector === 'body') {
      newDOM = document.body;
    } else if (selector === '..') {
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
    console.log(window.__currentSelector);
    return window.__currentDOM;
  };
  window.rm = function(thing) {
    if (typeof thing === 'string') {
      thing = window.__currentDOM.querySelectorAll(thing);
    }
    if (thing.length) {
      toArray(thing).forEach(function(dom) {
        return removeDOM(dom);
      });
    } else {
      removeDOM(thing);
    }
    return window.__currentDOM;
  };
}).call(this);
