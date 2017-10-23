const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');

gulp.task('build', async function() {
  const bundle = await rollup.rollup({
    input: './src/test.ts',
    plugins: []
  });
});
