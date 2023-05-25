const path = require('path');

module.exports = {
  entry: './src/index.ts', // Your TypeScript entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match both .ts and .tsx files
        use: 'babel-loader', // Use the babel-loader to transpile TypeScript
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Add .tsx and .ts to the list of resolvable extensions
  },
  externals: {
    'cheerio': 'cheerio', // The global variable name for function A.
  },
};