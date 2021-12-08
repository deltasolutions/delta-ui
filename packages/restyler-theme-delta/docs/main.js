module.exports = {
  stories: ['./stories/*.stories.mdx', './stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: 'webpack5'
  }
  // webpackFinal: async config => {
  //   console.log('!');
  //   config.module.rules.push({
  //     test: /\.mjs$/,
  //     include: /node_modules/,
  //     type: 'javascript/auto'
  //   });
  //   return config;
  // }
};
