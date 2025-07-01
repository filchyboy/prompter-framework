import fs from 'fs';
import path from 'path';

export function detectEnvironment(cwd) {
  const files = fs.readdirSync(cwd);
  const hasFile = (filename) => files.includes(filename);

  return {
    isPython: hasFile('requirements.txt') || hasFile('pyproject.toml'),
    isNode: hasFile('package.json'),
    hasPoetry:
      hasFile('pyproject.toml') &&
      fs.readFileSync(path.join(cwd, 'pyproject.toml'), 'utf8').includes('[tool.poetry]'),
    hasPipenv: hasFile('Pipfile'),
    environmentType: (() => {
      if (hasFile('package.json') && (hasFile('requirements.txt') || hasFile('pyproject.toml'))) {
        return 'mixed';
      } else if (hasFile('package.json')) {
        return 'node';
      } else if (hasFile('requirements.txt') || hasFile('pyproject.toml')) {
        return 'python';
      } else {
        return 'unknown';
      }
    })(),
  };
}
