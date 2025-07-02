#!/usr/bin/env node

// Example demonstrating how to extend the Prompter Framework via a plugin
// Run this script with `node examples/plugin-usage.js`

import { PromptGenerator, createPlugin } from '../src/index.js';

// Define a simple plugin that adds a new "security-audit" task type
const securityPlugin = createPlugin({
  name: 'security-audit',
  taskTypes: {
    'security-audit': 'Security Audit'
  },
  templates: {
    'security-audit': {
      // Provide guidance on switching context while auditing
      contextSwitches: [
        'Before assessment: Review security requirements',
        'During audit: Focus on vulnerability identification'
      ],
      // Validation checkpoints for each phase
      checkpoints: {
        'Before Assessment': [
          'Do I understand the security requirements?',
          'Have I identified all attack vectors?'
        ]
      },
      // Suggested recovery steps for common failure scenarios
      failures: {
        'If Vulnerabilities Are Complex': [
          'Document findings clearly',
          'Prioritize by risk level',
          'Recommend immediate mitigations'
        ]
      }
    }
  }
});

// Create the prompt generator and register the plugin
const generator = new PromptGenerator();
generator.use(securityPlugin);

// Generate a prompt using the custom task type provided by the plugin
const prompt = generator.generate({
  taskTitle: 'Security Assessment',
  requirements: ['Penetration testing', 'Code review']
}, 'security-audit');

