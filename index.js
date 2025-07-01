#!/usr/bin/env node
import { detectEnvironment } from './lib/env.js';

const env = detectEnvironment(process.cwd());

console.log('Environment detected:');
console.log(env);
