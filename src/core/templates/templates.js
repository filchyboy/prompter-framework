export const templates = {
  implementation: {
    contextSwitches: [
      'Before design: Review Core Requirements to ensure complete feature understanding',
      'Before coding: Check Technical Constraints for architecture compliance',
      'During implementation: Reference existing patterns for consistency',
      'Before testing: Return to requirements to verify complete coverage'
    ],
    checkpoints: {
      'Before Design Phase': [
        'Do I understand all functional requirements?',
        'Have I identified integration points with existing system?',
        'Are performance requirements clear and measurable?'
      ],
      'During Implementation': [
        'Does my code follow established patterns and conventions?',
        'Am I handling error cases and edge conditions?',
        'Is my implementation modular and maintainable?'
      ],
      'Before Testing': [
        'Have I covered unit, integration, and user acceptance testing?',
        'Are my tests realistic and comprehensive?',
        'Does my implementation handle failure scenarios gracefully?'
      ]
    },
    failures: {
      'If Requirements Are Unclear': [
        'Immediate: Document specific questions and assumptions',
        'Research: Check similar existing features for patterns',
        'Clarify: Seek clarification on ambiguous requirements',
        'Continue: Implement core functionality, defer edge cases'
      ],
      'If Technical Integration Fails': [
        'Isolate: Test new feature in isolation first',
        'Investigate: Check existing integration patterns',
        'Alternative: Consider different integration approach',
        'Fallback: Implement as standalone feature with future integration plan'
      ]
    }
  },

  debugging: {
    contextSwitches: [
      'Before investigation: Confirm problem reproduction steps are reliable',
      'During analysis: Switch between symptom observation and cause hypothesis',
      'Before implementing fix: Verify root cause understanding is complete',
      'After fix: Test both the specific issue and potential regression areas'
    ],
    checkpoints: {
      'Before Investigation': [
        'Can I reliably reproduce the issue?',
        'Do I understand the expected vs. actual behavior?',  
        'Have I gathered all relevant error logs/data?'
      ],
      'During Root Cause Analysis': [
        'Have I eliminated obvious causes first?',
        'Am I testing hypotheses systematically?',
        'Have I considered environmental factors?'
      ],
      'Before Fix Implementation': [
        'Do I understand why the issue occurs?',
        'Will my fix address the root cause, not just symptoms?',
        'Have I considered impact on other system components?'
      ]
    },
    failures: {
      'If Issue Cannot Be Reproduced': [
        'Gather: Collect more detailed reproduction steps from reporter',
        'Environment: Check for environment-specific factors',
        'Data: Examine production data that might trigger the issue',
        'Continue: Work with available information, document assumptions'
      ],
      'If Root Cause Remains Unclear': [
        'Isolate: Break down the problem into smaller components',
        'Test: Create minimal test cases for each component',
        'Research: Check for similar issues in documentation/forums',
        'Document: Record findings and continue with partial understanding'
      ]
    }
  },

  analysis: {
    contextSwitches: [
      'During data collection: Ensure data quality before proceeding to analysis',
      'During analysis: Switch between detailed examination and big-picture patterns',
      'Before conclusions: Validate findings against original objectives',
      'Before presentation: Consider audience perspective and needs'
    ],
    checkpoints: {
      'Before Analysis': [
        'Is my data complete and representative?',
        'Have I chosen appropriate analysis methods?',
        'Are my assumptions clearly documented?'
      ],
      'During Analysis': [
        'Am I avoiding confirmation bias?',
        'Are my methods producing reliable results?',
        'Have I considered alternative explanations?'
      ],
      'Before Conclusions': [
        'Do my findings answer the original questions?',
        'Are my conclusions supported by evidence?',
        'Have I identified limitations and uncertainties?'
      ]
    },
    failures: {
      'If Data Quality Is Poor': [
        'Assess: Determine what data is reliable',
        'Clean: Apply appropriate data cleaning techniques',
        'Adjust: Modify analysis approach for available data quality',
        'Document: Note limitations in findings'
      ],
      'If Analysis Reveals No Clear Patterns': [
        'Reframe: Consider different analytical approaches',
        'Segment: Break data into smaller, more homogeneous groups',
        'Context: Add external context or historical comparison',
        'Value: Document the negative finding as valuable information'
      ]
    }
  },

  performance: {
    contextSwitches: [
      'Before analysis: Review current performance baselines to understand the problem scope',
      'During investigation: Switch between query-level analysis and system-wide impact assessment',
      'Before optimization: Validate root cause understanding against Technical Constraints',
      'After optimization: Monitor real-world impact against baseline measurements'
    ],
    checkpoints: {
      'Before Performance Analysis': [
        'Do I have reliable baseline metrics for current performance?',
        'Have I identified which specific user scenarios are most affected?',
        'Are my measurement tools capturing the right metrics?'
      ],
      'During Root Cause Investigation': [
        'Have I profiled both database and application-level performance?',
        'Am I considering both query efficiency and data volume issues?',
        'Are there multiple contributing factors I need to address?'
      ],
      'Before Implementation': [
        'Will my proposed changes meet the performance targets consistently?',
        'Have I considered the impact on other parts of the system?',
        'Do I have a rollback plan if the optimization causes issues?'
      ]
    },
    failures: {
      'If Performance Analysis Shows No Clear Bottleneck': [
        'Expand Scope: Look beyond database queries to network, caching, and frontend issues',
        'Segment Analysis: Break down performance by user types, data sizes, and usage patterns',
        'Environment Check: Compare production vs. staging performance characteristics',
        'Continue: Focus on most promising optimization opportunities while gathering more data'
      ],
      'If Optimization Breaks Existing Functionality': [
        'Immediate Rollback: Revert changes and assess what went wrong',
        'Isolate Impact: Identify which specific changes caused the regression',
        'Alternative Approach: Try different optimization strategy that preserves functionality',
        'Staged Deployment: Implement changes in smaller, testable increments'
      ]
    }
  }
};