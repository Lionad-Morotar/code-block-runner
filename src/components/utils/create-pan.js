import _CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
// import 'codemirror/addon/selection/active-line'
// import 'codemirror/addon/edit/matchtags'
// import 'codemirror/addon/edit/matchbrackets'
// import 'codemirror/addon/edit/closebrackets'
// import 'codemirror/addon/edit/closetag'

import createEditor from './create-editor'
import panPosition from './pan-position'
import Get from './get-parent-attrs'

// eslint-disable-next-line no-unused-vars
import utils from '../../utils'

async function loadCodeMirror() {
    // ! 出现了 indent 报错，暂时去掉语言 mode
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/addon/selection/active-line.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/css/css.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/htmlmixed/htmlmixed.min.js')
    // await utils.loadScriptFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/mode/jsx/jsx.min.js')/
}
function loadCodeMirrorCSS() {
    utils.loadCSSFromURL('https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.css')
}

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
                return Get(this).$store.activePan === name
            },
            code() {
                return Get(this).$store.code[name]
            }
        },
        watch: {
            isVisible() {
                this.editor.refresh()
            }
        },
        async mounted() {
            loadCodeMirrorCSS()
            await loadCodeMirror()

            const CodeMirror = window.CodeMirror || _CodeMirror
            this.editor = createEditor(this.$refs.editor, CodeMirror, {
                ...editor
            })
            this.editor.on('change', e => {
                Get(this).$store.code[name].code = e.getValue()
            })
            this.editor.on('focus', () => {
                if (this.activePan !== name && Get(this).$store.visiblePans.indexOf(name) > -1) {
                    this.setActivePan()
                }
            })
            this.style = panPosition(Get(this).$store.visiblePans, name)

            Get(this).$store.$on('visiblePans-change', val => {
                this.style = panPosition(val, name)
            })
            Get(this).$store.$on('focus-editor', () => {
                this.editor.focus()
            })
            Get(this).$store.$on([`refresh-${name}-editor`, 'refresh-all'], () => {
                this.editor.setValue(Get(this).$store.code[name].code)
                this.editor.refresh()
            })
        },
        methods: {
            setActivePan() {
                Get(this).$store.activePan = name
            }
        },
        components: {
            ...components
        }
    }
}
