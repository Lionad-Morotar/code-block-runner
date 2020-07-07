import CodeBlock from '../src/components/Editor.vue'

export default function (ctx) {
  const { Vue } = ctx
  Vue.component('CodeBlock', CodeBlock)
}
