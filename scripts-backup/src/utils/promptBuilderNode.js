import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import templates and task types (we'll need to make these Node.js compatible)
const templatesPath = path.join(__dirname, '../data/templates.js');
const taskTypesPath = path.join(__dirname, '../data/taskTypes.js');

// Dynamic imports for ES modules
let templates, taskTypes;

export const initializeData = async () => {
  const templatesModule = await import('../data/templates.js');
  const taskTypesModule = await import('../data/taskTypes.js');
  
  templates = templatesModule.templates;
  taskTypes = taskTypesModule.taskTypes;
};

export const generatePrompt = (formData, taskType) => {
  if (!templates || !taskTypes) {
    throw new Error('Data not initialized. Call initializeData() first.');
  }
  
  const template = templates[taskType];
  if (!template) {
    throw new Error(`Unknown task type: ${taskType}`);
  }
  
  const nonEmptyRequirements = (formData.requirements || []).filter(req => req.trim());
  const nonEmptyConstraints = (formData.constraints || []).filter(con => con.trim());
  const nonEmptyResources = (formData.resources || []).filter(res => res.trim());
  
  return `# Task: ${formData.taskTitle}

## Primary Objective
**Task ID**: ${formData.taskId || 'N/A'}
**Type**: ${taskTypes[taskType]}
**Priority**: ${capitalize(formData.priority || 'medium')}
**Complexity**: ${capitalize(formData.complexity || 'medium')}

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

/**
 * Saves the generated prompt to a file with proper directory validation and error handling
 * @param {string} prompt - The generated prompt text to save
 * @param {string} filename - Base filename to use for the output file
 * @param {string} [outputDir='./'] - Directory where the file should be saved
 * @returns {string} The full path where the file was saved
 * @throws {Error} If there's an error creating directories or writing the file
 */
export const savePromptToFile = (prompt, filename, outputDir = './') => {
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

export const validateTaskType = (taskType) => {
  if (!taskTypes) {
    throw new Error('Data not initialized. Call initializeData() first.');
  }
  return Object.keys(taskTypes).includes(taskType);
};

export const getAvailableTaskTypes = () => {
  if (!taskTypes) {
    throw new Error('Data not initialized. Call initializeData() first.');
  }
  return Object.keys(taskTypes);
};
