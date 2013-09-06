# Set starting DOM

window.__currentSelector = 'body'
window.__currentDOM = document.body

# Internals

getIndexFromDOM = (dom) -> (Array::slice.call dom.parentNode.children).indexOf dom

selectorFromDOM = (dom) ->
    if dom is document.body
        return 'body'
    else
        return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')'

# APIs

window.__defineGetter__ 'pwd', -> window.__currentSelector

window.__defineGetter__ 'ls', -> window.__currentDOM.querySelectorAll('*')

window.cd = (selector) ->
    return unless selector
    if selector is '..'
        window.__currentDOM = window.__currentDOM.parentNode
    else
        newDOM = window.__currentDOM.querySelector(selector)
        if newDOM
            window.__currentDOM = newDOM
            window.__currentSelector = selectorFromDOM newDOM
        else
            console.warn('Could not find', selector)
        return window.__currentSelector