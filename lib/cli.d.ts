// CLI module type definitions
import { TaskFormData } from './index';

export declare function generatePrompt(formData: TaskFormData, taskType: string): string;
export declare function savePromptToFile(prompt: string, filename: string, outputDir?: string): string;
export declare function initializeData(): Promise<void>;
export declare function validateTaskType(taskType: string): boolean;
export declare function getAvailableTaskTypes(): string[];
