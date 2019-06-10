const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const Module = require('module');

const { version: yoshiVersion } = require('../package.json');

const relatedPackages = [
  'jest-yoshi-preset',
  'yoshi-style-dependencies',
  'yoshi-angular-dependencies',
];

const resolveFromSilent = moduleId => {
  const fromDir = path.resolve(process.cwd());
  const fromFile = path.join(fromDir, 'noop.js');

  try {
    return require(Module._resolveFilename(moduleId, {
      id: fromFile,
      filename: fromFile,
      paths: Module._nodeModulePaths(fromDir).slice(0, 1),
    }));
  } catch (err) {
    return null;
  }
};

module.exports = async () => {
  const outdatedPackages = relatedPackages
    .map(packageName => path.join(packageName, 'package.json'))
    .map(packageJsonPath => resolveFromSilent(packageJsonPath))
    .filter(pkg => {
      const diff = pkg && semver.diff(pkg.version, yoshiVersion);

      if (diff) {
        return diff.includes('major');
      }
    });

  if (outdatedPackages.length > 0) {
    console.log(chalk.red('Command failed.\n'));
    console.log(
      chalk.red(
        'Packages related to Yoshi should be installed with the same major version as Yoshi:\n',
      ),
    );
    outdatedPackages.forEach(({ name, version: pkgVersion }) => {
      console.log(`  - ${chalk.bold.red(`${name} (${pkgVersion})`)}`);
    });
    console.log(
      chalk.red(
        `Please install them in the version ${chalk.bold(yoshiVersion)}.\n`,
      ),
    );

    process.exit(1);
  }
};
