import childProcess from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import util from 'util';
import fse from 'fs-extra';

const exec = util.promisify(childProcess.exec);
const outputDir = path.resolve(__dirname, 'dist');
const packagesDir = path.resolve(__dirname, '..');

async function main() {
  console.log('Cleaning output directory');
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
  const packageNames = await fs.readdir(packagesDir);
  for (const [index, packageName] of Object.entries(packageNames)) {
    const packageDir = path.resolve(packagesDir, packageName);
    const packageJsonFile = path.resolve(packageDir, 'package.json');
    if (
      await fs
        .lstat(packageJsonFile)
        .then(v => !v.isFile)
        .catch(() => true)
    ) {
      continue;
    }
    const packageJson = await import(packageJsonFile);
    const counter = `(${+index + 1}/${packageNames.length})`;
    if (!packageJson.scripts?.doc) {
      console.log('Skipping', packageName, counter);
      continue;
    }
    console.log('Building', packageName, counter);
    await exec('npm run doc', {
      cwd: packageDir,
    });
    const sourceDir = path.resolve(packageDir, 'dist/docs');
    const targetDir = path.resolve(outputDir, packageName);
    console.log('Copying output');
    await fs.mkdir(targetDir, { recursive: true });
    await fse.copy(sourceDir, targetDir);
    console.log('Done');
  }
}

main();
