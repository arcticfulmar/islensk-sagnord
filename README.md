# Icelandic Verb Practice

A web-based flashcard tool for practicing Icelandic verb conjugations.

## Features

- Browse verbs in infinitive form with difficulty indicators
- View conjugations for different tenses (Nútið, Þátið, Lysingaháttur Þátiðar)
- Practice mode with random pronoun/tense combinations
- Responsive design (grid on desktop, list on mobile)

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

## Development

Run both server and client in development mode:
```bash
npm run dev
```

Or run them separately:
- Server: `npm run server` (runs on port 3001)
- Client: `npm run client` (runs on port 3000)

## Production

1. Build the client:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The server will serve the built React app on port 3001.

## Project Structure

```
Verbs/
├── server/
│   ├── index.js          # Express server
│   └── data/             # Verb JSON files
├── client/
│   ├── public/
│   └── src/
│       ├── components/   # React components
│       ├── App.js
│       └── index.js
└── package.json
```

## Adding Verbs

Add new verb JSON files to `server/data/` following this schema:

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
