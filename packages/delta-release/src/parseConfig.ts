import { promises as fsp } from 'fs';
import Ajv from 'ajv';
import colors from 'colors/safe';
import { Config, configSchema } from './Config';
import { log } from './log';

const ajv = new Ajv({ allErrors: true });

export const parseConfig = async (path: string, overrides: Partial<Config>) => {
  const config = {} as Config;
  const stats = await fsp
    .access(path)
    .then(() => fsp.stat(path))
    .catch(() => undefined);
  if (stats && stats.isFile()) {
    const trimmedPath = path.length > 10 ? '...' + path.slice(-25) : path;
    log('info', `using config file ${trimmedPath}`);
    const buffer = await fsp.readFile(path);
    Object.assign(config, JSON.parse(buffer.toString()));
  }
  Object.assign(config, overrides);
  const validate = ajv.compile(configSchema);
  if (!validate(config) && validate.errors) {
    log('error', 'invalid config:');
    validate.errors.forEach(e => {
      console.log(
        '  ' + colors.dim((e.instancePath || '/') + ' -> ') + e.message
      );
    });
    throw new Error();
  }
  return config;
};
