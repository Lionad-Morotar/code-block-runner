const useCache = fn => {
    const cache = {}
    return (...args) => fn(cache, ...args)
}

const loadResource = useCache((cache, url, handle) => {
    let callback
    const listener = new Promise(resolve => (callback = resolve))
    const item = cache[url] || (cache[url] = { state: 'init', toNotify: [callback] })

    function notify() {
        item.toNotify.map(cb => cb())
    }

    if (item.state === 'queue') {
        item.toNotify.push(callback)
    }
    if (item.state === 'done') {
        callback()
    }
    if (item.state === 'init') {
        cache[url].state = 'queue'
        const cb = () => {
            cache[url].state = 'done'
            notify()
        }
        handle(cb)
    }

    return listener
})

const loadScriptFromURL = url => {
    return loadResource(url, cb => {
        const script = document.createElement('script')
        script.src = url
        document.body.appendChild(script)
        script.onload = () => {
            console.log('script loaded')
            cb()
        }
    })
}

const loadCSSFromURL = url => {
    return loadResource(url, cb => {
        const style = document.createElement('link')
        style.rel = 'stylesheet'
        style.href = url
        document.head.appendChild(style)
        style.onload = () => {
            console.log('style loaded')
            cb()
        }
    })
}

const utils = {
    loadScriptFromURL,
    loadCSSFromURL
}
module.exports = utils
