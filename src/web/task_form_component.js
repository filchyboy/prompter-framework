import React from 'react';
import { taskTypes, priorityLevels, complexityLevels } from './src/data/taskTypes.js';

const TaskForm = ({ formData, setFormData, onGenerate }) => {
  const handleInputChange = (field, value, index = null) => {
    if (index !== null) {
      const newArray = [...formData[field]];
      newArray[index] = value;
      setFormData(prev => ({ ...prev, [field]: newArray }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: prev[field].filter((_, i) => i !== index) 
    }));
  };

  const ArrayInput = ({ field, label, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleInputChange(field, e.target.value, index)}
            placeholder={`${placeholder} ${index + 1}`}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {formData[field].length > 1 && (
            <button
              onClick={() => removeArrayItem(field, index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addArrayItem(field)}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        + Add {placeholder}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
        <select 
          value={formData.taskType} 
          onChange={(e) => handleInputChange('taskType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(taskTypes).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
        <input
          type="text"
          value={formData.taskTitle}
          onChange={(e) => handleInputChange('taskTitle', e.target.value)}
          placeholder="e.g., Implement user authentication API"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task ID</label>
          <input
            type="text"
            value={formData.taskId}
            onChange={(e) => handleInputChange('taskId', e.target.value)}
            placeholder="e.g., #617"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {priorityLevels.map(level => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
        <select
          value={formData.complexity}
          onChange={(e) => handleInputChange('complexity', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {complexityLevels.map(level => (
            <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
          ))}
        </select>
      </div>

      <ArrayInput 
        field="requirements" 
        label="Core Requirements" 
        placeholder="Requirement" 
      />

      <ArrayInput 
        field="constraints" 
        label="Technical Constraints" 
        placeholder="Constraint" 
      />

      <ArrayInput 
        field="resources" 
        label="Key Resources/Files" 
        placeholder="Resource" 
      />

      <button
        onClick={onGenerate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
      >
        Generate Prompt
      </button>
    </div>
  );
};

export default TaskForm;