const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');
const chalk = require('chalk');

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
  });

  const OPTIONS = {
    '--name': 'specifies a name for greeting'
  };

  api.registerCommand(
    'greet',
    {
      description: 'Writes a greeting to the console',
      usage: 'vue-cli-service greet [options]',
      options: OPTIONS
    },
    args => {
      if (args.name) {
        console.log(`👋 Hello, ${args.name}!`);
      } else {
        console.log(`👋 Hello!`);
      }
    }
  );

  const { serve } = api.service.commands;

  const serveFn = serve.fn;

  serve.fn = (...args) => {
    return serveFn(...args).then(res => {
      if (res && res.url) {
        console.log(
          chalk.green(`Project is running now at`),
          chalk.blue(res.url)
        );
      }
    });
  };
};
