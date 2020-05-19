<template>
  <div
    class="output-pan"
    :class="{ 'active-pan': isActivePan }"
    @click="setActivePan('output')"
    :style="style">
    <div class="pan-head">
      Output
    </div>
    <div class="output-iframe" id="output-iframe">
      <div id="output-iframe-holder"></div>
    </div>
  </div>
</template>

<script>
import Data from '@/data'
import createIframe from '@/utils/iframe'
import panPosition from '@/utils/pan-position'
import proxyConsoleFn from '!!raw-loader!@/utils/proxy-console'

const sandboxAttributes = [
  'allow-modals',
  'allow-forms',
  'allow-pointer-lock',
  'allow-popups',
  'allow-same-origin',
  'allow-scripts'
]

const createElement = tag => (content = '', attrs = {}) => {
  attrs = Object.keys(attrs)
    .map(key => `${key}="${attrs[key]}"`)
    .join(' ')
  return `<${tag} ${attrs}>${content}</${tag}>`
}

export default {
  name: 'output-pan',
  data() {
    return {
      style: {}
    }
  },
  computed: {
    isActivePan() {
      return Data.activePan === 'output'
    },
  },
  mounted() {
    this.iframe = createIframe({
      el: document.getElementById('output-iframe-holder'),
      sandboxAttributes
    })
    this.style = panPosition(Data.visiblePans, 'output')
      Data.$on('visiblePans-change', val => {
        this.style = panPosition(val, 'output')
      })
    Data.$on('run', () => this.run())
    Data.$on(`set-output-pan-style`, style => {
      this.style = {
        ...this.style,
        ...style
      }
    })
    window.addEventListener('message', this.listenIframe)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.listenIframe)
  },
  methods: {
    async listenIframe({ data = {} }) {
      switch (data.type) {
        case 'iframe-error':
          Data.logs.push({
            type: 'error',
            message: data.message
          })
          break
        case 'console':
          Data.logs.push({
            type: data.method,
            message: data.args.map(x => JSON.stringify ? JSON.stringify(x) : x).join(' ')
          })
          break
      }
    },
    async run() {
      const headStyle = createElement('style')(Data.code.css.code)
      const proxyConsole = createElement('script')(proxyConsoleFn)
      const script = createElement('script')(Data.code.js.code)
      const html = Data.code.html.code

      Data.logs.splice(0, Data.logs.length)
      this.iframe.setHTML({
        head: headStyle + proxyConsole + script,
        body: html
      })
    },
    setActivePan(panName) {
      Data.activePan = panName
    }
  }
}
</script>

<style lang="stylus" scoped>
.output-pan
  overflow: hidden

#output-iframe
  position: relative
  width: 100%
  height: calc(100% - 40px)
  overflow: hidden

  &.disable-mouse-events
    pointer-events: none
</style>
