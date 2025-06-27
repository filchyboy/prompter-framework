#!/usr/bin/env node

// Basic usage example for Prompter Framework
import { PromptGenerator } from '../src/index.js';

const generator = new PromptGenerator();

// Example 1: Implementation task
console.log('=== Implementation Task Example ===\n');

const implementationPrompt = generator.generate({
  taskTitle: 'Add Multi-Factor Authentication',
  taskId: '#MFA-001',
  priority: 'high',
  complexity: 'high',
  requirements: [
    'TOTP support using authenticator apps',
    'SMS backup verification',
    'Recovery codes generation',
    'Admin override capability'
  ],
  constraints: [
    'Must integrate with existing Laravel auth system',
    'Follow OWASP security guidelines',
    'Maintain backward compatibility'
  ],
  resources: [
    'Laravel Sanctum documentation',
    'Google2FA package',
    'Existing user authentication flow'
  ]
}, 'implementation');

console.log(implementationPrompt);

console.log('\n\n=== Debugging Task Example ===\n');

// Example 2: Debugging task
const debuggingPrompt = generator.generate({
  taskTitle: 'Fix Memory Leak in User Session Management',
  taskId: '#BUG-042',
  priority: 'critical',
  complexity: 'medium',
  requirements: [
    'Identify source of memory leak',
    'Fix without breaking existing sessions',
    'Add monitoring to prevent future leaks'
  ],
  constraints: [
    'Cannot restart production servers',
    'Must maintain user sessions during fix',
    'Fix must be backward compatible'
  ],
  resources: [
    'Production logs from last 24 hours',
    'Memory profiling tools',
    'Session management codebase'
  ]
}, 'debugging');

console.log(debuggingPrompt);
