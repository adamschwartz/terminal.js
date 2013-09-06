# Set starting DOM

currentSelector = 'body'
currentDOM = document.body

# Internals

toArray = (thing) -> Array::slice.call thing

getIndexFromDOM = (dom) -> (toArray dom.parentNode.children).indexOf dom

selectorFromDOM = (dom) ->
    return 'html' if dom is document.documentElement
    return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')'

removeDOM = (dom) -> dom.parentNode.removeChild dom

# APIs

window.__defineGetter__ 'clear', -> console.clear()

window.__defineGetter__ 'pwd', ->
    console.log currentSelector
    currentDOM

window.__defineGetter__ 'ls', ->
    children = currentDOM.children
    console.log (toArray children).map((d) -> d.tagName.toLowerCase()).join('\n')
    children

window.cd = (selector = "*") ->
    if selector is 'html'
        newDOM = document.documentElement
    else if selector is '..'
        newDOM = currentDOM.parentNode
    else
        newDOM = currentDOM.querySelector selector

    if newDOM
        currentDOM = newDOM
        currentSelector = selectorFromDOM newDOM
    else
        console.warn 'Could not find', selector

    console.log currentSelector
    currentDOM

window.rm = (thing) ->
    thing = currentDOM.querySelectorAll thing if typeof thing is 'string'

    if thing.length
        toArray(thing).forEach (dom) -> removeDOM dom
    else
        removeDOM thing

    currentDOM