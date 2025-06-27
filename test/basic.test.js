// Basic tests for Prompter Framework
import { PromptGenerator, taskTypes, validateTaskType } from '../src/index.js';

// Test 1: Basic prompt generation
console.log('Testing basic prompt generation...');
const generator = new PromptGenerator();

try {
  const prompt = generator.generate({
    taskTitle: 'Test Task',
    requirements: ['Test requirement 1', 'Test requirement 2'],
    constraints: ['Test constraint']
  }, 'implementation');
  
  if (prompt.includes('Test Task') && prompt.includes('Test requirement 1')) {
    console.log('✅ Basic prompt generation works');
  } else {
    console.log('❌ Basic prompt generation failed');
  }
} catch (error) {
  console.log('❌ Basic prompt generation error:', error.message);
}

// Test 2: Task type validation
console.log('Testing task type validation...');
if (validateTaskType('implementation') && !validateTaskType('invalid-type')) {
  console.log('✅ Task type validation works');
} else {
  console.log('❌ Task type validation failed');
}

// Test 3: Available task types
console.log('Testing available task types...');
const availableTypes = generator.getAvailableTaskTypes();
if (availableTypes.includes('implementation') && availableTypes.includes('debugging')) {
  console.log('✅ Available task types works');
} else {
  console.log('❌ Available task types failed');
}

// Test 4: Plugin system
console.log('Testing plugin system...');
try {
  const customPlugin = {
    name: 'test-plugin',
    taskTypes: { 'custom-type': 'Custom Type' },
    templates: {
      'custom-type': {
        contextSwitches: ['Test context switch'],
        checkpoints: { 'Test Phase': ['Test checkpoint'] },
        failures: { 'Test Failure': ['Test recovery'] }
      }
    }
  };
  
  generator.use(customPlugin);
  const customPrompt = generator.generate({
    taskTitle: 'Custom Task',
    requirements: ['Custom requirement']
  }, 'custom-type');
  
  if (customPrompt.includes('Custom Task') && customPrompt.includes('Test context switch')) {
    console.log('✅ Plugin system works');
  } else {
    console.log('❌ Plugin system failed');
  }
} catch (error) {
  console.log('❌ Plugin system error:', error.message);
}

console.log('\nAll tests completed!');
