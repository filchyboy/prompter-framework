# Plugin System

The framework supports plugins that add new task types and templates.

## `PluginManager`

```javascript
import { PluginManager } from 'prompter-framework';
```

### Methods

- `use(plugin)` – register a plugin object. Returns the manager instance.
- `getTaskTypes()` – returns a map of all custom task types provided by plugins.
- `getTemplates()` – returns a map of custom templates.
- `hasPlugin(name)` – checks whether a plugin with `name` is registered.

## `createPlugin(config)`

Helper to create plugin objects.
`config` should include:

- `name` – unique plugin name
- `taskTypes` – map of task type keys to display names
- `templates` – map of task type keys to template definitions

```javascript
import { createPlugin } from 'prompter-framework';

const myPlugin = createPlugin({
  name: 'security-audit',
  taskTypes: {
    'security-audit': 'Security Audit'
  },
  templates: {
    'security-audit': { /* template data */ }
  }
});
```

Use `PluginManager` or `PromptGenerator#use` to register the plugin.
