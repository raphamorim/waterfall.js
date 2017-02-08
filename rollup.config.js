import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/waterfall.js',
  plugins: [
    buble()
  ],
  targets: [
    {
      format: 'cjs',
      dest: 'dist/waterfall.cjs.js'
    },
    {
      format: 'umd',
      moduleName: 'waterfall',
      dest: 'dist/waterfall.umd.js'
    }
  ]
}
