import path from 'path';
import process from 'process';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import builtins from 'builtin-modules';
import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];

export default {
  input: './src/index.ts',

  output: [
    {
      banner: '#!/usr/bin/env node',
      file: './build/index.js',
      format: 'es'
    },
    {
      banner: '#!/usr/bin/env node',
      file: './build/index.min.js',
      format: 'es',
      plugins: [terser()]
    },
    {
      banner: '#!/usr/bin/env node',
      file: './build/index.cjs',
      format: 'cjs'
    },
    {
      banner: '#!/usr/bin/env node',
      file: './build/index.min.cjs',
      format: 'cjs',
      plugins: [terser()]
    }
  ],

  plugins: [
    json(),
    nodeResolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: ['node_modules', process.cwd()]
      },
      preferBuiltins: true
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      extends: path.join(__dirname, '.babelrc')
    }),
    replace({
      preventAssignment: true,
      ...Object.entries(process.env).reduce(
        (prev, [k, v]) => ({
          ...prev,
          [`process.env.${k}`]: JSON.stringify(v)
        }),
        {}
      )
    })
  ],

  external: builtins,

  onwarn: (warning, rollupWarn) => {
    if (
      !['THIS_IS_UNDEFINED', 'CIRCULAR_DEPENDENCY'].includes(
        warning.code as string
      )
    ) {
      rollupWarn(warning);
    }
  }
} as RollupOptions;
