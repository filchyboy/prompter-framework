import { templates } from '../data/templates.js';
import { taskTypes } from './src/data/taskTypes.js';

export const generatePrompt = (formData, taskType) => {
  // Validate template exists for the given taskType
  const template = templates[taskType];
  if (!template) {
    throw new Error(`No template found for task type: ${taskType}`);
  }

  // Ensure formData exists and has required properties
  if (!formData) {
    throw new Error('formData is required');
  }

  // Initialize arrays if they don't exist or aren't arrays
  const requirements = Array.isArray(formData.requirements) ? formData.requirements : [];
  const constraints = Array.isArray(formData.constraints) ? formData.constraints : [];
  const resources = Array.isArray(formData.resources) ? formData.resources : [];

  // Filter out empty strings and trim
  const nonEmptyRequirements = requirements.map(req => String(req).trim()).filter(Boolean);
  const nonEmptyConstraints = constraints.map(con => String(con).trim()).filter(Boolean);
  const nonEmptyResources = resources.map(res => String(res).trim()).filter(Boolean);
  
  return `# Task: ${formData.taskTitle}

## Primary Objective
**Task ID**: ${formData.taskId || 'N/A'}
**Type**: ${taskTypes[taskType]}
**Priority**: ${formData.priority ? capitalize(String(formData.priority)) : 'N/A'}
**Complexity**: ${formData.complexity ? capitalize(String(formData.complexity)) : 'N/A'}

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
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize
 * @returns {string} The capitalized string, or an empty string if input is invalid
 */
const capitalize = (str) => {
  if (typeof str !== 'string' || !str.trim()) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const exportPrompt = (prompt, filename) => {
  const element = document.createElement('a');
  const file = new Blob([prompt], { type: 'text/markdown' });
  element.href = URL.createObjectURL(file);
  element.download = `${filename.replace(/\s+/g, '_').toLowerCase()}_prompt.md`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};