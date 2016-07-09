/**
 * Testing configuration
 *
 * Setup:
 *  - test runner: karma
 *  - assertions: expect (https://github.com/mjackson/expect)
 */
const webpackConfig = require('./webpack.config');
const testGlob = 'react_django_users/static/react_django_users/**/__tests__/**/*.js';
const srcGlob = 'react_django_users/static/react_django_users/@(actions|components|containers|reducers)/**/*.js';


module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      testGlob,
      srcGlob,
    ],
    preprocessors: {
      // add webpack as a preprocessor
      [testGlob]: ['webpack', 'sourcemap'],
      [srcGlob]: ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-coverage',
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'react_django_users/static/react_django_users/dist//reports/coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'json', subdir: '.'},
        {type: 'text-summary'},
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
