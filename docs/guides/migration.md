# Migration Guide

This guide helps you migrate from the original `ai-prompt-generator` to the new standalone Prompter Framework.

## Overview

The Prompter Framework is a complete rewrite and enhancement of the original AI Prompt Generator, now available as a standalone npm package with improved APIs and additional features.

## Key Changes

### Package Installation

**Before (Original):**
```bash
# Manual setup in project scripts directory
cp -r scripts/ai-prompt-generator ./
cd ai-prompt-generator
npm install
```

**After (Prompter Framework):**
```bash
# Install as npm package
npm install @filchyboy/prompter-framework
```

### CLI Usage

**Before:**
```bash
node src/cli.js generate --type implementation --title "My Task"
```

**After:**
```bash
prompter generate --type implementation --title "My Task"
# or
npx @filchyboy/prompter-framework generate --type implementation --title "My Task"
```

### Programmatic Usage

**Before:**
```javascript
import { 
  initializeData, 
  generatePrompt 
} from './scripts/ai-prompt-generator/src/utils/promptBuilderNode.js';

await initializeData();
const prompt = generatePrompt(formData, taskType);
```

**After:**
```javascript
import { PromptGenerator } from '@filchyboy/prompter-framework';

const generator = new PromptGenerator();
const prompt = generator.generate(formData, taskType);
```

### Import Paths

**Before:**
```javascript
import { templates } from './scripts/ai-prompt-generator/src/data/templates.js';
import { taskTypes } from './scripts/ai-prompt-generator/src/data/taskTypes.js';
```

**After:**
```javascript
import { templates, taskTypes } from '@filchyboy/prompter-framework';
```

## New Features

### Plugin System

The new framework includes a plugin system for custom task types:

```javascript
import { PromptGenerator, createPlugin } from '@filchyboy/prompter-framework';

const customPlugin = createPlugin({
  name: 'my-custom-plugin',
  taskTypes: {
    'custom-type': 'Custom Task Type'
  },
  templates: {
    'custom-type': {
      contextSwitches: ['Custom context switch'],
      checkpoints: { 'Custom Phase': ['Custom checkpoint'] },
      failures: { 'Custom Failure': ['Custom recovery'] }
    }
  }
});

const generator = new PromptGenerator();
generator.use(customPlugin);
```

### Enhanced CLI

- Better error handling and validation
- JSON configuration file support
- Template generation
- Improved help and documentation

### Multiple Export Formats

The package now supports multiple import/export formats:
- ES Modules (ESM)
- CommonJS (CJS)
- Universal Module Definition (UMD)

## Migration Steps

### Step 1: Install the Package

```bash
npm install @filchyboy/prompter-framework
```

### Step 2: Update Import Statements

Replace relative imports with package imports:

```javascript
// Old
import { generatePrompt } from './scripts/ai-prompt-generator/src/utils/promptBuilderNode.js';

// New
import { PromptGenerator } from '@filchyboy/prompter-framework';
```

### Step 3: Update Code Usage

Replace function calls with class-based API:

```javascript
// Old
await initializeData();
const prompt = generatePrompt(formData, taskType);

// New
const generator = new PromptGenerator();
const prompt = generator.generate(formData, taskType);
```

### Step 4: Update CLI Scripts

Replace direct node calls with the new CLI commands:

```bash
# Old
node scripts/ai-prompt-generator/src/cli.js generate --type implementation

# New
prompter generate --type implementation
```

### Step 5: Remove Old Files

After migration is complete and tested:

```bash
rm -rf scripts/ai-prompt-generator
```

## Integration with Existing Projects

### Meta-Framework Generator Integration

If you're using the meta-framework generator in your project, update the import paths:

**Before:**
```javascript
const aiPromptGenPath = path.resolve(__dirname, '../../ai-prompt-generator/src');
const templatesModule = await import(`${aiPromptGenPath}/data/templates.js`);
```

**After:**
```javascript
import { templates, PromptGenerator } from '@filchyboy/prompter-framework';
const generator = new PromptGenerator();
```

### Configuration Updates

Update any configuration files that reference the old paths:

```json
{
  "promptGenerator": {
    "path": "@filchyboy/prompter-framework",
    "command": "prompter"
  }
}
```

## Compatibility Notes

- **Node.js Version**: Minimum version increased from 14.8 to 16.0
- **ES Modules**: The package is now pure ESM (no CommonJS source)
- **API Changes**: Some internal APIs have changed, but public APIs are mostly compatible
- **Dependencies**: Reduced dependency footprint

## Testing Your Migration

Create a simple test to verify the migration:

```javascript
import { PromptGenerator } from '@filchyboy/prompter-framework';

const generator = new PromptGenerator();
const prompt = generator.generate({
  taskTitle: 'Migration Test',
  requirements: ['Test requirement'],
  constraints: ['Test constraint']
}, 'implementation');

console.log('Migration successful!');
console.log(prompt);
```

## Getting Help

- Check the [API Documentation](../api/)
- Review [Examples](../examples/)
- Create an issue on GitHub for migration-specific questions
