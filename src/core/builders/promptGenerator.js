import { templates } from '../templates/templates.js';
import { taskTypes } from '../templates/taskTypes.js';
import { validateTaskType, validateFormData } from '../validators/index.js';

export class PromptGenerator {
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
