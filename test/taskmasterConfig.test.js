import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { readConfig, validateConfig, updateConfig } from '../src/taskmaster/config.js';
import { execFileSync } from 'child_process';

const CONFIG_PATH = path.resolve(process.cwd(), 'taskmaster.config.json');

const backup = fs.existsSync(CONFIG_PATH) ? fs.readFileSync(CONFIG_PATH, 'utf8') : null;

beforeEach(() => {
  if (backup) fs.writeFileSync(CONFIG_PATH, backup);
});

afterEach(() => {
  if (backup) fs.writeFileSync(CONFIG_PATH, backup);
});

describe('taskmaster config helpers', () => {
  it('reads default config', () => {
    const cfg = readConfig();
    expect(cfg.defaultPriority).toBeDefined();
  });

  it('validates correct config', () => {
    const result = validateConfig({ defaultPriority: 'low', defaultComplexity: 'high' });
    expect(result.isValid).toBe(true);
  });

  it('updates config file', () => {
    const updated = updateConfig({ defaultPriority: 'high' });
    const reload = readConfig();
    expect(updated.defaultPriority).toBe('high');
    expect(reload.defaultPriority).toBe('high');
  });
});

describe('taskmaster CLI', () => {
  it('prints config', () => {
    const output = execFileSync('node', ['bin/prompter', 'taskmaster', 'get']).toString();
    const cfg = JSON.parse(output);
    expect(cfg.defaultPriority).toBeDefined();
  });

  it('sets config via CLI', () => {
    execFileSync('node', ['bin/prompter', 'taskmaster', 'set', 'defaultComplexity', 'low']);
    const cfg = readConfig();
    expect(cfg.defaultComplexity).toBe('low');
  });
});
