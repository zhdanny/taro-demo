const path = require('path')

const config = {
  projectName: 'Taro-demo',
  date: '2020-04-16',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  // babel、csso、uglify 等配置从 plugins 配置中移出来
  babel: {
    sourceMap: true,
    presets: [
      ['env', { modules: false }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread', ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  },
  alias: {
    '@/model': path.resolve(__dirname, '..', 'src/model'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/base': path.resolve(__dirname, '..', 'src/base'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  },
  // 小程序配置从 weapp 改为 mini，可以删掉很多小配置
  mini: {
    webpackChain(chain, webpack) {
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    },
    cssLoaderOption: {},
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      }
    }
  },
  // 可以删掉很多小配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain(chain, webpack) {},
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      }
    }
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
