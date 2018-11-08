
const basePlugins = [
  require('postcss-import')(),
  require('postcss-custom-properties')(),
  require('postcss-custom-media')(),
  require('postcss-nested')(),
  require('autoprefixer')(),
]

const prodPlugins = [
  require('cssnano')({
    autoprefixer: false,
  }),
]

const devPlugins = []

module.exports = {
  plugins: process.env.NODE_ENV === 'production' ? [...basePlugins, ...prodPlugins] : [...basePlugins, ...devPlugins]
}
