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
    input: './src/test.ts',
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
    file: './dist/lib.umd.js',
    format: 'umd',
    name: 'lib',
    sourcemap: true
  };

  const outputOptionsForES = {
    file: './dist/lib.es.js',
    format: 'es',
    // name: ''
    sourcemap: true
  };

  return {
    inputOptions,
    outputOptionsForUMD,
    outputOptionsForES
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

gulp.task('clean', async function() {
  return await gulp
    .src('dist/*', { read: false })
    .pipe(vinylPaths(del))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-umd', 'build-es']);

gulp.task('default', ['build']);
