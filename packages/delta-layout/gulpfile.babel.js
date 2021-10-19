import { promises as fsp } from 'fs';
import execa from 'execa';
import { task, series } from 'gulp';
import * as rollup from 'rollup';
import rollupConfig from './rollup.config.js';

const execaOptions = { stdout: 'inherit' };

task('clean', async () => fsp.rm('./build', { recursive: true, force: true }));

task('build:lib:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup.rollup(input);
  const outputs = Array.isArray(output) ? output : [output];
  for (let v of outputs) {
    await bundle.write(v);
  }
});

task('build:lib:types', async () => {
  await execa.command('tsc', execaOptions);
});

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));

task('build:docs:js', async () => {
  await execa.command(
    'build-storybook -c storybook -o build/docs',
    execaOptions
  );
});

task('build:docs', series('clean', 'build:docs:js'));

task('dev:docs', async () => {
  await execa.command(
    'start-storybook -c storybook -p 6006 --ci',
    execaOptions
  );
});

task('lint', async () => {
  await execa.command(
    'npx eslint ./{src,storybook}/**/*.{js,jsx,ts,tsx} --fix',
    execaOptions
  );
  await execa.command(
    'npx prettier ./{src,storybook}/**/*.{js,jsx,ts,tsx} --write',
    execaOptions
  );
});