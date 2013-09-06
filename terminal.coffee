# Set starting DOM

window.__currentSelector = 'body'
window.__currentDOM = document.body

# Internals

getIndexFromDOM = (dom) -> (Array::slice.call dom.parentNode.children).indexOf dom

selectorFromDOM = (dom) ->
    return 'html' if dom is document.documentElement
    return 'body' if dom is document.body
    return selectorFromDOM(dom.parentNode) + ' > ' + dom.tagName.toLowerCase() + ':nth-child(' + getIndexFromDOM(dom) + ')'

# APIs

window.__defineGetter__ 'pwd', ->
    console.log window.__currentSelector
    window.__currentDOM

window.__defineGetter__ 'ls', ->
    children = window.__currentDOM.children
    console.log (Array::slice.call children).map((d) -> d.tagName.toLowerCase()).join('\n')
    children

window.cd = (selector = "*") ->
    if selector is '..'
        newDOM = window.__currentDOM.parentNode
    else
        newDOM = window.__currentDOM.querySelector selector

    if newDOM
        window.__currentDOM = newDOM
        window.__currentSelector = selectorFromDOM newDOM
    else
        console.warn 'Could not find', selector

    return window.__currentSelector