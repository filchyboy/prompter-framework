// Core module type definitions
import { TaskFormData, TaskTemplate, Plugin, PromptGeneratorOptions } from './index';

export declare class PromptGenerator {
  constructor(options?: PromptGeneratorOptions);
  use(plugin: Plugin): this;
  generate(formData: TaskFormData, taskType: string): string;
  getAvailableTaskTypes(): string[];
  getTemplate(taskType: string): TaskTemplate | undefined;
}
