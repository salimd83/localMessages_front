const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addSassResource(config.module.rule('scss').oneOf(type)))
  },
};

function addSassResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/_vars.scss'),
      ],
    })
}