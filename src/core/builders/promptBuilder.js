import { templates } from '../data/templates.js';
import { taskTypes } from '../data/taskTypes.js';

/**
 * Validates the form data structure and types
 * @param {Object} formData - The form data to validate
 * @throws {Error} If formData is invalid or missing required fields
 */
const validateFormData = (formData) => {
  if (!formData || typeof formData !== 'object' || Array.isArray(formData)) {
    throw new Error('formData must be an object');
  }

  const requiredArrays = ['requirements', 'constraints', 'resources'];
  const missingArrays = requiredArrays.filter(
    field => !Array.isArray(formData[field])
  );

  if (missingArrays.length > 0) {
    throw new Error(`Missing or invalid required array fields: ${missingArrays.join(', ')}`);
  }

  if (!formData.taskTitle || typeof formData.taskTitle !== 'string') {
    throw new Error('taskTitle is required and must be a string');
  }

  if (formData.priority && typeof formData.priority !== 'string') {
    throw new Error('priority must be a string');
  }

  if (formData.complexity && typeof formData.complexity !== 'string') {
    throw new Error('complexity must be a string');
  }
};

export const generatePrompt = (formData, taskType) => {
  // Input validation
  try {
    validateFormData(formData);
  } catch (error) {
    console.error('Invalid form data:', error.message);
    throw error; // Re-throw to allow calling code to handle the error
  }

  if (!taskType || !templates[taskType]) {
    throw new Error('Invalid or missing task type');
  }

  const template = templates[taskType];
  const nonEmptyRequirements = formData.requirements?.filter(req => req?.trim()) || [];
  const nonEmptyConstraints = formData.constraints?.filter(con => con?.trim()) || [];
  const nonEmptyResources = formData.resources?.filter(res => res?.trim()) || [];
  
  return `# Task: ${formData.taskTitle}

## Primary Objective
**Task ID**: ${formData.taskId || 'N/A'}
**Type**: ${taskTypes[taskType]}
**Priority**: ${capitalize(formData.priority)}
**Complexity**: ${capitalize(formData.complexity)}

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

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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