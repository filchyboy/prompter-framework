# Plugin Development Guide

This guide explains how to create custom plugins for the Prompter Framework.

## Plugin Structure

A plugin is a JavaScript object with the following structure:

```javascript
const myPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  taskTypes: {
    'custom-task': 'Custom Task Type'
  },
  templates: {
    'custom-task': {
      contextSwitches: [
        'Context switch prompt 1',
        'Context switch prompt 2'
      ],
      checkpoints: {
        'Phase Name': [
          'Checkpoint question 1',
          'Checkpoint question 2'
        ]
      },
      failures: {
        'Failure Scenario': [
          'Recovery step 1',
          'Recovery step 2'
        ]
      }
    }
  }
};
```

## Creating a Plugin

Use the `createPlugin` helper function:

```javascript
import { createPlugin } from '@filchyboy/prompter-framework';

const securityPlugin = createPlugin({
  name: 'security-audit',
  taskTypes: {
    'security-audit': 'Security Audit',
    'penetration-test': 'Penetration Testing'
  },
  templates: {
    'security-audit': {
      contextSwitches: [
        'Before assessment: Review security requirements and compliance standards',
        'During audit: Focus on vulnerability identification and risk assessment',
        'After findings: Prioritize vulnerabilities by risk and impact'
      ],
      checkpoints: {
        'Before Assessment': [
          'Do I understand the security requirements?',
          'Have I identified all systems in scope?',
          'Are compliance requirements clear?'
        ],
        'During Audit': [
          'Am I following established testing methodologies?',
          'Have I documented all findings with evidence?',
          'Am I testing within authorized scope?'
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
```

## Using Plugins

```javascript
import { PromptGenerator } from '@filchyboy/prompter-framework';

const generator = new PromptGenerator();
generator.use(securityPlugin);

// Now you can use the custom task types
const prompt = generator.generate({
  taskTitle: 'Web Application Security Assessment',
  requirements: [
    'OWASP Top 10 testing',
    'Authentication bypass testing',
    'SQL injection testing'
  ],
  constraints: [
    'Testing must be non-destructive',
    'Must not access production data',
    'Testing window: 9 AM - 5 PM EST'
  ]
}, 'security-audit');
```

## Best Practices

1. **Descriptive Names**: Use clear, descriptive names for task types
2. **Comprehensive Templates**: Include relevant context switches, checkpoints, and failure scenarios
3. **Domain Expertise**: Leverage domain-specific knowledge in your templates
4. **Consistent Structure**: Follow the established template structure
5. **Documentation**: Document your plugin's purpose and usage

## Example Plugins

### DevOps Plugin

```javascript
const devopsPlugin = createPlugin({
  name: 'devops-operations',
  taskTypes: {
    'deployment': 'Deployment',
    'infrastructure': 'Infrastructure Management',
    'monitoring': 'Monitoring Setup'
  },
  templates: {
    'deployment': {
      contextSwitches: [
        'Before deployment: Verify all prerequisites and rollback plan',
        'During deployment: Monitor system health and performance metrics',
        'After deployment: Validate functionality and update documentation'
      ],
      checkpoints: {
        'Pre-Deployment': [
          'Are all dependencies updated?',
          'Is the rollback plan tested?',
          'Have stakeholders been notified?'
        ]
      },
      failures: {
        'If Deployment Fails': [
          'Execute rollback plan immediately',
          'Capture logs and error details',
          'Notify stakeholders of status',
          'Investigate root cause'
        ]
      }
    }
  }
});
```

### Data Science Plugin

```javascript
const dataSciencePlugin = createPlugin({
  name: 'data-science',
  taskTypes: {
    'data-analysis': 'Data Analysis',
    'model-training': 'Model Training',
    'feature-engineering': 'Feature Engineering'
  },
  templates: {
    'data-analysis': {
      contextSwitches: [
        'Before analysis: Understand data sources and quality',
        'During analysis: Balance exploration with hypothesis testing',
        'Before conclusions: Validate findings with statistical tests'
      ],
      checkpoints: {
        'Data Quality': [
          'Have I checked for missing values?',
          'Are there outliers that need attention?',
          'Is the data representative of the population?'
        ]
      },
      failures: {
        'If Data Quality Is Poor': [
          'Document data quality issues',
          'Implement data cleaning procedures',
          'Consider alternative data sources',
          'Adjust analysis methods accordingly'
        ]
      }
    }
  }
});
```
