<template>
  <header class="header">
    <div class="header-left header-block">
    </div>
    <div class="header-middle header-block pan-toggles">
      <span
        class="pan-toggle"
        :class="{visible: isVisible('html')}"
        @click="togglePan('html')">
        HTML
      </span>
      <span
        class="pan-toggle"
        :class="{visible: isVisible('css')}"
        @click="togglePan('css')">
        CSS
      </span>
      <span
        class="pan-toggle"
        :class="{visible: isVisible('js')}"
        @click="togglePan('js')">
        JS
      </span>
      <span
        class="pan-toggle disabled"
        :class="{visible: isVisible('console')}">
        Console
      </span>
      <span
        class="pan-toggle"
        :class="{visible: isVisible('output')}"
        @click="togglePan('output')">
        Output
      </span>
    </div>
    <div class="header-right header-block">
      <Button
        class="header-right-item"
        plain
        @click="runCode">
        Run
      </Button>
    </div>
  </header>
</template>

<script>
  import Data from '@/data'
  import { inIframe } from '@/utils'

  export default {
    data() {
      return {
        version: process.env.VERSION,
        latestCommit: process.env.LATEST_COMMIT,
        inIframe,
        url: window.location.href
      }
    },
    methods: {
      runCode() {
        Data.$emit('run')
      },
      togglePan(panName) {
        Data.$emit('togglePan', panName)
      },
      isVisible(panName) {
        return Data.visiblePans.indexOf(panName) !== -1
      }
    }
  }
</script>

<style lang="stylus" scoped>
.header
  box-sizing: border-box
  height: 40px
  border-bottom: 1px solid #bfbfbf
  background-color: white
  display: flex
  align-items: center
  padding: 0 10px
  justify-content: space-between

.header-block
  flex: 1
  width: 0

.header-left
  display: flex
  justify-content: flex-start
  .header-left-item
    margin-right: 10px

.el-dropdown-menu__item > label, .el-dropdown-menu__item > button
  width: 100%
  display: none

.el-dropdown-menu__item > button
  text-align: left

@media screen and (max-width: 992px)
  .el-dropdown-menu__item > label
    display: inline-block

@media screen and (max-width: 576px)
  .el-dropdown-menu__item > button
    display: inline-block

.header-right
  display: flex
  justify-content: flex-end
  align-items: center
  .header-right-item
    margin-left: 10px
    padding: 7px 15px
    font-size: 12px
    border-radius: 3px
    display: inline-block
    line-height: 1
    white-space: nowrap
    cursor: pointer
    background: #FFF
    border: 1px solid #DCDFE6
    color: #606266
    -webkit-appearance: none
    text-align: center
    box-sizing: border-box
    outline: 0
    margin: 0
    transition: .1s
    font-weight: 500

  @media screen and (max-width: 992px)
    > label
      display: none

  @media screen and (max-width: 576px)
    > button
      display: none

.changelog-indicator
  display: flex
  align-items: center
  height: 28px

.pan-toggles
  display: flex
  justify-content: center
  height: 100%

  .pan-toggle
    display: flex
    align-items: center
    height: 100%
    border-left: 1px solid #e2e2e2
    border-right: @border-left
    position: relative
    padding: 0 10px
    cursor: pointer
    user-select: none

    &.disabled
      cursor not-allowed

    &:not(:first-child)
      margin-left: -1px

    &:hover
      &:not(.visible)
        background-color: #f9f9f9

    &.visible
      background-color: #EBF3FF

.editor-save-status
  display: flex
  align-items: center
  color: #607d8b
  .svg-icon
    display: flex
    align-items: center
    margin-right: 5px
  >>> svg
    fill: @color
    width: 16px
    height: @width

@media screen and (max-width: 768px)
  .header-left
    display: none
  .pan-toggles
    justify-content: left

</style>
