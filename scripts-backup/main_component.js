import React, { useState } from 'react';
import TaskForm from './TaskForm.js';
import PromptPreview from './PromptPreview.js';
import { generatePrompt } from '../utils/promptBuilder.js';

const PromptGenerator = () => {
  const [formData, setFormData] = useState({
    taskType: 'implementation',
    taskTitle: '',
    taskId: '',
    priority: 'medium',
    complexity: 'medium',
    requirements: ['', '', ''],
    constraints: ['', ''],
    resources: ['', ''],
    customCheckpoints: [],
    customFailures: []
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleGenerate = () => {
    try {
      const prompt = generatePrompt(formData, formData.taskType);
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
      setGeneratedPrompt('Error: Failed to generate prompt. Please check the console for details.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">AI Agent Prompt Generator</h1>
        <p className="text-gray-600">
          Create structured prompts using the meta-framework for consistent AI agent performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TaskForm 
          formData={formData}
          setFormData={setFormData}
          onGenerate={handleGenerate}
        />
        
        <PromptPreview 
          generatedPrompt={generatedPrompt}
          taskType={formData.taskType}
          taskTitle={formData.taskTitle}
        />
      </div>
      
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Pro Tips:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Be specific in requirements - vague requirements lead to vague outputs</li>
          <li>• Include file paths and relevant resources for better context</li>
          <li>• The more detailed your constraints, the better the agent will perform</li>
          <li>• Consider adding custom checkpoints for domain-specific validation</li>
          <li>• Test your generated prompts on simple tasks first</li>
        </ul>
      </div>
    </div>
  );
};

export default PromptGenerator;