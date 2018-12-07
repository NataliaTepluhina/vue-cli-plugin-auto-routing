module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'vue-router': '^3.0.2',
      'vue-router-layout': '^0.1.2'
    },
    devDependencies: {
      'vue-auto-routing': '^0.3.0'
    },
    scripts: {
      greet: 'vue-cli-service greet'
    }
  });

  api.onCreateComplete(() => {
    // inject to main.js
    const fs = require('fs');

    // get content
    let contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g);
    const renderIndex = lines.findIndex(line => line.match(/render/));
    lines[renderIndex] += `\n  router,`

    // modify app
    contentMain = lines.join('\n');
    fs.writeFileSync(api.entryFile, contentMain, { encoding: 'utf-8' });
  });

  api.injectImports(api.entryFile, `import router from './router'`)

  if (options.addExampleRoutes) {
    api.render('./template', {
      ...options
    });
  }

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
