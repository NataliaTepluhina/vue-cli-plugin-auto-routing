module.exports = api => {
  api.describeTask({
    match: /greet/,
    description: 'Prints a greeting in the console',
    link: 'https://cli.vuejs.org/dev-guide/plugin-dev.html#core-concepts',
    prompts: [
      {
        name: 'name',
        type: 'input',
        description: 'Specify a name for greeting'
      }
    ]
  });

  api.describeConfig({
    id: 'my-config',
    name: 'Greeting color',
    description: 'This parameter defines the color of the greeting printed',
    files: {
      myConfig: {
        js: ['myConfig.js']
      }
    },
    onRead: ({ data }) => ({
      prompts: [
        {
          name: `color`,
          type: 'input',
          message: 'Define the color for greeting message',
          default: data.myConfig.color
        }
      ]
    }),
    async onWrite({ api, prompts }) {
      const result = {};
      for (const prompt of prompts) {
        result[`${prompt.id}`] = await api.getAnswer(prompt.id);
      }
      api.setData('myConfig', result);
    }
  });
};
