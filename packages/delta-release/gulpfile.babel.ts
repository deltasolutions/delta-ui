import { promises as fsp } from 'fs';
import execa from 'execa';
import { task, series } from 'gulp';
import { rollup, OutputOptions } from 'rollup';
import rollupConfig from './rollup.config';

const exec = (v: string) => execa.command(v, { stdout: 'inherit' });

task('clean', async () => fsp.rm('./build', { recursive: true, force: true }));

task('build:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup(input);
  const outputs = (
    Array.isArray(output) ? output : [output]
  ) as OutputOptions[];
  for (let v of outputs) {
    await bundle.write(v);
  }
});

task('build:types', async () => {
  await exec('npx tsc -p tsconfig.lib.json');
});

task('build', series('clean', 'build:js', 'build:types'));

task('lint', async () => {
  await exec('npx eslint ./{src,storybook}/**/*.{js,jsx,ts,tsx} --fix');
  await exec('npx prettier ./{src,storybook}/**/*.{js,jsx,ts,tsx} --write');
});

task('release', async () => {
  await exec(
    [
      'ts-node',
      'src/index.ts',
      '-m "chore(delta-release): {{name}}@{{version}}"',
      '-s build',
      '-t {{name}}@{{version}}',
      '-p'
    ].join(' ')
  );
});
