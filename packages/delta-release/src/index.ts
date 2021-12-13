#!/bin/env node
import { promises as fsp } from 'fs';
import * as path from 'path';
import { exit } from 'process';
import * as mustache from 'mustache';
import inc from 'semver/functions/inc.js';
import { createExecutor, exec } from './exec';
import { log } from './log';
import { parseConfig } from './parseConfig';
import { parseOpts } from './parseOpts';

export const main = async (args: string[]) => {
  const {
    project,
    config: configFileName,
    ...overrides
  } = await parseOpts(args);
  const projectPath = project ?? process.cwd();
  const stats = await fsp.lstat(projectPath);
  const packageJsonFilePath = stats.isDirectory()
    ? path.join(projectPath, 'package.json')
    : projectPath;
  const packageDir = path.dirname(packageJsonFilePath);
  const packageJsonBuffer = await fsp.readFile(packageJsonFilePath);
  const packageJson = JSON.parse(packageJsonBuffer.toString());
  const configFilePath = path.join(packageDir, configFileName);
  const config = await parseConfig(configFilePath, overrides).catch(() => {
    log('error', 'exiting with status code 1');
    exit(1);
  });

  if (config.preview) {
    log('info', 'this is a preview run, nothing will be changed');
  }

  const branchOutput = await exec('git', ['branch', '--show-current'], {
    stdio: 'pipe'
  });
  const { stdout: branch = '' } = branchOutput ?? {};
  log('info', `current branch is ${branch}`);
  if (!['master', 'main'].includes(branch)) {
    log('error', 'wrong branch to make release at, exiting');
    return;
  }

  const execSafe = createExecutor({
    cwd: packageDir,
    preview: config.preview
  });

  const version = inc(packageJson.version, config.increment);
  log('info', `new version is ${version}`);
  const message = mustache.render(config.message, { ...packageJson, version });
  log('info', `generated commit message is "${message}"`);
  await execSafe('npm', ['--no-git-tag-version', 'version', version]);
  await execSafe('git', ['commit', '-am', message]);
  await execSafe('git', ['push', 'origin', branch]);

  if (config.tag) {
    log('info', 'tag option was set, tagging');
    if (typeof config.tag === 'string') {
      const tag = mustache.render(config.tag, { ...packageJson, version });
      log('info', `generated tag is ${tag}`);
      await execSafe('git', ['tag', tag]);
      await execSafe('git', ['push', 'origin', tag]);
    } else {
      log(
        'info',
        'tag template was omitted, using previously generated commit message'
      );
      await execSafe('git', ['tag', message]);
      await execSafe('git', ['push', 'origin', message]);
    }
  }

  if (config.script) {
    log('info', 'script option was set, executing');
    await execSafe('npm', ['run', config.script]);
  }

  if (config.publish) {
    log('info', 'publish option was set, publishing');
    await execSafe('npm', ['publish']);
  }
};

if (require.main === module) {
  main(process.argv);
}
