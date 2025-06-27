import { taskTypes } from '../templates/taskTypes.js';

export const validateTaskType = (taskType) => {
  return Object.keys(taskTypes).includes(taskType);
};

export const validateFormData = (formData) => {
  const errors = [];
  
  if (!formData.taskTitle || formData.taskTitle.trim() === '') {
    errors.push('Task title is required');
  }
  
  if (formData.priority && !['low', 'medium', 'high', 'critical'].includes(formData.priority)) {
    errors.push('Invalid priority level');
  }
  
  if (formData.complexity && !['low', 'medium', 'high'].includes(formData.complexity)) {
    errors.push('Invalid complexity level');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
