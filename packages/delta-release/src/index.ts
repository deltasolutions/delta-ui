#!/usr/bin/env node
import { promises as fsp } from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as semver from 'semver';
import { createExecutor, exec } from './exec';
import { log } from './log';
import { parseOpts } from './parseOpts';

export const main = async (args: string[]) => {
  const opts = await parseOpts(args);
  if (opts.preview) {
    log('info', 'this is a preview run, nothing will be changed');
  }

  const { stdout: branch = '' } =
    (await exec('git branch --show-current', { stdio: 'pipe' })) ?? {};
  log('info', `current branch is ${branch}`);
  if (!['master', 'main'].includes(branch)) {
    log('error', 'wrong branch to make release at, exiting');
    return;
  }

  const projectPath = opts.project ?? process.cwd();
  const stats = await fsp.lstat(projectPath);
  const packageJsonFile = stats.isDirectory()
    ? path.join(projectPath, 'package.json')
    : projectPath;
  const packageDir = path.dirname(packageJsonFile);
  const packageJsonBuffer = await fsp.readFile(packageJsonFile);
  const packageJson = JSON.parse(packageJsonBuffer.toString());

  const execSafe = createExecutor({
    cwd: packageDir,
    preview: opts.preview
  });

  const version = semver.inc(packageJson.version, opts.increment);
  log('info', `new version is ${version}`);
  const message = mustache.render(opts.message, { ...packageJson, version });
  log('info', `generated commit message is ${message}`);
  await execSafe(`npm --no-git-tag-version version ${version}`);
  await execSafe(`git commit -am ${message}`);
  await execSafe(`git push origin ${branch}`);

  if (opts.tag) {
    log('info', '--tag option was set, tagging');
    if (typeof opts.tag === 'string') {
      const tag = mustache.render(opts.tag, { ...packageJson, version });
      log('info', `generated tag is ${tag}`);
      await execSafe(`git tag ${tag}`);
    } else {
      log(
        'info',
        'tag template was omitted, using previously generated commit message'
      );
      await execSafe(`git tag ${message}`);
    }
    await execSafe(`git push origin ${message}`);
  }

  if (opts.script) {
    log('info', '--script option was set, executing');
    await execSafe(`npm run ${opts.script}`);
  }

  if (opts.publish) {
    log('info', '--publish option was set, publishing');
    await execSafe(`npm publish`);
  }
};

if (require.main === module) {
  main(process.argv);
}
