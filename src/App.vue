<template>
  <div id="app">
    <Editor />
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
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

html, body, #app, .page
  height: 100%

body
  background-color: #f9f9f9
  margin: 0
  font-size: 14px
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif

*
  box-sizing: border-box

pre
  padding: 16px
  overflow: auto
  font-size: 85%
  line-height: 1.45
  background-color: #f6f8fa
  border-radius: 3px

pre > code
  padding: 0
  margin: 0
  font-size: 100%
  word-break: normal
  white-space: pre
  background: transparent
  border: 0

.el-dropdown-link
  cursor: pointer
  user-select: none

#nprogress
  z-index: 9999
  position: relative

.el-dropdown-menu
  .fake-anchor
    color: #333
    text-decoration: none
    align-items: center
    display: flex
    width: 100%
    svg
      margin-right: 10px
      width: 16px
      height: @width
      color: #666

.el-badge
  z-index: 1000

#HW_frame_cont.HW_visible
  z-index: 9999

.update-notifier
  .el-notification__content
    text-align: left

/** Vue-Slim-Modal */
.modal-overlay, .modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-overlay {
  z-index: 9990;
  background: black;
  opacity: .4;
}

.modal-wrapper {
  z-index: 9999;
  overflow: auto;
}

.modal {
  position: absolute;
  top: 100px;
  left: 50%;
  max-width: 80%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: white;
  overflow: auto;
  z-index: 9999;
  margin-bottom: 20px;
}

.modal.modal__center {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

</style>
