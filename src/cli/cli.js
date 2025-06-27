#!/usr/bin/env node

// Check Node.js version
const [major, minor] = process.versions.node.split('.').map(Number);
const MIN_NODE_VERSION = { major: 16, minor: 0 };

if (major < MIN_NODE_VERSION.major || 
    (major === MIN_NODE_VERSION.major && minor < MIN_NODE_VERSION.minor)) {
  console.error(`Error: This tool requires Node.js v${MIN_NODE_VERSION.major}.${MIN_NODE_VERSION.minor} or later. ` +
    `You are using v${process.versions.node}.`);
  process.exit(1);
}

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { 
  initializeData, 
  generatePrompt, 
  savePromptToFile, 
  validateTaskType, 
  getAvailableTaskTypes 
} from '../core/builders/promptBuilderNode.js';

// Initialize data
await initializeData();

program
  .name('prompter')
  .description('Prompter Framework - Meta-framework for generating structured AI agent prompts')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate an AI agent prompt')
  .option('-t, --type <type>', 'Task type (implementation, debugging, analysis, etc.)')
  .option('-T, --title <title>', 'Task title')
  .option('-i, --id <id>', 'Task ID')
  .option('-p, --priority <priority>', 'Priority level (low, medium, high, critical)', 'medium')
  .option('-c, --complexity <complexity>', 'Complexity level (low, medium, high)', 'medium')
  .option('-r, --requirements <requirements...>', 'Core requirements (multiple values allowed)')
  .option('-C, --constraints <constraints...>', 'Technical constraints (multiple values allowed)')
  .option('-R, --resources <resources...>', 'Resource references (multiple values allowed)')
  .option('-o, --output <file>', 'Output file path (if not specified, prints to stdout)')
  .option('-j, --json <file>', 'Load task data from JSON file')
  .option('--list-types', 'List available task types')
  .action(async (options) => {
    try {
      // List available task types
      if (options.listTypes) {
        console.log('Available task types:');
        getAvailableTaskTypes().forEach(type => {
          console.log(`  - ${type}`);
        });
        return;
      }

      let formData;

      // Load from JSON file if specified
      if (options.json) {
        if (!fs.existsSync(options.json)) {
          console.error(`Error: JSON file not found: ${options.json}`);
          process.exit(1);
        }
        
        let jsonData;
        try {
          jsonData = JSON.parse(fs.readFileSync(options.json, 'utf8'));
        } catch (error) {
          console.error(`Error: Failed to parse JSON file '${options.json}':`, error.message);
          process.exit(1);
        }
        
        formData = {
          taskTitle: jsonData.title || jsonData.taskTitle || 'Untitled Task',
          taskId: jsonData.id || jsonData.taskId,
          priority: jsonData.priority || 'medium',
          complexity: jsonData.complexity || 'medium',
          requirements: jsonData.requirements || [],
          constraints: jsonData.constraints || [],
          resources: jsonData.resources || [],
          customCheckpoints: jsonData.customCheckpoints || [],
          customFailures: jsonData.customFailures || []
        };
        
        // Task type from JSON or command line
        const taskType = jsonData.type || options.type;
        if (!taskType) {
          console.error('Error: Task type must be specified either in JSON file or via --type option');
          process.exit(1);
        }
        options.type = taskType;
      } else {
        // Build from command line options
        if (!options.type) {
          console.error('Error: Task type is required. Use --type or --list-types to see available types.');
          process.exit(1);
        }
        
        if (!options.title) {
          console.error('Error: Task title is required. Use --title to specify.');
          process.exit(1);
        }

        formData = {
          taskTitle: options.title,
          taskId: options.id,
          priority: options.priority,
          complexity: options.complexity,
          requirements: options.requirements || [],
          constraints: options.constraints || [],
          resources: options.resources || [],
          customCheckpoints: [],
          customFailures: []
        };
      }

      // Validate task type
      if (!validateTaskType(options.type)) {
        console.error(`Error: Invalid task type "${options.type}". Use --list-types to see available types.`);
        process.exit(1);
      }

      // Generate the prompt
      const prompt = generatePrompt(formData, options.type);

      // Output the prompt
      if (options.output) {
        const outputPath = savePromptToFile(prompt, formData.taskTitle, path.dirname(options.output));
        console.log(`Prompt saved to: ${outputPath}`);
      } else {
        console.log(prompt);
      }

    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('template')
  .description('Generate a template JSON file for task input')
  .option('-t, --type <type>', 'Task type to generate template for')
  .option('-o, --output <file>', 'Output file path', 'task-template.json')
  .action((options) => {
    const template = {
      title: 'Example Task Title',
      type: options.type || 'implementation',
      id: '#123',
      priority: 'medium',
      complexity: 'medium',
      requirements: [
        'First requirement',
        'Second requirement'
      ],
      constraints: [
        'Technical constraint 1',
        'Technical constraint 2'
      ],
      resources: [
        'Resource reference 1',
        'Resource reference 2'
      ],
      customCheckpoints: [
        'Custom validation checkpoint'
      ],
      customFailures: [
        'Custom failure scenario and recovery'
      ]
    };

    fs.writeFileSync(options.output, JSON.stringify(template, null, 2));
    console.log(`Template saved to: ${options.output}`);
  });

program.parse();
