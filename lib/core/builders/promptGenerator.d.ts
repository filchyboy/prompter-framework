export class PromptGenerator {
    constructor(options?: {});
    templates: {
        implementation: {
            contextSwitches: string[];
            checkpoints: {
                'Before Design Phase': string[];
                'During Implementation': string[];
                'Before Testing': string[];
            };
            failures: {
                'If Requirements Are Unclear': string[];
                'If Technical Integration Fails': string[];
            };
        };
        debugging: {
            contextSwitches: string[];
            checkpoints: {
                'Before Investigation': string[];
                'During Root Cause Analysis': string[];
                'Before Fix Implementation': string[];
            };
            failures: {
                'If Issue Cannot Be Reproduced': string[];
                'If Root Cause Remains Unclear': string[];
            };
        };
        analysis: {
            contextSwitches: string[];
            checkpoints: {
                'Before Analysis': string[];
                'During Analysis': string[];
                'Before Conclusions': string[];
            };
            failures: {
                'If Data Quality Is Poor': string[];
                'If Analysis Reveals No Clear Patterns': string[];
            };
        };
        performance: {
            contextSwitches: string[];
            checkpoints: {
                'Before Performance Analysis': string[];
                'During Root Cause Investigation': string[];
                'Before Implementation': string[];
            };
            failures: {
                'If Performance Analysis Shows No Clear Bottleneck': string[];
                'If Optimization Breaks Existing Functionality': string[];
            };
        };
    };
    taskTypes: {
        implementation: string;
        debugging: string;
        analysis: string;
        code_review: string;
        documentation: string;
        performance: string;
        testing: string;
        refactoring: string;
    };
    plugins: any[];
    config: {
        defaultPriority: string;
        defaultComplexity: string;
    };
    use(plugin: any): this;
    generate(formData: any, taskType: any): string;
    _buildPrompt(formData: any, taskType: any, template: any): string;
    _capitalize(str: any): any;
    getAvailableTaskTypes(): string[];
    getTemplate(taskType: any): any;
}
