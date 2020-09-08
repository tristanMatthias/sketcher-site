
import { Configuration } from 'webpack';
import common from './common';
import merge from 'webpack-merge';

export default merge(common, {
  devServer: {
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map'

}) as Configuration
