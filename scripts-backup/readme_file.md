# AI Prompt Generator

A React-based tool for generating structured prompts for AI agents using meta-framework methodology. This tool ensures consistent, high-quality prompts with built-in context switching, validation checkpoints, and failure recovery strategies.

## Features

- **Multi-Task Support**: Templates for Implementation, Debugging, Analysis, Code Review, Documentation, and Performance Optimization
- **Meta-Framework**: Consistent structure across all task types with adaptive complexity
- **Context Switching Prompts**: Built-in guidance for maintaining focus across different work phases
- **Validation Checkpoints**: Phase-specific validation questions to ensure quality
- **Failure Recovery**: Predetermined strategies for common failure scenarios
- **Export Options**: Copy to clipboard or download as Markdown files

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or create the project**:
```bash
mkdir ai-prompt-generator
cd ai-prompt-generator
```

2. **Initialize and install dependencies**:
```bash
npm init -y
npm install react react-dom lucide-react
npm install -D @vitejs/plugin-react vite
```

3. **Copy the project files** (use the artifacts provided above)

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser** to `http://localhost:3000`

## Usage

### Basic Workflow

1. **Select Task Type**: Choose from Implementation, Debugging, Analysis, etc.
2. **Fill in Details**: Provide task title, requirements, constraints, and resources
3. **Generate Prompt**: Click to create a structured prompt using the meta-framework
4. **Export**: Copy to clipboard or download as a Markdown file
5. **Use with AI Agent**: Paste the generated prompt into your AI agent interface

### Example Generated Prompt Structure

```markdown
# Task: Implement Multi-Factor Authentication

## Primary Objective
**Task ID**: #617
**Type**: Implementation
**Priority**: High
**Complexity**: High

## Core Requirements
1. Research and select appropriate MFA methods
2. Design database schema changes
3. Create API endpoints for MFA operations
...

## Agent Guidance Framework

### Context Switching Prompts
- **Before design**: "Review Core Requirements to ensure complete feature understanding"
- **Before coding**: "Check Technical Constraints for architecture compliance"
...

### Validation Checkpoints
#### Before Design Phase
- [ ] Do I understand all functional requirements?
- [ ] Have I identified integration points with existing system?
...

### Failure Recovery Strategies
#### If Requirements Are Unclear
1. Immediate: Document specific questions and assumptions
2. Research: Check similar existing features for patterns
...
```

## Task Types Supported

### Implementation
- Feature development and system building
- Context switches between requirements, design, coding, and testing
- Failure scenarios for unclear requirements and integration issues

### Debugging
- Issue investigation and resolution
- Context switches between reproduction, analysis, and fixing
- Failure scenarios for unreproducible issues and unclear root causes

### Analysis
- Data examination and insight generation
- Context switches between data collection, analysis, and conclusions
- Failure scenarios for poor data quality and unclear patterns

### Code Review
- Quality assessment and feedback
- Context switches between functionality, quality, and security perspectives
- Failure scenarios for major issues and unclear requirements

### Documentation
- Content creation and maintenance
- Context switches between technical and user perspectives
- Failure scenarios for incomplete information and unclear audience needs

### Performance Optimization
- System performance improvement
- Context switches between measurement, analysis, and optimization
- Failure scenarios for unclear bottlenecks and functionality breaks

## Project Structure

```directory
ai-prompt-generator/
├── src/
│   ├── components/
│   │   ├── PromptGenerator.js    # Main component
│   │   ├── TaskForm.js           # Form for task details
│   │   └── PromptPreview.js      # Preview and export
│   ├── data/
│   │   ├── templates.js          # Task-specific templates
│   │   └── taskTypes.js          # Task type definitions
│   ├── utils/
│   │   └── promptBuilder.js      # Prompt generation logic
│   ├── styles/
│   │   └── index.css             # Styling
│   └── index.js                  # Entry point
├── public/
│   └── index.html                # HTML template
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Adding New Task Types

1. **Add to taskTypes.js**:
```javascript
export const taskTypes = {
  // existing types...
  my_new_type: 'My New Task Type'
};
```

2. **Add template to templates.js**:
```javascript
export const templates = {
  // existing templates...
  my_new_type: {
    contextSwitches: [
      'Context switch prompts for your task type'
    ],
    checkpoints: {
      'Phase Name': [
        'Validation questions for this phase'
      ]
    },
    failures: {
      'Failure Scenario': [
        'Recovery steps for this scenario'
      ]
    }
  }
};
```

### Modifying Templates

Edit the `src/data/templates.js` file to customize:
- **Context Switching Prompts**: When and how agents should refocus
- **Validation Checkpoints**: Phase-specific questions for quality assurance
- **Failure Recovery**: Strategies for common failure scenarios

## Meta-Framework Principles

This tool is built on meta-prompting principles:

1. **Universal Cognitive Patterns**: Context switching, validation, and failure recovery work across all task types
2. **Adaptive Complexity**: Templates scale naturally from simple to complex tasks
3. **Domain Customization**: Task-specific vocabulary and scenarios while maintaining consistent structure
4. **Quality Assurance**: Built-in checkpoints prevent common failure modes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your task type or enhancement
4. Test with real AI agents
5. Submit a pull request

## License

MIT License - feel free to use and modify for your needs.

## Support

For issues, questions, or feature requests, please create an issue in the repository.