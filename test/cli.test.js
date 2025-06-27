import { describe, it, expect, beforeAll } from 'vitest';
import { generatePrompt, savePromptToFile, validateTaskType, getAvailableTaskTypes, initializeData } from '../src/cli/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI Functions', () => {
  // Initialize data before all tests
  beforeAll(async () => {
    await initializeData();
  });

  describe('generatePrompt', () => {
    const validFormData = {
      taskTitle: 'CLI Test Task',
      taskId: '#CLI-001',
      priority: 'high',
      complexity: 'medium',
      requirements: ['CLI requirement 1', 'CLI requirement 2'],
      constraints: ['CLI constraint 1'],
      resources: ['CLI resource 1']
    };

    it('should generate prompt with valid data', () => {
      const prompt = generatePrompt(validFormData, 'implementation');
      
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
      expect(prompt).toContain('CLI Test Task');
      expect(prompt).toContain('#CLI-001');
      expect(prompt).toContain('High'); // capitalized priority
      expect(prompt).toContain('Medium'); // capitalized complexity
      expect(prompt).toContain('CLI requirement 1');
      expect(prompt).toContain('CLI constraint 1');
      expect(prompt).toContain('CLI resource 1');
    });

    it('should handle different task types', () => {
      const taskTypes = ['implementation', 'debugging', 'analysis'];
      
      taskTypes.forEach(taskType => {
        const prompt = generatePrompt(validFormData, taskType);
        expect(prompt).toContain('CLI Test Task');
        expect(prompt.length).toBeGreaterThan(0);
      });
    });

    it('should throw error for unknown task type', () => {
      expect(() => {
        generatePrompt(validFormData, 'unknown-type');
      }).toThrow('Unknown task type: unknown-type');
    });

    it('should handle empty arrays gracefully', () => {
      const minimalData = {
        taskTitle: 'Minimal Task',
        requirements: [],
        constraints: [],
        resources: []
      };

      const prompt = generatePrompt(minimalData, 'implementation');
      expect(prompt).toContain('Minimal Task');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should filter out empty strings from arrays', () => {
      const dataWithEmpties = {
        taskTitle: 'Filter Test',
        requirements: ['Valid requirement', '', '  ', 'Another valid requirement'],
        constraints: ['Valid constraint', ''],
        resources: ['Valid resource', '   ']
      };

      const prompt = generatePrompt(dataWithEmpties, 'implementation');
      expect(prompt).toContain('Valid requirement');
      expect(prompt).toContain('Another valid requirement');
      expect(prompt).toContain('Valid constraint');
      expect(prompt).toContain('Valid resource');
    });
  });

  describe('savePromptToFile', () => {
    const testDir = path.join(__dirname, 'temp');
    const testPrompt = '# Test Prompt\n\nThis is a test prompt for file saving.';

    // Clean up test directory before and after tests
    const cleanupTestDir = () => {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    };

    beforeEach(() => {
      cleanupTestDir();
    });

    afterEach(() => {
      cleanupTestDir();
    });

    it('should save prompt to file successfully', () => {
      const filename = 'test-task';
      const filePath = savePromptToFile(testPrompt, filename, testDir);
      
      expect(fs.existsSync(filePath)).toBe(true);
      
      const savedContent = fs.readFileSync(filePath, 'utf8');
      expect(savedContent).toBe(testPrompt);
      
      expect(path.basename(filePath)).toBe('test-task_prompt.md');
    });

    it('should create directory if it does not exist', () => {
      const nestedDir = path.join(testDir, 'nested', 'deep');
      const filename = 'nested-test';
      
      expect(fs.existsSync(nestedDir)).toBe(false);
      
      const filePath = savePromptToFile(testPrompt, filename, nestedDir);
      
      expect(fs.existsSync(nestedDir)).toBe(true);
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should sanitize filename', () => {
      const unsafeFilename = 'test/task:with*special?chars';
      const filePath = savePromptToFile(testPrompt, unsafeFilename, testDir);
      
      const basename = path.basename(filePath);
      expect(basename).toBe('testtaskwithspecialchars_prompt.md');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it('should use current directory as default', () => {
      const filename = 'default-dir-test';
      const filePath = savePromptToFile(testPrompt, filename);
      
      expect(path.dirname(filePath)).toBe(path.resolve('./'));
      expect(fs.existsSync(filePath)).toBe(true);
      
      // Clean up file in current directory
      fs.unlinkSync(filePath);
    });
  });

  describe('validateTaskType', () => {
    it('should validate correct task types', () => {
      const validTypes = ['implementation', 'debugging', 'analysis', 'documentation', 'performance', 'testing', 'refactoring'];
      
      validTypes.forEach(type => {
        expect(validateTaskType(type)).toBe(true);
      });
    });

    it('should reject invalid task types', () => {
      const invalidTypes = ['invalid', 'unknown', '', null, undefined];
      
      invalidTypes.forEach(type => {
        expect(validateTaskType(type)).toBe(false);
      });
    });
  });

  describe('getAvailableTaskTypes', () => {
    it('should return array of available task types', () => {
      const taskTypes = getAvailableTaskTypes();
      
      expect(Array.isArray(taskTypes)).toBe(true);
      expect(taskTypes.length).toBeGreaterThan(0);
      
      // Check for expected task types
      expect(taskTypes).toContain('implementation');
      expect(taskTypes).toContain('debugging');
      expect(taskTypes).toContain('analysis');
      expect(taskTypes).toContain('documentation');
      expect(taskTypes).toContain('performance');
      expect(taskTypes).toContain('testing');
      expect(taskTypes).toContain('refactoring');
    });

    it('should return consistent results', () => {
      const taskTypes1 = getAvailableTaskTypes();
      const taskTypes2 = getAvailableTaskTypes();
      
      expect(taskTypes1).toEqual(taskTypes2);
    });
  });
});
