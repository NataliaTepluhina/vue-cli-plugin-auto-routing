module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router-layout': '^0.1.2'
    },
    devDependencies: {
      'vue-auto-routing': '^0.3.0'
    },
    scripts: {
      greet: 'vue-cli-service greet'
    }
  });

  api.render('./template');

  if (api.invoking) {
    api.postProcessFiles(files => {
      Object.keys(files).forEach(name => {
        if (/^src\/views[/$]/.test(name)) {
          delete files[name];
        }
      });
    });

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles(files => {
        delete files['src/router.ts'];
      });

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert');
      convertFiles(api);
    }
  }
};
