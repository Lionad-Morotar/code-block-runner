/** Utils | Common Functions */
const loadScriptFromURL = (() => {
    const cache = {}
    return function(url) {
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
            const script = document.createElement('script')
            script.src = url
            document.body.appendChild(script)

            script.onload = () => {
                cache[url].state = 'done'
                notify()
            }
        }

        return listener
    }
})()

const utils = {
    loadScriptFromURL,
}
module.exports = utils
