<template>
  <div id="app">
    <Editor
      :visiblePans="['html', 'css', 'js', 'console', 'output']"
      :html="html"
      :css="css"
      :js="js"
    />
  </div>
</template>

<script>
import Editor from './components/Editor'
export default {
  name: 'app',
  components: {
    Editor
  },
  data() {
    return {
      html: require('!!raw-loader!./examples/simple/html.html').default,
      css: require('!!raw-loader!./examples/simple/css.css').default,
      js: require('!!raw-loader!./examples/simple/js.js').default,
    }
  }
}
</script>

<style lang="stylus">
html,body,#app
  margin 0
  padding 0
  height 100%
</style>