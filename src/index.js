// Main entry point for the Prompter Framework
export { PromptGenerator } from './core/builders/promptGenerator.js';
export { taskTypes, priorityLevels, complexityLevels } from './core/templates/taskTypes.js';
export { templates } from './core/templates/templates.js';
export { validateTaskType, validateFormData } from './core/validators/index.js';

// Re-export CLI for programmatic use
export { generatePrompt, savePromptToFile } from './cli/index.js';

// Plugin system
export { PluginManager, createPlugin } from './plugins/index.js';

// Version info
export const VERSION = '1.0.0';
