import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import Data from '@/data'

import PanResizer from '@/components/PanResizer.vue'
import createEditor from '@/utils/create-editor'
import panPosition from '@/utils/pan-position'

export default ({ name, editor, components } = {}) => {
  return {
    name: `${name}-pan`,
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
        return Data.activePan === name
      },
      code() {
        return Data.code[name]
      }
    },
    watch: {
      isVisible() {
        this.editor.refresh()
      }
    },
    mounted() {
      this.editor = createEditor(this.$refs.editor, {
        ...editor
      })
      this.editor.on('change', e => {
        Data.code[name].code = e.getValue()
      })
      this.editor.on('focus', () => {
        if (this.activePan !== name && Data.visiblePans.indexOf(name) > -1) {
          this.setActivePan()
        }
      })
      this.style = panPosition(Data.visiblePans, name)
      Data.$on('visiblePans-change', val => {
        this.style = panPosition(val, name)
      })
      Data.$on('focus-editor', () => {
        this.editor.focus()
      })
      Data.$on([`refresh-${name}-editor`, 'refresh-all'], () => {
        this.editor.setValue(Data.code[name].code)
        this.editor.refresh()
      })
      Data.$on(`set-${name}-pan-style`, style => {
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
      Dropdown,
      DropdownMenu,
      DropdownItem,
      PanResizer,
      ...components
    }
  }
}
