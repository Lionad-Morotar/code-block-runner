export const getHumanizedTransformerName = transformer => {
  const names = {
    html: 'HTML',
    js: 'JavaScript',
    css: 'CSS',
  }

  return names[transformer] || transformer
}

export const inIframe = window.self !== window.top