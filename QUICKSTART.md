# Quick Start Guide

## First Time Setup

1. **Install server dependencies:**
   ```bash
   cd /Users/titus/Documents/Verbs
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

   Or use the convenience script:
   ```bash
   npm run install-all
   ```

## Running the Application

### Development Mode (Recommended)

Run both server and client together:
```bash
npm run dev
```

This will start:
- Express server on http://localhost:3001
- React development server on http://localhost:3000

Open http://localhost:3000 in your browser.

### Running Separately

**Server only:**
```bash
npm run server
```

**Client only:**
```bash
npm run client
```

## Production Build

1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the server (serves built React app):
   ```bash
   npm start
   ```

Visit http://localhost:3001

## Project Structure

```
Verbs/
├── package.json              # Server dependencies
├── README.md                 # Main documentation
├── QUICKSTART.md            # This file
├── server/
│   ├── index.js             # Express server
│   └── data/                # Verb JSON files
│       ├── ad-vera.json
│       ├── ad-hafa.json
│       ├── ad-gera.json
│       ├── ad-fara.json
│       ├── ad-koma.json
│       └── ad-sja.json
└── client/
    ├── package.json         # Client dependencies
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        ├── App.css
        └── components/
            ├── Overview.js          # Main verb list page
            ├── VerbConjugation.js   # Conjugation tables
            └── VerbPractice.js      # Practice mode
```

## Adding New Verbs

Create a new JSON file in `server/data/` following this schema:

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
    "conjugation": "...",
    "pronouns": ["Ég hef", "Þú hefur", ...]
  }
}
```

The server will automatically pick up new files on restart.

## Features

✅ Responsive design (grid on desktop, list on mobile)
✅ Difficulty indicators with emojis
✅ Click-to-reveal conjugations
✅ Collapsible tense sections
✅ Random practice mode
✅ Clean, flat design with bold colors
✅ No database required - JSON file-based

## Troubleshooting

**Port already in use:**
- Server uses port 3001, client uses port 3000
- Change ports in `server/index.js` and `client/package.json` if needed

**Dependencies not found:**
- Run `npm run install-all` from the root directory

**Verb not showing:**
- Check JSON file syntax in `server/data/`
- Restart the server after adding new verbs
