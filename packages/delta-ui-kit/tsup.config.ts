import { transform } from 'cjstoesm';
import { Plugin } from 'esbuild';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  sourcemap: true,
  platform: 'browser',
  format: ['cjs', 'esm'],
  entryPoints: ['lib/index.tsx'],
  esbuildPlugins: [cjsToEsmPlugin('focus-trap-react')],
});

function cjsToEsmPlugin(...packages: string[]): Plugin {
  return {
    name: 'cjstoesm',
    setup(build) {
      build.onLoad({ filter: new RegExp(packages.join('|')) }, async args => {
        const transformed = await transform({
          input: args.path,
          write: false,
        });
        return {
          contents: transformed.files.map(v => v.text).join('\n\n'),
        };
      });
    },
  };
}
