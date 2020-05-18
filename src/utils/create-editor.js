import CodeMirror from 'codemirror'
// import 'codemirror/mode/htmlmixed/htmlmixed'
// import 'codemirror/mode/jsx/jsx'
// import 'codemirror/mode/css/css'
// import 'codemirror/addon/selection/active-line'
// import 'codemirror/addon/edit/matchtags'
// import 'codemirror/addon/edit/matchbrackets'
// import 'codemirror/addon/edit/closebrackets'
// import 'codemirror/addon/edit/closetag'
// import 'codemirror/addon/comment/comment'
// import 'codemirror/addon/fold/foldcode'
// import 'codemirror/addon/fold/foldgutter'
// import 'codemirror/addon/fold/brace-fold'
// import 'codemirror/addon/fold/xml-fold'
// import 'codemirror/addon/fold/markdown-fold'
// import 'codemirror/addon/fold/comment-fold'

export default function (el, opts = {}) {
  const editor = CodeMirror.fromTextArea(el, {
    lineNumbers: true,
    lineWrapping: true,
    // styleActiveLine: true,
    // matchTags: { bothTags: true },
    // matchBrackets: true,
    // foldGutter: true,
    // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    ...opts
  })
  return editor
}
