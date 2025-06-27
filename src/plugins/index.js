export class PluginManager {
  constructor() {
    this.plugins = [];
    this.customTaskTypes = {};
    this.customTemplates = {};
  }

  use(plugin) {
    this.plugins.push(plugin);
    
    // Merge custom task types
    if (plugin.taskTypes) {
      Object.assign(this.customTaskTypes, plugin.taskTypes);
    }
    
    // Merge custom templates
    if (plugin.templates) {
      Object.assign(this.customTemplates, plugin.templates);
    }
    
    return this;
  }

  getTaskTypes() {
    return { ...this.customTaskTypes };
  }

  getTemplates() {
    return { ...this.customTemplates };
  }

  hasPlugin(name) {
    return this.plugins.some(plugin => plugin.name === name);
  }
}

export const createPlugin = (config) => {
  return {
    name: config.name,
    taskTypes: config.taskTypes || {},
    templates: config.templates || {},
    version: config.version || '1.0.0'
  };
};
