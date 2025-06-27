import { describe, it, expect, beforeEach } from 'vitest';
import { PluginManager, createPlugin } from '../src/index.js';

describe('Plugin System', () => {
  describe('createPlugin', () => {
    it('should create a valid plugin object', () => {
      const plugin = createPlugin({
        name: 'test-plugin',
        taskTypes: { 'test-type': 'Test Type' },
        templates: {
          'test-type': {
            contextSwitches: ['Test context'],
            checkpoints: { 'Test Phase': ['Test checkpoint'] },
            failures: { 'Test Failure': ['Test recovery'] }
          }
        }
      });

      expect(plugin.name).toBe('test-plugin');
      expect(plugin.taskTypes).toBeDefined();
      expect(plugin.templates).toBeDefined();
      expect(plugin.version).toBe('1.0.0'); // default version
    });

    it('should handle minimal plugin configuration', () => {
      const plugin = createPlugin({
        name: 'minimal-plugin'
      });

      expect(plugin.name).toBe('minimal-plugin');
      expect(plugin.taskTypes).toEqual({});
      expect(plugin.templates).toEqual({});
    });

    it('should preserve custom version', () => {
      const plugin = createPlugin({
        name: 'versioned-plugin',
        version: '2.1.0'
      });

      expect(plugin.version).toBe('2.1.0');
    });
  });

  describe('PluginManager', () => {
    let manager;

    beforeEach(() => {
      manager = new PluginManager();
    });

    it('should create empty plugin manager', () => {
      expect(manager).toBeInstanceOf(PluginManager);
      expect(manager.getTaskTypes()).toEqual({});
      expect(manager.getTemplates()).toEqual({});
    });

    it('should add plugins and merge task types', () => {
      const plugin1 = createPlugin({
        name: 'plugin1',
        taskTypes: { 'type1': 'Type 1' }
      });

      const plugin2 = createPlugin({
        name: 'plugin2',
        taskTypes: { 'type2': 'Type 2' }
      });

      manager.use(plugin1).use(plugin2);

      const taskTypes = manager.getTaskTypes();
      expect(taskTypes).toEqual({
        'type1': 'Type 1',
        'type2': 'Type 2'
      });
    });

    it('should merge templates from multiple plugins', () => {
      const plugin1 = createPlugin({
        name: 'plugin1',
        templates: {
          'type1': {
            contextSwitches: ['Context 1'],
            checkpoints: { 'Phase 1': ['Checkpoint 1'] },
            failures: { 'Failure 1': ['Recovery 1'] }
          }
        }
      });

      const plugin2 = createPlugin({
        name: 'plugin2',
        templates: {
          'type2': {
            contextSwitches: ['Context 2'],
            checkpoints: { 'Phase 2': ['Checkpoint 2'] },
            failures: { 'Failure 2': ['Recovery 2'] }
          }
        }
      });

      manager.use(plugin1).use(plugin2);

      const templates = manager.getTemplates();
      expect(templates.type1).toBeDefined();
      expect(templates.type2).toBeDefined();
      expect(templates.type1.contextSwitches).toContain('Context 1');
      expect(templates.type2.contextSwitches).toContain('Context 2');
    });

    it('should track installed plugins', () => {
      const plugin = createPlugin({ name: 'tracked-plugin' });
      
      expect(manager.hasPlugin('tracked-plugin')).toBe(false);
      
      manager.use(plugin);
      
      expect(manager.hasPlugin('tracked-plugin')).toBe(true);
      expect(manager.hasPlugin('non-existent')).toBe(false);
    });

    it('should return this for method chaining', () => {
      const plugin = createPlugin({ name: 'chainable' });
      const result = manager.use(plugin);
      expect(result).toBe(manager);
    });

    it('should handle plugins without task types or templates', () => {
      const plugin = createPlugin({ name: 'empty-plugin' });
      
      expect(() => manager.use(plugin)).not.toThrow();
      expect(manager.getTaskTypes()).toEqual({});
      expect(manager.getTemplates()).toEqual({});
    });
  });

  describe('Plugin Integration', () => {
    it('should create comprehensive security plugin', () => {
      const securityPlugin = createPlugin({
        name: 'security-audit',
        version: '1.2.0',
        taskTypes: {
          'security-audit': 'Security Audit',
          'penetration-test': 'Penetration Testing',
          'vulnerability-scan': 'Vulnerability Scanning'
        },
        templates: {
          'security-audit': {
            contextSwitches: [
              'Before assessment: Review security requirements and compliance standards',
              'During audit: Focus on vulnerability identification and risk assessment',
              'After findings: Prioritize vulnerabilities by risk and impact'
            ],
            checkpoints: {
              'Pre-Assessment': [
                'Are security requirements clearly defined?',
                'Have I identified all systems in scope?',
                'Are compliance requirements documented?'
              ],
              'During Assessment': [
                'Am I following established testing methodologies?',
                'Have I documented all findings with evidence?',
                'Am I testing within authorized scope?'
              ],
              'Post-Assessment': [
                'Are all vulnerabilities properly categorized?',
                'Have I provided clear remediation steps?',
                'Is the risk assessment complete?'
              ]
            },
            failures: {
              'If Access Is Denied': [
                'Verify authorization and scope',
                'Check network connectivity and credentials',
                'Document access limitations',
                'Proceed with available testing methods'
              ],
              'If Vulnerabilities Are Complex': [
                'Break down into smaller components',
                'Research similar vulnerabilities',
                'Consult security databases and advisories',
                'Document findings clearly with risk assessment'
              ]
            }
          }
        }
      });

      expect(securityPlugin.name).toBe('security-audit');
      expect(securityPlugin.version).toBe('1.2.0');
      expect(Object.keys(securityPlugin.taskTypes)).toHaveLength(3);
      expect(securityPlugin.templates['security-audit']).toBeDefined();
      expect(securityPlugin.templates['security-audit'].contextSwitches).toHaveLength(3);
      expect(Object.keys(securityPlugin.templates['security-audit'].checkpoints)).toHaveLength(3);
      expect(Object.keys(securityPlugin.templates['security-audit'].failures)).toHaveLength(2);
    });
  });
});
