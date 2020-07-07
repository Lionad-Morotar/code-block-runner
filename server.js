const Vue = require('vue')
const server = require('express')()

const CodeBlock = require('./dist/main.umd.js')

const template = require('fs').readFileSync('./public/server.template.html', 'utf-8')

const renderer = require('vue-server-renderer').createRenderer({
  template,
})

const context = {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
}

server.get('/index', (req, res) => {
  res.setHeader("Content-type", "text/html;charset=UTF-8"); 

  const app = new Vue({
    data: {
      url: req.url
    },
    components: {
        CodeBlock,
    },
    template: `<div>访问的 URL 是： {{ url }}</div><CodeBlock />`,
  })

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      console.error(err)
      return
    }
    res.end(html)
  })
})

server.listen(8888)