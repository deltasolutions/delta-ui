import * as commander from 'commander';
import { parseSelf } from './parseSelf';

export const parseOpts = async (args: string[]) => {
  const self = await parseSelf();
  const program = new commander.Command();
  program
    .version(self.version)
    .addOption(
      new commander.Option(
        '-i, --increment <increment>',
        'semver increment type'
      )
        .choices([
          'major',
          'premajor',
          'minor',
          'preminor',
          'patch',
          'prepatch',
          'prerelease'
        ])
        .makeOptionMandatory()
    )
    .option(
      '-m, --message <message>',
      'template to be used to generate commit message and tag'
    )
    .option('-s, --script <script>', 'script to execute before release')
    .option(
      '-t, --tag [tag]',
      'create tag using given template or previously generated commit message'
    )
    .option('-p, --publish', 'publish module to npm')
    .option('-P, --preview', 'do not commit any changes to git or npm registry')
    .argument(
      '[project]',
      'project folder or path to package.json to work with'
    )
    .parse(args);
  return program.opts();
};
