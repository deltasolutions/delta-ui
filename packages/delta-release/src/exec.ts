import * as execa from 'execa';
import { log } from './log';

interface ExecOpts extends execa.Options {
  preview?: boolean;
}

export const exec = async (command: string, opts: ExecOpts) => {
  log('command', command);
  if (opts.preview) {
    return;
  }
  return await execa.command(command, { stdio: 'inherit', ...opts });
};

export const createExecutor =
  (executorOpts: ExecOpts) => (command: string, opts?: ExecOpts) =>
    exec(command, { ...executorOpts, ...opts });
