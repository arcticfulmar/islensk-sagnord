# Icelandic Verb Practice

A web-based flashcard tool for practicing Icelandic verb conjugations.

## Features

- Browse verbs in infinitive form with difficulty indicators
- View conjugations for different tenses (Nútið, Þátið, Lýsingarháttur Þátiðar)
- Practice mode with random pronoun/tense combinations
- Responsive design (grid on desktop, list on mobile)

## Installation

Install dependencies:
```bash
npm install
```

## Development

Run the app in development mode:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Production

Build the app for production:
```bash
npm run build
```

This creates an optimized production build in the `client/build` folder, ready to be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

To test the production build locally:
```bash
cd client/build
npx serve -s .
```

## Project Structure

```
islensk-sagnord/
├── client/
│   ├── public/
│   └── src/
│       ├── components/      # React components
│       ├── data/
│       │   └── sagnord/    # Verb JSON files
│       ├── services/
│       │   └── verbService.js  # Data access layer
│       ├── utils/
│       ├── App.js
│       └── index.js
├── server/                  # (Legacy - no longer used)
│   └── data/               # Original verb data files
└── package.json
```

## Adding Verbs

Simply add new verb JSON files to `client/src/data/sagnord/` following this schema:

```json
{
  "íslensku": "að vera",
  "ensku": "to be",
  "difficulty": 1,
  "group": 1,
  "nútið": [...],
  "þátið": [...],
  "lþ": {...}
}
```

**That's it!** The `verbService.js` automatically detects and loads all `.json` files in the `sagnord` directory using webpack's `require.context`. No manual imports needed - just add the JSON file and restart the dev server.
