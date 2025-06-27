# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-27

### Added
- Initial release of Prompter Framework
- CLI interface with `prompter` and `prompt-gen` commands
- Programmatic API with `PromptGenerator` class
- Plugin system for extensible task types and templates
- 8 built-in task types:
  - Implementation (feature development)
  - Debugging (issue investigation)
  - Analysis (data examination)
  - Code Review (quality assessment)
  - Documentation (content creation)
  - Performance (optimization tasks)
  - Testing (test creation and execution)
  - Refactoring (code improvement)
- Meta-framework architecture with:
  - Context switching prompts
  - Validation checkpoints
  - Failure recovery strategies
- Multiple export formats (ESM, CommonJS, UMD)
- Comprehensive examples and documentation
- Basic test suite

### Features
- Generate structured AI agent prompts from command line or programmatically
- Load task configurations from JSON files
- Export prompts to files or stdout
- Template generation for task configurations
- Plugin system for custom task types
- Validation and error handling
- Cross-platform compatibility (Node.js 16+)

### Documentation
- Complete README with usage examples
- API documentation
- Plugin development guide
- Migration guide from original ai-prompt-generator
