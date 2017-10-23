import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
const sass = require('node-sass');

export default {
  input: './src/test.ts',
  output: [{
    file: 'dist/test.umd.js',
    format: 'umd',
    name: 'SC',
    sourcemap: true
  }, {
    name: 'SmartChart',
    file: 'dist/test.js',
    format: 'iife',
    sourcemap: true,
  }, {
    file: 'dist/test.bundle.js',
    format: 'cjs'
  }],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    resolve({
      module: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};
