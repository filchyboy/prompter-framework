export function initializeData(): Promise<void>;
export function generatePrompt(formData: any, taskType: any): string;
export function savePromptToFile(prompt: string, filename: string, outputDir?: string): string;
export function validateTaskType(taskType: any): boolean;
export function getAvailableTaskTypes(): string[];
