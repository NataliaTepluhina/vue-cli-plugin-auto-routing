const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')
const chalk = require('chalk')

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    // prettier-ignore
    webpackConfig
      .plugin('vue-auto-routing')
        .use(VueAutoRoutingPlugin, [
          {
            pages: 'src/pages',
            nested: true
          }
        ])
  })

  api.registerCommand(
    'greet',
    {
      description: 'Writes a greeting to the console',
      usage: 'vue-cli-service greet'
    },
    () => {
      console.log(chalk.bold(chalk.blue(`👋  Hello fellow developer`)))
    }
  )
}
