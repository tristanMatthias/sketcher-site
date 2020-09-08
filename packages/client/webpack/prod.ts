
import { Configuration } from 'webpack';
import common from './common';
import merge from 'webpack-merge';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

export default merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}) as Configuration
