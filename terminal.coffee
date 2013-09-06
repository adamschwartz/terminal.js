# Set starting DOM

window.__currentSelector = 'body'
window.__currentDOM = document.body

# Internals

toArray = (thing) -> Array::slice.call thing

getIndexFromDOM = (dom) -> (toArray dom.parentNode.children).indexOf dom

selectorFromDOM = (dom) ->
    return 'html' if dom is document.documentElement
    return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')'

removeDOM = (dom) -> dom.parentNode.removeChild dom

# APIs

window.__defineGetter__ 'pwd', ->
    console.log window.__currentSelector
    window.__currentDOM

window.__defineGetter__ 'ls', ->
    children = window.__currentDOM.children
    console.log (toArray children).map((d) -> d.tagName.toLowerCase()).join('\n')
    children

window.cd = (selector = "*") ->
    if selector is 'html'
        newDOM = document.documentElement
    else if selector is '..'
        newDOM = window.__currentDOM.parentNode
    else
        newDOM = window.__currentDOM.querySelector selector

    if newDOM
        window.__currentDOM = newDOM
        window.__currentSelector = selectorFromDOM newDOM
    else
        console.warn 'Could not find', selector

    console.log window.__currentSelector
    window.__currentDOM

window.rm = (thing) ->
    thing = window.__currentDOM.querySelectorAll thing if typeof thing is 'string'

    if thing.length
        toArray(thing).forEach (dom) -> removeDOM dom
    else
        removeDOM thing

    window.__currentDOM