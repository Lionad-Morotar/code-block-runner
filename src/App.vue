<template>
  <div id="app">
    <Editor
      :visiblePans="['js', 'output']"
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