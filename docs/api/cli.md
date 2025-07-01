# CLI Commands

The `prompter` binary provides access to prompt generation and configuration utilities.

```bash
npx prompter-framework <command> [options]
```

## `generate`

Generate an AI agent prompt from command line arguments or a JSON file.

### Options

- `-t, --type <type>` – task type to use
- `-T, --title <title>` – task title
- `-i, --id <id>` – optional task ID
- `-p, --priority <level>` – priority (`low`, `medium`, `high`, `critical`)
- `-c, --complexity <level>` – complexity (`low`, `medium`, `high`)
- `-r, --requirements <items...>` – one or more core requirements
- `-C, --constraints <items...>` – technical constraints
- `-R, --resources <items...>` – resource references
- `-o, --output <file>` – write the prompt to a file
- `-j, --json <file>` – load task data from a JSON template
- `--list-types` – print available task types

### Example

```bash
prompter generate \
  --type implementation \
  --title "Add MFA" \
  --requirements "TOTP" "SMS backup" \
  --constraints "Integrate with existing auth"
```

## `template`

Create a JSON template for task input.

### Options

- `-t, --type <type>` – task type for the template (default `implementation`)
- `-o, --output <file>` – file path for the generated template (default `task-template.json`)

### Example

```bash
prompter template --type debugging --output debug.json
```

## `taskmaster`

Utility commands for the bundled Task Master integration.

### `get [key]`

View configuration values. Without a key, prints the entire config.

```bash
prompter taskmaster get
```

### `set <key> <value>`

Update a configuration value.

```bash
prompter taskmaster set DEFAULT_PRIORITY high
```
