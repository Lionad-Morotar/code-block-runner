export default function(el, cm, opts = {}) {
    const editor = cm.fromTextArea(el, {
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchTags: { bothTags: true },
        matchBrackets: true,
        ...opts
    })

    return editor
}
