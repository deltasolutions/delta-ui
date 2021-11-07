const path = require('path/posix');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'nkeys.js': 'nkeys.js/nkeys.mjs',
      'nats.ws': 'nats.ws/nats.cjs'
    };
    return config;
  }
};
