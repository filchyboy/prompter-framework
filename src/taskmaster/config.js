import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.resolve(process.cwd(), 'taskmaster.config.json');

const defaultConfig = {
  defaultPriority: 'medium',
  defaultComplexity: 'medium',
  outputDir: './prompts'
};

export function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { ...defaultConfig };
  }
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    return { ...defaultConfig, ...data };
  } catch (err) {
    throw new Error(`Failed to parse config: ${err.message}`);
  }
}

export function validateConfig(config) {
  const errors = [];
  if (config.defaultPriority && !['low', 'medium', 'high', 'critical'].includes(config.defaultPriority)) {
    errors.push('Invalid defaultPriority');
  }
  if (config.defaultComplexity && !['low', 'medium', 'high'].includes(config.defaultComplexity)) {
    errors.push('Invalid defaultComplexity');
  }
  if (config.outputDir && typeof config.outputDir !== 'string') {
    errors.push('Invalid outputDir');
  }
  return { isValid: errors.length === 0, errors };
}

export function updateConfig(updates) {
  const current = readConfig();
  const newConfig = { ...current, ...updates };
  const validation = validateConfig(newConfig);
  if (!validation.isValid) {
    throw new Error(`Config validation failed: ${validation.errors.join(', ')}`);
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2));
  return newConfig;
}

