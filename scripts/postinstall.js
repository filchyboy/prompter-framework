import { detectEnvironment } from '../lib/env.js';

const env = detectEnvironment(process.cwd());

console.log('[agent-prompt-tool] Environment detected:');
console.log(env);
