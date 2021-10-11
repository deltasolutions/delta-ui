import execa from 'execa';
import { log } from './log';

interface ExecOpts extends execa.Options {
  preview?: boolean;
}

export const exec = async (command: string, args: string[], opts: ExecOpts) => {
  log(
    'command',
    `${command} ${args.map(v => (v.match(/\s+/) ? `"${v}"` : v)).join(' ')}`
  );
  if (opts.preview) {
    return;
  }
  return await execa(command, args, { stdio: 'inherit', ...opts });
};

export const createExecutor =
  (executorOpts: ExecOpts) =>
  (command: string, args: string[], opts?: ExecOpts) =>
    exec(command, args, { ...executorOpts, ...opts });
