# PromptGenerator Class

The `PromptGenerator` class is the main interface for creating task prompts programmatically.

```javascript
import { PromptGenerator } from 'prompter-framework';
```

## Constructor

```javascript
const generator = new PromptGenerator(options?);
```

- `options.defaultPriority` – default priority for tasks (`low`, `medium`, `high`, `critical`)
- `options.defaultComplexity` – default complexity (`low`, `medium`, `high`)

## Methods

### `use(plugin)`

Registers a plugin and merges its task types and templates.
Returns the generator instance for chaining.

### `generate(formData, taskType)`

Validates the provided data and builds a prompt using the template for `taskType`.
Throws an error when validation fails or the task type is unknown.

### `getAvailableTaskTypes()`

Returns an array of all task type keys currently available, including those provided by plugins.

### `getTemplate(taskType)`

Returns the template object for `taskType` if it exists.

## Example

```javascript
const generator = new PromptGenerator();
const prompt = generator.generate({
  taskTitle: 'Add Multi-Factor Authentication',
  requirements: ['TOTP support', 'SMS backup'],
  constraints: ['Must integrate with existing auth system']
}, 'implementation');

console.log(prompt);
```
