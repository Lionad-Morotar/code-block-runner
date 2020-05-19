<template>
  <div
    class="console-pan"
    :class="{'active-pan': isActivePan}"
    @click="setActivePan('console')"
    :style="style">
    <div class="pan-head">
      Console
    </div>
    <div class="console-logs" ref="console">
      <div
        class="console-log"
        v-for="(log, index) in logs"
        :key="index"
        :class="log.type"
        v-html="log.message">
      </div>
    </div>
    <PanResizer pan="console" :enable="enableResizer" />
  </div>
</template>

<script>
import panPosition from '@/utils/pan-position'
import PanResizer from '@/components/PanResizer.vue'
import Data from '@/data'

export default {
  data() {
    return {
      style: {}
    }
  },
  computed: {
    enableResizer() {
      return true
    },
    isActivePan() {
      return Data.activePan === 'console'
    },
    logs() {
      return Data.logs
    }
  },
  mounted() {
    Data.$on('visiblePans-change', val => {
      this.style = panPosition(val, 'console')
    }),
    Data.$on(`set-console-pan-style`, style => {
      this.style = {
        ...this.style,
        ...style
      }
    })
  },
  methods: {
    setActivePan() {
      Data.activePan = name
    }
  },
  components: {
    PanResizer,
  },
}
</script>

<style lang="stylus" scoped>
.console-logs
  height: calc(100% - 40px)
  overflow: auto

.console-log
  white-space: pre
  font-size: 13px
  padding: 10px
  border-bottom: 1px solid #eee
  background: #fefefe

  &:first-child
    border-top: 1px solid #eee
    
  &.warn
    background: #FEFED4
  &.error
    background: #FED4D4

.console-log-error
  color: red
</style>
