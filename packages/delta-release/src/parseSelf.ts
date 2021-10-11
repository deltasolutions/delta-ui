import { promises as fsp } from 'fs';
import * as path from 'path';

export const parseSelf = async () => {
  const target = path.join(__dirname, '../package.json');
  const buffer = await fsp.readFile(target);
  return JSON.parse(buffer.toString());
};
