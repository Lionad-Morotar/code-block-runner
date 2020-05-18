export const getHumanizedTransformerName = transformer => {
  const names = {
    html: 'HTML',
    pug: 'Pug',
    markdown: 'Markdown',
    js: 'JavaScript',
    'vue-jsx': 'Vue JSX',
    babel: 'Babel',
    jsx: 'JSX', // @deprecated, use "babel"
    css: 'CSS',
    reason: 'Reason',
    'coffeescript-2': 'CoffeeScript 2',
    cssnext: 'cssnext',
    less: 'LESS',
    typescript: 'TypeScript',
    sass: 'SASS',
    scss: 'SCSS',
    rust: 'Rust',
    stylus: 'Stylus'
  }

  return names[transformer] || transformer
}

export const inIframe = window.self !== window.top