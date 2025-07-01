#!/usr/bin/env node
import { execSync } from 'child_process';

const pkg = 'claude-task-master';

try {
  const latest = execSync(`npm view ${pkg} version`).toString().trim();
  console.log(`Installing ${pkg}@${latest}...`);
  execSync(`npm install ${pkg}@${latest} --save`, { stdio: 'inherit' });
  console.log('Task Master updated successfully.');
} catch (err) {
  console.error('Failed to update Task Master:', err.message);
  process.exit(1);
}
