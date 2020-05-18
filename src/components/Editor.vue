<template>
  <div class="page">
    <HomeHeader />
    <compiled-code-dialog highlight="htmlmixed" type="html" />
    <compiled-code-dialog highlight="css" type="css" />
    <compiled-code-dialog highlight="javascript" type="js" />
    <div class="pans">
      <HTMLPan class="pan" v-show="isVisible('html')" />
      <CSSPan class="pan" v-show="isVisible('css')" />
      <JSPan class="pan" v-show="isVisible('js')" />
      <!-- <console-pan class="pan" v-show="isVisible('console')" />  -->
      <OutputPan class="pan" v-show="isVisible('output')" />
    </div>

  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import CompiledCodeDialog from '@/components/CompiledCodeDialog.vue'
import HTMLPan from '@/components/HTMLPan.vue'
import CSSPan from '@/components/CSSPan.vue'
import JSPan from '@/components/JSPan.vue'
import OutputPan from '@/components/OutputPan.vue'
// import ConsolePan from '@/components/ConsolePan.vue'

import Data from '../data'

export default {
  name: 'editor-page',
  components: {
    HomeHeader,
    CompiledCodeDialog,
    HTMLPan,
    CSSPan,
    JSPan,
    OutputPan,
    // 'console-pan': ConsolePan,
  },
  methods: {
    isVisible(panName) {
      return Data.visiblePans.indexOf(panName) !== -1
    }
  }
}
</script>

<style src="codemirror/lib/codemirror.css"></style>

<style src="codemirror/addon/fold/foldgutter.css"></style>

<style lang="stylus" scoped>
.pans
  height: calc(100% - 40px)
  display: flex
  position: relative

.pan
  background-color: #f9f9f9
  position: absolute
  top: 0
  bottom: 0
  overflow: auto
  &.active-pan
    background-color: white
</style>

<style lang="stylus">
.CodeMirror
  height: calc(100% - 40px)
  background-color: transparent

.CodeMirror-gutters
  background-color: transparent
  border-right: none

.pan-head
  height: 40px
  padding: 0 10px
  font-size: 14px
  display: flex
  justify-content: space-between
  align-items: center
  svg.svg-icon
    margin-left: 5px
    cursor: pointer
    width: 14px
    height: @width
    color: #666
    outline: none
    &:hover
      color: #000

.pans.resizing
  cursor: ew-resize
  .pan-resizer
    cursor: ew-resize

.page.readonly
  .CodeMirror-cursor
    display: none !important

.cf-wrapper
  height: 40px
  line-height: 40px !important
  z-index: 9999 !important
  padding: 0 10px !important

.sponsor
  height: 40px
  line-height 40px
  border-top: 1px solid #ccc
  text-align: center
  padding: 0 10px
  a
    text-decoration: none
    &:hover
      text-decoration: underline
</style>
