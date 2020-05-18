<template>
  <modal
    :isOpen="open"
    class="compiled-code-dialog">
    <h2 class="modal-title">
      Compiled with {{ transformerName }}</h2>
    <highlight :mode="highlight" />
  </modal>
</template>

<script>
import Modal from 'vue-slim-modal'
import Highlight from './Highlight'
// import Data from '../data'

import { getHumanizedTransformerName } from '@/utils'

export default {
  name: 'compiled-code-dialog',
  props: {
    type: String,
    highlight: String
  },
  data() {
    return {
      open: false
    }
  },
  components: {
    Modal,
    Highlight,
  },
  computed: {
    transformerName() {
      return getHumanizedTransformerName(this.type)
    }
  },
}
</script>

<style lang="stylus" scoped>
.compiled-code-dialog
  padding: 0
  width: 50%
  background: white
  top: 41px
  border-radius: 3px

.modal-title
  margin: 0
  padding: 15px 0
  font-weight: 500
  font-size: 1rem
  display: flex
  align-items: center
  justify-content: center
  border-bottom: 1px solid #e2e2e2

.svg-icon
  margin-right: 8px
  width: 16px
  height: @width
</style>
