import { describe, it, expect, beforeEach } from 'vitest';
import { PromptGenerator, validateTaskType, validateFormData } from '../src/index.js';

describe('PromptGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new PromptGenerator();
  });

  describe('constructor', () => {
    it('should create instance with default options', () => {
      expect(generator).toBeInstanceOf(PromptGenerator);
    });

    it('should accept custom options', () => {
      const customGenerator = new PromptGenerator({
        defaultPriority: 'high',
        defaultComplexity: 'low'
      });
      expect(customGenerator).toBeInstanceOf(PromptGenerator);
    });
  });

  describe('getAvailableTaskTypes', () => {
    it('should return array of task types', () => {
      const taskTypes = generator.getAvailableTaskTypes();
      expect(Array.isArray(taskTypes)).toBe(true);
      expect(taskTypes.length).toBeGreaterThan(0);
      expect(taskTypes).toContain('implementation');
      expect(taskTypes).toContain('debugging');
      expect(taskTypes).toContain('analysis');
    });
  });

  describe('generate', () => {
    const validFormData = {
      taskTitle: 'Test Task',
      requirements: ['Requirement 1', 'Requirement 2'],
      constraints: ['Constraint 1'],
      resources: ['Resource 1']
    };

    it('should generate prompt for valid input', () => {
      const prompt = generator.generate(validFormData, 'implementation');
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
      expect(prompt).toContain('Test Task');
      expect(prompt).toContain('Requirement 1');
      expect(prompt).toContain('Constraint 1');
    });

    it('should include all required sections', () => {
      const prompt = generator.generate(validFormData, 'implementation');
      expect(prompt).toContain('# Task:');
      expect(prompt).toContain('## Primary Objective');
      expect(prompt).toContain('## Core Requirements');
      expect(prompt).toContain('### Technical Constraints');
      expect(prompt).toContain('## Agent Guidance Framework');
      expect(prompt).toContain('### Context Switching Prompts');
      expect(prompt).toContain('### Validation Checkpoints');
      expect(prompt).toContain('### Failure Recovery Strategies');
    });

    it('should handle different task types', () => {
      const taskTypes = ['implementation', 'debugging', 'analysis', 'performance'];
      
      taskTypes.forEach(taskType => {
        const prompt = generator.generate(validFormData, taskType);
        expect(prompt).toContain('Test Task');
        expect(prompt.length).toBeGreaterThan(0);
      });
    });

    it('should throw error for invalid task type', () => {
      expect(() => {
        generator.generate(validFormData, 'invalid-type');
      }).toThrow('Unknown task type: invalid-type');
    });

    it('should throw error for invalid form data', () => {
      expect(() => {
        generator.generate({}, 'implementation');
      }).toThrow('Validation failed');
    });

    it('should handle custom checkpoints and failures', () => {
      const formDataWithCustom = {
        ...validFormData,
        customCheckpoints: ['Custom checkpoint'],
        customFailures: ['Custom failure scenario']
      };

      const prompt = generator.generate(formDataWithCustom, 'implementation');
      expect(prompt).toContain('Custom checkpoint');
      expect(prompt).toContain('Custom failure scenario');
    });
  });

  describe('plugin system', () => {
    it('should accept and use plugins', () => {
      const customPlugin = {
        name: 'test-plugin',
        taskTypes: { 'custom-type': 'Custom Type' },
        templates: {
          'custom-type': {
            contextSwitches: ['Custom context switch'],
            checkpoints: { 'Custom Phase': ['Custom checkpoint'] },
            failures: { 'Custom Failure': ['Custom recovery'] }
          }
        }
      };

      generator.use(customPlugin);
      
      const taskTypes = generator.getAvailableTaskTypes();
      expect(taskTypes).toContain('custom-type');

      const prompt = generator.generate({
        taskTitle: 'Custom Task',
        requirements: ['Custom requirement']
      }, 'custom-type');

      expect(prompt).toContain('Custom Task');
      expect(prompt).toContain('Custom context switch');
      expect(prompt).toContain('Custom checkpoint');
    });

    it('should return this for method chaining', () => {
      const plugin = { name: 'test', taskTypes: {}, templates: {} };
      const result = generator.use(plugin);
      expect(result).toBe(generator);
    });
  });

  describe('getTemplate', () => {
    it('should return template for valid task type', () => {
      const template = generator.getTemplate('implementation');
      expect(template).toBeDefined();
      expect(template.contextSwitches).toBeDefined();
      expect(template.checkpoints).toBeDefined();
      expect(template.failures).toBeDefined();
    });

    it('should return undefined for invalid task type', () => {
      const template = generator.getTemplate('invalid-type');
      expect(template).toBeUndefined();
    });
  });
});

describe('validation functions', () => {
  describe('validateTaskType', () => {
    it('should return true for valid task types', () => {
      expect(validateTaskType('implementation')).toBe(true);
      expect(validateTaskType('debugging')).toBe(true);
      expect(validateTaskType('analysis')).toBe(true);
    });

    it('should return false for invalid task types', () => {
      expect(validateTaskType('invalid-type')).toBe(false);
      expect(validateTaskType('')).toBe(false);
      expect(validateTaskType(null)).toBe(false);
    });
  });

  describe('validateFormData', () => {
    it('should return valid for correct form data', () => {
      const formData = {
        taskTitle: 'Valid Task',
        priority: 'medium',
        complexity: 'high'
      };

      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid for missing task title', () => {
      const formData = {
        priority: 'medium'
      };

      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Task title is required');
    });

    it('should return invalid for invalid priority', () => {
      const formData = {
        taskTitle: 'Valid Task',
        priority: 'invalid-priority'
      };

      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid priority level');
    });

    it('should return invalid for invalid complexity', () => {
      const formData = {
        taskTitle: 'Valid Task',
        complexity: 'invalid-complexity'
      };

      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid complexity level');
    });
  });
});
