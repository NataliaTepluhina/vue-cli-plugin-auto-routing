module.exports = (api, options) => {
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

  const routerLine = `\nimport router from './router';`;

  api.onCreateComplete(() => {
    // inject to main.js
    const fs = require('fs');
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
    const mainPath = api.resolve(`./src/main.${ext}`);

    // get content
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();

    // inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += routerLine;

    // modify app
    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });

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
