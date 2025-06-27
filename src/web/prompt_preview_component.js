import React from 'react';
import { Copy, Download } from 'lucide-react';
import { exportPrompt, copyToClipboard } from '../utils/promptBuilder.js';
import { templates } from '../data/templates.js';
import { taskTypes } from './src/data/taskTypes.js';

const PromptPreview = ({ generatedPrompt, taskType, taskTitle }) => {
  const handleCopy = async () => {
    const success = await copyToClipboard(generatedPrompt);
    if (success) {
      // You could add a toast notification here
      console.log('Copied to clipboard!');
    }
  };

  const handleDownload = () => {
    exportPrompt(generatedPrompt, taskTitle || 'prompt');
  };

  const template = templates[taskType] || {};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Generated Prompt</h2>
        {generatedPrompt && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
            >
              <Copy size={16} />
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        )}
      </div>
      
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50 h-96 overflow-y-auto">
        {generatedPrompt ? (
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
            {generatedPrompt}
          </pre>
        ) : (
          <p className="text-gray-500 italic">
            Fill out the form and click "Generate Prompt" to see your structured prompt here.
          </p>
        )}
      </div>
      
      {generatedPrompt && template && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="font-medium text-blue-800 mb-2">Template Features Used:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• {template.contextSwitches?.length || 0} context switching prompts</li>
            <li>• {Object.keys(template.checkpoints || {}).length} checkpoint phases</li>
            <li>• {Object.keys(template.failures || {}).length} failure recovery scenarios</li>
            <li>• Adaptive complexity based on {taskTypes[taskType]} task type</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PromptPreview;