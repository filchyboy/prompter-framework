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

### Installation

```bash
npm install @filchyboy/prompter-framework
```

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
import { PromptGenerator } from '@filchyboy/prompter-framework';

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
import { PromptGenerator, createPlugin } from '@filchyboy/prompter-framework';

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your enhancement
4. Write tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
