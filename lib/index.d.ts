// Type definitions for Prompter Framework

export interface TaskFormData {
  taskTitle: string;
  taskId?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  complexity?: 'low' | 'medium' | 'high';
  requirements?: string[];
  constraints?: string[];
  resources?: string[];
  customCheckpoints?: string[];
  customFailures?: string[];
}

export interface TaskTemplate {
  contextSwitches: string[];
  checkpoints: Record<string, string[]>;
  failures: Record<string, string[]>;
}

export interface Plugin {
  name: string;
  version?: string;
  taskTypes?: Record<string, string>;
  templates?: Record<string, TaskTemplate>;
}

export interface PromptGeneratorOptions {
  defaultPriority?: 'low' | 'medium' | 'high' | 'critical';
  defaultComplexity?: 'low' | 'medium' | 'high';
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export declare class PromptGenerator {
  constructor(options?: PromptGeneratorOptions);
  use(plugin: Plugin): this;
  generate(formData: TaskFormData, taskType: string): string;
  getAvailableTaskTypes(): string[];
  getTemplate(taskType: string): TaskTemplate | undefined;
}

export declare class PluginManager {
  constructor();
  use(plugin: Plugin): this;
  getTaskTypes(): Record<string, string>;
  getTemplates(): Record<string, TaskTemplate>;
  hasPlugin(name: string): boolean;
}

export declare function createPlugin(config: Plugin): Plugin;

export declare function validateTaskType(taskType: string): boolean;
export declare function validateFormData(formData: TaskFormData): ValidationResult;

export declare function generatePrompt(formData: TaskFormData, taskType: string): string;
export declare function savePromptToFile(prompt: string, filename: string, outputDir?: string): string;
export declare function initializeData(): Promise<void>;
export declare function getAvailableTaskTypes(): string[];

export declare const taskTypes: Record<string, string>;
export declare const templates: Record<string, TaskTemplate>;
export declare const priorityLevels: string[];
export declare const complexityLevels: string[];

export declare const VERSION: string;
