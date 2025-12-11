const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Get all verbs (list of infinitives with metadata)
app.get('/api/verbs', (req, res) => {
  const dataDir = path.join(__dirname, 'data', 'sagnord');
  
  try {
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    const verbs = files.map(file => {
      const filePath = path.join(dataDir, file);
      const verbData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return {
        id: file.replace('.json', ''),
        íslensku: verbData.íslensku,
        ensku: verbData.ensku,
        difficulty: verbData.difficulty,
        group: verbData.group
      };
    });
    
    res.json(verbs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load verbs' });
  }
});

// Get specific verb by ID
app.get('/api/verbs/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, 'data', 'sagnord', `${id}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Verb not found' });
    }
    
    const verbData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ id, ...verbData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load verb data' });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
