const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-knobs'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [path.resolve('src')],
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false }]],
      },
    });
    config.resolve.extensions.push('.js', '.jsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, '../src/'),
    };
    return config;
  },
};
