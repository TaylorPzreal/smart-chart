const gulp = require('gulp');
const rollup = require('rollup');

const del = require('del');
const vinylPaths = require('vinyl-paths');

const rollupTypescript = require('rollup-plugin-typescript');
const rollupResolve = require('rollup-plugin-node-resolve');
const rollupCommonjs = require('rollup-plugin-commonjs');
const sass = require('node-sass');

const rollupOptions = (function() {
  const inputOptions = {
    input: './src/index.ts',
    plugins: [
      rollupTypescript({
        typescript: require('typescript')
      }),
      rollupResolve({
        module: true,
        main: true
      }),
      rollupCommonjs({
        include: 'node_modules/**'
      })
    ],
    external: []

    // onwarn: [],
    // cache: []
  };

  const outputOptionsForUMD = {
    file: './dist/index.umd.js',
    format: 'umd',
    name: 'SmartChart',
    sourcemap: true
  };

  const outputOptionsForES = {
    file: './dist/index.es.js',
    format: 'es',
    // name: ''
    sourcemap: true
  };

  const outputOptionsForIIFE = {
    file: './dist/index.js',
    format: 'iife',
    name: 'SmartChart',
    sourcemap: true
  };

  return {
    inputOptions,
    outputOptionsForUMD,
    outputOptionsForES,
    outputOptionsForIIFE
  };
})();

gulp.task('build-umd', async function() {
  const bundle = await rollup.rollup(rollupOptions.inputOptions);
  await bundle.write(rollupOptions.outputOptionsForUMD);
});

gulp.task('build-es', async function() {
  const bundle = await rollup.rollup(rollupOptions.inputOptions);
  await bundle.write(rollupOptions.outputOptionsForES);
});

gulp.task('build-iife', async function() {
  const bundle = await rollup.rollup(rollupOptions.inputOptions);
  await bundle.write(rollupOptions.outputOptionsForIIFE);
});

gulp.task('clean', async function() {
  return await gulp
    .src('dist/*', { read: false })
    .pipe(vinylPaths(del))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-umd', 'build-es', 'build-iife']);

gulp.task('default', ['build']);
