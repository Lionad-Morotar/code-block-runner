module.exports = {
    productionSourceMap: false,
    css: {
        // For SSR Component
        extract: true
    },
    chainWebpack(config) {
        config.resolveLoader.moduleExtensions
            .add('D:/@Github/code-block-run/src/components/utils/temp/code.js')
            .add('D:/@Github/code-block-run/src/components/utils/temp/html.js')
    }
}