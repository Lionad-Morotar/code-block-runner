import _CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
// import 'codemirror/addon/selection/active-line'
// import 'codemirror/addon/edit/matchtags'
// import 'codemirror/addon/edit/matchbrackets'
// import 'codemirror/addon/edit/closebrackets'
// import 'codemirror/addon/edit/closetag'

const CodeMirror = window.CodeMirror || _CodeMirror

export default function(el, opts = {}) {
    // eslint-disable-next-line no-undef
    const editor = CodeMirror.fromTextArea(el, {
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchTags: { bothTags: true },
        matchBrackets: true,
        ...opts
    })

    return editor
}
