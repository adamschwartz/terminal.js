(function() {
  var currentDOM, currentSelector, getIndexFromDOM, removeDOM, selectorFromDOM, toArray;
  currentSelector = 'body';
  currentDOM = document.body;
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
    console.log(currentSelector);
    return currentDOM;
  });
  window.__defineGetter__('ls', function() {
    var children;
    children = currentDOM.children;
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
    } else if (selector === '..') {
      newDOM = currentDOM.parentNode;
    } else {
      newDOM = currentDOM.querySelector(selector);
    }
    if (newDOM) {
      currentDOM = newDOM;
      currentSelector = selectorFromDOM(newDOM);
    } else {
      console.warn('Could not find', selector);
    }
    console.log(currentSelector);
    return currentDOM;
  };
  window.rm = function(thing) {
    if (typeof thing === 'string') {
      thing = currentDOM.querySelectorAll(thing);
    }
    if (thing.length) {
      toArray(thing).forEach(function(dom) {
        return removeDOM(dom);
      });
    } else {
      removeDOM(thing);
    }
    return currentDOM;
  };
}).call(this);
