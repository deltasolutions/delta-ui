import { promises as fsp } from 'fs';
import execa from 'execa';
import { task, series } from 'gulp';
import * as rollup from 'rollup';
import rollupConfig from './rollup.config';

const exec = (command: string) =>
  execa.command(command, {
    stdout: 'inherit'
  });

// @ts-ignore
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
  await exec('tsc');
});

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));

task('build:docs:js', async () => {
  await exec('build-storybook -c storybook -o build/docs');
});

task('build:docs', series('clean', 'build:docs:js'));

task('dev:docs', async () => {
  await exec('start-storybook -c storybook -p 6006 --ci');
});

task('lint', async () => {
  await exec('npx eslint ./{src,storybook}/**/*.{js,jsx,ts,tsx} --fix');
  await exec('npx prettier ./{src,storybook}/**/*.{js,jsx,ts,tsx} --write');
});
