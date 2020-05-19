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
    .map(key => {
      return `${key}="${attrs[key]}"`
    })
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
  },
  methods: {
    async run() {
      const headStyle = createElement('style')(Data.code.css.code)
      
      // ! would fail
      // const proxyConsoleFn = function proxyConsoleFn() {
      //   console.log('Data : ', Data)
      //   const log = console.log
      //   console.log = function (...args) {
      //     Data.logs.push({
      //       message: args
      //     })
      //     log(...args)
      //   }
      // }.bind(Data)

      // ! tricky way
      window._Data = Data
      const proxyConsoleFn = () => {
        (0, eval)(`
          const logs = this.parent._Data.logs
          const log = console.log
          console.log = function (...args) {
          logs.push({
            message: args.toString()
          })
          log(...args)
        }
        `)
      }

      const proxyConsole = createElement('script')(`(${proxyConsoleFn.toString()})()`)
      console.log('proxyConsole : ', proxyConsole)
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
