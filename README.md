# Prompter Framework

A meta-framework for generating structured AI agent prompts with built-in context switching, validation checkpoints, and failure recovery strategies.

## Features

- **Multiple Task Types**: Implementation, Debugging, Analysis, Code Review, Documentation, Performance Optimization, Testing, and Refactoring
- **Meta-Framework Architecture**: Consistent structure across all task types with adaptive complexity
- **Context Switching Prompts**: Built-in guidance for maintaining focus across different work phases
- **Validation Checkpoints**: Phase-specific validation questions to ensure quality
- **Failure Recovery Strategies**: Predetermined approaches for common failure scenarios
- **Multiple Interfaces**: CLI tool, programmatic API, and web components
- **Plugin System**: Extensible architecture for custom task types and templates

## Quick Start

### Prerequisites

Ensure you have **Node.js ≥16** available. The repository also
provides a helper script called `setup.sh`. This script will install
Node.js if it isn't already present and then execute the standard
setup commands (`npm ci` and `npm test`) to verify the project.

### Installation

```bash
npm install prompter-framework
```

### Development Setup

Install dependencies and run the test suite:

```bash
npm ci
npm test
```

Alternatively you can run `setup.sh` which installs Node.js if
necessary and performs the same commands automatically.

### CLI Usage

```bash
# List available task types
prompter generate --list-types

# Generate a prompt
prompter generate \
  --type implementation \
  --title "Add Multi-Factor Authentication" \
  --requirements "TOTP support" "SMS backup" \
  --constraints "Must integrate with existing auth system"

# Generate from JSON template
prompter template --type implementation --output my-task.json
prompter generate --json my-task.json
```

### Programmatic Usage

```javascript
import { PromptGenerator } from 'prompter-framework';

const generator = new PromptGenerator();

const prompt = generator.generate({
  taskTitle: 'Add Multi-Factor Authentication',
  requirements: ['TOTP support', 'SMS backup'],
  constraints: ['Must integrate with existing auth system']
}, 'implementation');

console.log(prompt);
```

### Plugin System

```javascript
import { PromptGenerator, createPlugin } from 'prompter-framework';

const securityPlugin = createPlugin({
  name: 'security-audit',
  taskTypes: {
    'security-audit': 'Security Audit'
  },
  templates: {
    'security-audit': {
      contextSwitches: [
        'Before assessment: Review security requirements and compliance standards',
        'During audit: Focus on vulnerability identification and risk assessment'
      ],
      checkpoints: {
        'Before Assessment': [
          'Do I understand the security requirements?',
          'Have I identified all attack vectors?'
        ]
      },
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

const generator = new PromptGenerator();
generator.use(securityPlugin);

// Now you can use the custom task type
const prompt = generator.generate({
  taskTitle: 'Security Assessment',
  requirements: ['Penetration testing', 'Code review']
}, 'security-audit');
```

## Examples

The `examples/` directory contains runnable demonstration scripts:

- `basic-usage.js` – quick start programmatic example
- `plugin-usage.js` – how to register a custom plugin
- `cli-template-workflow.sh` – CLI workflow for generating and using templates

## Documentation

Additional guides and references:

- [Documentation Index](docs/index.md)
- [Migration Guide](docs/guides/migration.md)
- [Plugin Development Guide](docs/guides/plugin-development.md)
- [API Reference](docs/api/index.md)

## Available Task Types

- **implementation**: Feature development and system building
- **debugging**: Issue investigation and resolution  
- **analysis**: Data examination and insight generation
- **code_review**: Quality assessment and feedback
- **documentation**: Content creation and maintenance
- **performance**: System performance improvement
- **testing**: Test creation and execution
- **refactoring**: Code improvement and restructuring

## Project Structure

```
prompter-framework/
├── src/
│   ├── core/
│   │   ├── builders/        # Prompt generation logic
│   │   ├── templates/       # Task type definitions and templates
│   │   └── validators/      # Input validation
│   ├── cli/                 # Command-line interface
│   ├── web/                 # Web components (React)
│   └── plugins/             # Plugin system
├── lib/                     # Built distribution files
├── bin/                     # CLI executables
├── docs/                    # Documentation
├── examples/                # Usage examples
└── test/                    # Test files
```

## Task Master Integration

This framework bundles the [claude-task-master](https://www.npmjs.com/package/claude-task-master)
package for advanced task management.

### Updating Task Master

Run the helper script to install the newest version:

```bash
node scripts/update-task-master.js
```

### Using Task Master Programmatically

The wrapper API in `src/taskmaster/` exposes the CLI. Example:

```javascript
import { runTaskMaster, initProject } from 'prompter-framework/src/taskmaster/index.js';

await runTaskMaster(['list']);
```

### Configuration

Task Master reads options from environment variables in a `.env` file:

- `ANTHROPIC_API_KEY` – required Claude API key
- `MODEL` – Claude model name (default `claude-3-7-sonnet-20250219`)
- `MAX_TOKENS` – maximum tokens (default `4000`)
- `TEMPERATURE` – generation temperature (default `0.7`)
- `PERPLEXITY_API_KEY` – Perplexity API key for research
- `PERPLEXITY_MODEL` – Perplexity model (default `sonar-medium-online`)
- `DEBUG` – enable debug logging
- `LOG_LEVEL` – one of `debug`, `info`, `warn`, `error`
- `DEFAULT_SUBTASKS` – default subtask count
- `DEFAULT_PRIORITY` – default task priority
- `PROJECT_NAME` – override project name
- `PROJECT_VERSION` – override project version

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding style and guidelines.

1. Fork the repository
2. Create a feature branch
3. Add your enhancement
4. Write tests
5. Submit a pull request
6. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## Environment Detection

This package automatically detects whether a project is using Node.js,
Python, or a combination of both. The detection script runs during the
`npm install` step. You can also run it manually:

```bash
node index.js
```

### Purpose of `scripts/postinstall.js` and `lib/env.js`

The **postinstall** script runs automatically after installation. It
invokes `detectEnvironment` from `lib/env.js` to inspect the current
project and prints the detected settings. The `lib/env.js` module
contains the detection logic that looks for files such as
`package.json`, `requirements.txt` or `pyproject.toml` and returns an
object describing the environment.

### Example output

```bash
$ node index.js
Environment detected:
{
  isPython: false,
  isNode: true,
  hasPoetry: false,
  hasPipenv: false,
  environmentType: 'node'
}
```

### Integrating detection

Run the script manually at any time:

```bash
node index.js
```

For programmatic use you can import the function:

```javascript
import { detectEnvironment } from 'prompter-framework/lib/env.js';

const env = detectEnvironment(process.cwd());
console.log(env);
```

This helper can be included in your own setup or build scripts.

Sample projects for manual testing are provided in the `sandbox/` directory.
These include basic Node.js, Python, mixed language, Go, and Laravel PHP
setups for quick environment detection tests.

## License

MIT License - see LICENSE file for details.
