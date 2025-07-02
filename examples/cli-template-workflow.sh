#!/bin/bash
# CLI template generation workflow example for Prompter Framework
#
# This script demonstrates how to:
#   1. Create a JSON template using the CLI
#   2. Fill in the template with task details
#   3. Generate a prompt from the completed template

set -e

# Step 1: Generate a template for an implementation task
prompter template --type implementation --output task-template.json

echo "\nEdit 'task-template.json' to add your specific requirements and constraints."

echo "Press Enter to continue after editing..."
read

# Step 2: Generate the prompt from the filled template
prompter generate --json task-template.json --output prompt.txt

echo "\nPrompt written to 'prompt.txt':\n"
cat prompt.txt
