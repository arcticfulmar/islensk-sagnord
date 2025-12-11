# Quick Start Guide

## First Time Setup

**Install dependencies:**
```bash
npm install
```

This will install all React app dependencies in the `client` folder.

## Running the Application

### Development Mode

Run the React app in development mode:
```bash
npm start
```

This will start the React development server on http://localhost:3000

Open http://localhost:3000 in your browser.

## Production Build

Build the React app for production:
```bash
npm run build
```

This creates an optimized production build in `client/build/` ready for deployment.

To test the production build locally:
```bash
cd client/build
npx serve -s .
```

## Deployment

The application is now a single-page React app with no backend server required. You can deploy the `client/build` folder to any static hosting service:

- **Netlify**: Drag and drop the `client/build` folder
- **Vercel**: Run `vercel` in the project root
- **GitHub Pages**: Push the build folder to a `gh-pages` branch
- **Any static host**: Upload the contents of `client/build`

## Project Structure

```
islensk-sagnord/
├── package.json              # Root package scripts
├── README.md                 # Main documentation
├── QUICKSTART.md            # This file
└── client/
    ├── package.json         # React app dependencies
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js
        ├── App.css
        ├── components/
        │   ├── Overview.js          # Main verb list page
        │   ├── VerbConjugation.js   # Conjugation tables
        │   ├── VerbPractice.js      # Practice mode
        │   └── Footer.js
        ├── data/
        │   └── sagnord/            # Verb JSON files
        │       ├── vera.json
        │       ├── hafa.json
        │       ├── fara.json
        │       └── ... (25 verbs total)
        ├── services/
        │   └── verbService.js      # Data access layer
        └── utils/
            └── commonData.js
```

## Adding New Verbs

1. Create a new JSON file in `client/src/data/sagnord/` following this schema:

```json
{
  "íslensku": "að [verb]",
  "ensku": "to [verb]",
  "difficulty": 1-5,
  "group": 1-5,
  "nútið": [
    { "pronoun": "Ég", "conjugation": "..." },
    ...
  ],
  "þátið": [
    { "pronoun": "Ég", "conjugation": "..." },
    ...
  ],
  "lþ": {
## Adding New Verbs

1. Create a new JSON file in `client/src/data/sagnord/` following this schema:

```json
{
  "íslensku": "að vera",
  "ensku": "to be",
  "difficulty": 1,
  "group": 1,
  "nútið": [...],
  "þátið": [...],
  "lþ": {
    "conjugation": "...",
    "pronouns": ["Ég hef", "Þú hefur", ...]
  }
}
```

2. **That's it!** Restart the development server and your new verb will be automatically included.

The `verbService.js` uses webpack's `require.context` to automatically detect and load all `.json` files in the directory - no manual imports required!

## Features

✅ Responsive design (grid on desktop, list on mobile)
✅ Difficulty indicators with emojis
✅ Click-to-reveal conjugations
✅ Collapsible tense sections
✅ Random practice mode
✅ Clean, flat design with bold colors
✅ No database or backend server required - all data bundled in the React app

## Troubleshooting

**Dependencies not found:**
- Run `npm install` from the root directory

**Verb not showing:**
- Check JSON file syntax in `client/src/data/sagnord/`
- Ensure the verb is imported and added to the `verbDataMap` in `verbService.js`
- Restart the development server
