
import { Configuration } from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  entry: './src/index.tsx',
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/, loaders: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              // %%HASH%% replace with git hash
              ["search-and-replace", {
                "rules": [
                  { "search": "%%API%%", "replace": 'http://localhost:5000' }
                ]
              }]
            ]
          }
        }]
      },
      { test: /\.css/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\/icons\/.*\.svg$/,
        loader: 'svg-react-loader'
      },
      {
        test: /\/images\/.*\.svg|png|jpg/, loader: 'url-loader'
      },
      {
        test: /font\/.*\.(svg|eot|ttf|woff|woff2)/, loader: 'url-loader', options: {
          limit: false,
          outputPath: 'fonts'
        }
      },
    ]
  },

  plugins: [
    new HTMLPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin()
  ]
} as Configuration
