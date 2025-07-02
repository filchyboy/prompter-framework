# Web Component Guide

This guide explains how to use the React components included in the Prompter Framework.

## Prerequisites

- Node.js 16+
- React and ReactDOM installed in your project
- A bundler that understands JSX (for example Vite or webpack)

## Importing Components

The components reside in `src/web/`. The main entry point is `main_component.js`.
Import and render it like any other React component:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import PromptGenerator from 'prompter-framework/src/web/main_component.js';

ReactDOM.createRoot(document.getElementById('root'))
  .render(<PromptGenerator />);
```

You may also import `TaskForm` and `PromptPreview` directly from the same directory if you need more control.

## Building and Bundling

The source files use JSX and modern JavaScript syntax. You will need a bundler
or build tool to compile them for the browser. Using Vite as an example:

1. Install the dependencies:

```bash
npm install react react-dom
npm install -D vite @vitejs/plugin-react
```

2. Create a minimal `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
```

3. Copy `src/web/index.html` as a starting template, mount the `PromptGenerator`
component in your entry file, and run:

```bash
npx vite
```

to start a development server. Run `npx vite build` to produce a production
bundle. The same approach works with webpack or other React toolchains.

