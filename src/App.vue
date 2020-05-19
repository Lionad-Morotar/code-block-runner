<template>
  <div id="app">
    <Editor
      :visiblePans="['js', 'console']"
      js="function test() {console.log('asdf')}; test()"
    />
  </div>
</template>

<script>
import Editor from './components/Editor'
export default {
  name: 'app',
  components: {
    Editor
  }
}
</script>

<style lang="stylus">
html,body,#app
  margin 0
  padding 0
  height 100%
</style>