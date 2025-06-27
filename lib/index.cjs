'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const templates = {
  implementation: {
    contextSwitches: [
      'Before design: Review Core Requirements to ensure complete feature understanding',
      'Before coding: Check Technical Constraints for architecture compliance',
      'During implementation: Reference existing patterns for consistency',
      'Before testing: Return to requirements to verify complete coverage'
    ],
    checkpoints: {
      'Before Design Phase': [
        'Do I understand all functional requirements?',
        'Have I identified integration points with existing system?',
        'Are performance requirements clear and measurable?'
      ],
      'During Implementation': [
        'Does my code follow established patterns and conventions?',
        'Am I handling error cases and edge conditions?',
        'Is my implementation modular and maintainable?'
      ],
      'Before Testing': [
        'Have I covered unit, integration, and user acceptance testing?',
        'Are my tests realistic and comprehensive?',
        'Does my implementation handle failure scenarios gracefully?'
      ]
    },
    failures: {
      'If Requirements Are Unclear': [
        'Immediate: Document specific questions and assumptions',
        'Research: Check similar existing features for patterns',
        'Clarify: Seek clarification on ambiguous requirements',
        'Continue: Implement core functionality, defer edge cases'
      ],
      'If Technical Integration Fails': [
        'Isolate: Test new feature in isolation first',
        'Investigate: Check existing integration patterns',
        'Alternative: Consider different integration approach',
        'Fallback: Implement as standalone feature with future integration plan'
      ]
    }
  },

  debugging: {
    contextSwitches: [
      'Before investigation: Confirm problem reproduction steps are reliable',
      'During analysis: Switch between symptom observation and cause hypothesis',
      'Before implementing fix: Verify root cause understanding is complete',
      'After fix: Test both the specific issue and potential regression areas'
    ],
    checkpoints: {
      'Before Investigation': [
        'Can I reliably reproduce the issue?',
        'Do I understand the expected vs. actual behavior?',  
        'Have I gathered all relevant error logs/data?'
      ],
      'During Root Cause Analysis': [
        'Have I eliminated obvious causes first?',
        'Am I testing hypotheses systematically?',
        'Have I considered environmental factors?'
      ],
      'Before Fix Implementation': [
        'Do I understand why the issue occurs?',
        'Will my fix address the root cause, not just symptoms?',
        'Have I considered impact on other system components?'
      ]
    },
    failures: {
      'If Issue Cannot Be Reproduced': [
        'Gather: Collect more detailed reproduction steps from reporter',
        'Environment: Check for environment-specific factors',
        'Data: Examine production data that might trigger the issue',
        'Continue: Work with available information, document assumptions'
      ],
      'If Root Cause Remains Unclear': [
        'Isolate: Break down the problem into smaller components',
        'Test: Create minimal test cases for each component',
        'Research: Check for similar issues in documentation/forums',
        'Document: Record findings and continue with partial understanding'
      ]
    }
  },

  analysis: {
    contextSwitches: [
      'During data collection: Ensure data quality before proceeding to analysis',
      'During analysis: Switch between detailed examination and big-picture patterns',
      'Before conclusions: Validate findings against original objectives',
      'Before presentation: Consider audience perspective and needs'
    ],
    checkpoints: {
      'Before Analysis': [
        'Is my data complete and representative?',
        'Have I chosen appropriate analysis methods?',
        'Are my assumptions clearly documented?'
      ],
      'During Analysis': [
        'Am I avoiding confirmation bias?',
        'Are my methods producing reliable results?',
        'Have I considered alternative explanations?'
      ],
      'Before Conclusions': [
        'Do my findings answer the original questions?',
        'Are my conclusions supported by evidence?',
        'Have I identified limitations and uncertainties?'
      ]
    },
    failures: {
      'If Data Quality Is Poor': [
        'Assess: Determine what data is reliable',
        'Clean: Apply appropriate data cleaning techniques',
        'Adjust: Modify analysis approach for available data quality',
        'Document: Note limitations in findings'
      ],
      'If Analysis Reveals No Clear Patterns': [
        'Reframe: Consider different analytical approaches',
        'Segment: Break data into smaller, more homogeneous groups',
        'Context: Add external context or historical comparison',
        'Value: Document the negative finding as valuable information'
      ]
    }
  },

  performance: {
    contextSwitches: [
      'Before analysis: Review current performance baselines to understand the problem scope',
      'During investigation: Switch between query-level analysis and system-wide impact assessment',
      'Before optimization: Validate root cause understanding against Technical Constraints',
      'After optimization: Monitor real-world impact against baseline measurements'
    ],
    checkpoints: {
      'Before Performance Analysis': [
        'Do I have reliable baseline metrics for current performance?',
        'Have I identified which specific user scenarios are most affected?',
        'Are my measurement tools capturing the right metrics?'
      ],
      'During Root Cause Investigation': [
        'Have I profiled both database and application-level performance?',
        'Am I considering both query efficiency and data volume issues?',
        'Are there multiple contributing factors I need to address?'
      ],
      'Before Implementation': [
        'Will my proposed changes meet the performance targets consistently?',
        'Have I considered the impact on other parts of the system?',
        'Do I have a rollback plan if the optimization causes issues?'
      ]
    },
    failures: {
      'If Performance Analysis Shows No Clear Bottleneck': [
        'Expand Scope: Look beyond database queries to network, caching, and frontend issues',
        'Segment Analysis: Break down performance by user types, data sizes, and usage patterns',
        'Environment Check: Compare production vs. staging performance characteristics',
        'Continue: Focus on most promising optimization opportunities while gathering more data'
      ],
      'If Optimization Breaks Existing Functionality': [
        'Immediate Rollback: Revert changes and assess what went wrong',
        'Isolate Impact: Identify which specific changes caused the regression',
        'Alternative Approach: Try different optimization strategy that preserves functionality',
        'Staged Deployment: Implement changes in smaller, testable increments'
      ]
    }
  }
};

const taskTypes = {
  implementation: 'Implementation',
  debugging: 'Debugging', 
  analysis: 'Analysis',
  code_review: 'Code Review',
  documentation: 'Documentation',
  performance: 'Performance Optimization',
  testing: 'Testing',
  refactoring: 'Refactoring'
};

const priorityLevels = ['low', 'medium', 'high', 'critical'];
const complexityLevels = ['low', 'medium', 'high'];

const validateTaskType = (taskType) => {
  return Object.keys(taskTypes).includes(taskType);
};

const validateFormData = (formData) => {
  const errors = [];
  
  if (!formData.taskTitle || formData.taskTitle.trim() === '') {
    errors.push('Task title is required');
  }
  
  if (formData.priority && !['low', 'medium', 'high', 'critical'].includes(formData.priority)) {
    errors.push('Invalid priority level');
  }
  
  if (formData.complexity && !['low', 'medium', 'high'].includes(formData.complexity)) {
    errors.push('Invalid complexity level');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

class PromptGenerator {
  constructor(options = {}) {
    this.templates = { ...templates };
    this.taskTypes = { ...taskTypes };
    this.plugins = [];
    this.config = {
      defaultPriority: 'medium',
      defaultComplexity: 'medium',
      ...options
    };
  }

  use(plugin) {
    this.plugins.push(plugin);
    
    // Merge plugin task types and templates
    if (plugin.taskTypes) {
      Object.assign(this.taskTypes, plugin.taskTypes);
    }
    
    if (plugin.templates) {
      Object.assign(this.templates, plugin.templates);
    }
    
    return this;
  }

  generate(formData, taskType) {
    // Validate inputs
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    if (!this.taskTypes[taskType]) {
      throw new Error(`Unknown task type: ${taskType}`);
    }

    const template = this.templates[taskType];
    if (!template) {
      throw new Error(`No template found for task type: ${taskType}`);
    }

    // Apply defaults
    const data = {
      priority: this.config.defaultPriority,
      complexity: this.config.defaultComplexity,
      ...formData
    };

    return this._buildPrompt(data, taskType, template);
  }

  _buildPrompt(formData, taskType, template) {
    const nonEmptyRequirements = (formData.requirements || []).filter(req => req.trim());
    const nonEmptyConstraints = (formData.constraints || []).filter(con => con.trim());
    const nonEmptyResources = (formData.resources || []).filter(res => res.trim());

    return `# Task: ${formData.taskTitle}

## Primary Objective
**Task ID**: ${formData.taskId || 'N/A'}
**Type**: ${this.taskTypes[taskType]}
**Priority**: ${this._capitalize(formData.priority || 'medium')}
**Complexity**: ${this._capitalize(formData.complexity || 'medium')}

## Core Requirements
${nonEmptyRequirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}

### Technical Constraints
${nonEmptyConstraints.map(con => `- ${con}`).join('\n')}

### Success Criteria
[Define measurable outcomes that indicate task completion]

## Implementation Guidelines

### Resource References
**High Priority**:
${nonEmptyResources.map(res => `- ${res}`).join('\n')}

## Agent Guidance Framework

### Context Switching Prompts
${template.contextSwitches.map(cs => `- **${cs.split(':')[0]}**: "${cs.split(':')[1]?.trim() || cs}"`).join('\n')}

### Validation Checkpoints
${Object.entries(template.checkpoints).map(([phase, checks]) => 
  `#### ${phase}\n${checks.map(check => `- [ ] ${check}`).join('\n')}`
).join('\n\n')}
${formData.customCheckpoints?.filter(c => c.trim()).length > 0 ? 
  `\n#### Custom Checkpoints\n${formData.customCheckpoints.filter(c => c.trim()).map(check => `- [ ] ${check}`).join('\n')}` : ''}

### Failure Recovery Strategies
${Object.entries(template.failures).map(([scenario, steps]) =>
  `#### ${scenario}\n${steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}`
).join('\n\n')}
${formData.customFailures?.filter(f => f.trim()).length > 0 ?
  `\n#### Custom Failure Scenarios\n${formData.customFailures.filter(f => f.trim()).map((failure, i) => `${i + 1}. ${failure}`).join('\n')}` : ''}

#### General Recovery Protocol
- **Stop and Assess**: Don't repeat failed approaches - analyze why it didn't work
- **Consult Context**: Return to Core Requirements and Technical Constraints
- **Try Alternative**: Use backup approaches from the requirements
- **Maintain Progress**: Continue with other requirements while troubleshooting specific issues
- **Communicate Clearly**: Document what's working, what's not, and what needs attention

---

**Next Steps**: Begin by examining the high-priority resources to understand current state, then proceed through the validation checkpoints for each major phase.`;
  }

  _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getAvailableTaskTypes() {
    return Object.keys(this.taskTypes);
  }

  getTemplate(taskType) {
    return this.templates[taskType];
  }
}

const __filename$1 = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));
const __dirname$1 = path.dirname(__filename$1);

// Import templates and task types (we'll need to make these Node.js compatible)
path.join(__dirname$1, '../templates/templates.js');
path.join(__dirname$1, '../templates/taskTypes.js');

const generatePrompt = (formData, taskType) => {
  {
    throw new Error('Data not initialized. Call initializeData() first.');
  }
};

/**
 * Saves the generated prompt to a file with proper directory validation and error handling
 * @param {string} prompt - The generated prompt text to save
 * @param {string} filename - Base filename to use for the output file
 * @param {string} [outputDir='./'] - Directory where the file should be saved
 * @returns {string} The full path where the file was saved
 * @throws {Error} If there's an error creating directories or writing the file
 */
const savePromptToFile = (prompt, filename, outputDir = './') => {
  try {
    // Normalize and resolve the output directory path
    const resolvedDir = path.resolve(outputDir);
    
    // Create directory recursively if it doesn't exist
    if (!fs.existsSync(resolvedDir)) {
      try {
        fs.mkdirSync(resolvedDir, { recursive: true });
      } catch (error) {
        throw new Error(`Failed to create output directory '${resolvedDir}': ${error.message}`);
      }
    }

    // Verify the directory is writable
    try {
      fs.accessSync(resolvedDir, fs.constants.W_OK);
    } catch (error) {
      throw new Error(`No write permission for directory: ${resolvedDir}`);
    }

    // Generate safe filename
    const safeFilename = `${filename.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_').toLowerCase()}_prompt.md`;
    const fullPath = path.join(resolvedDir, safeFilename);

    // Write the file
    fs.writeFileSync(fullPath, prompt, 'utf8');
    
    return fullPath;
  } catch (error) {
    // Enhance error message with more context
    throw new Error(`Failed to save prompt to file: ${error.message}`);
  }
};

class PluginManager {
  constructor() {
    this.plugins = [];
    this.customTaskTypes = {};
    this.customTemplates = {};
  }

  use(plugin) {
    this.plugins.push(plugin);
    
    // Merge custom task types
    if (plugin.taskTypes) {
      Object.assign(this.customTaskTypes, plugin.taskTypes);
    }
    
    // Merge custom templates
    if (plugin.templates) {
      Object.assign(this.customTemplates, plugin.templates);
    }
    
    return this;
  }

  getTaskTypes() {
    return { ...this.customTaskTypes };
  }

  getTemplates() {
    return { ...this.customTemplates };
  }

  hasPlugin(name) {
    return this.plugins.some(plugin => plugin.name === name);
  }
}

const createPlugin = (config) => {
  return {
    name: config.name,
    taskTypes: config.taskTypes || {},
    templates: config.templates || {},
    version: config.version || '1.0.0'
  };
};

// Main entry point for the Prompter Framework

// Version info
const VERSION = '1.0.0';

// Note: Web components are available separately in src/web/ directory
// They require React and JSX compilation for use

exports.PluginManager = PluginManager;
exports.PromptGenerator = PromptGenerator;
exports.VERSION = VERSION;
exports.complexityLevels = complexityLevels;
exports.createPlugin = createPlugin;
exports.generatePrompt = generatePrompt;
exports.priorityLevels = priorityLevels;
exports.savePromptToFile = savePromptToFile;
exports.taskTypes = taskTypes;
exports.templates = templates;
exports.validateFormData = validateFormData;
exports.validateTaskType = validateTaskType;
