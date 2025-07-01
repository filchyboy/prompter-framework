# AI Prompt Generator Package

## Package Structure
```directory
ai-prompt-generator/
├── package.json
├── src/
│   ├── index.js
│   ├── components/
│   │   ├── PromptGenerator.js
│   │   ├── TaskForm.js
│   │   ├── PromptPreview.js
│   │   └── TemplateSelector.js
│   ├── data/
│   │   ├── templates.js
│   │   └── taskTypes.js
│   ├── utils/
│   │   ├── promptBuilder.js
│   │   └── validators.js
│   └── styles/
│       └── index.css
├── public/
│   └── index.html
└── README.md
```

## Installation Instructions

1. Create a new directory: `mkdir ai-prompt-generator && cd ai-prompt-generator`
2. Initialize npm: `npm init -y`
3. Install dependencies: `npm install react react-dom lucide-react`
4. Install dev dependencies: `npm install -D @vitejs/plugin-react vite`
5. Copy the files I'll provide below
6. Run: `npm run dev`

## File Contents Below

Each component is designed to be:
- **Self-contained**: Minimal dependencies between components
- **Focused**: Single responsibility per component
- **Testable**: Easy to unit test individual pieces
- **Maintainable**: Clear separation of concerns