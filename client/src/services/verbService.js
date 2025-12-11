// Dynamically import all JSON files from the sagnord directory
// This uses webpack's require.context to automatically load all .json files
// When you add a new verb JSON file, it will be automatically included!
const requireContext = require.context('../data/sagnord', false, /\.json$/);

// Create a mapping of verb IDs to their data
// The verb ID is the filename without the .json extension
const verbDataMap = {};

requireContext.keys().forEach((filename) => {
  // Extract the verb ID from the filename (e.g., './vera.json' -> 'vera')
  const verbId = filename.replace('./', '').replace('.json', '');
  
  // Load the verb data
  verbDataMap[verbId] = requireContext(filename);
});

/**
 * Get all verbs (list of infinitives with metadata)
 * Mimics the original API: GET /api/verbs
 */
export const getAllVerbs = () => {
  return new Promise((resolve) => {
    const verbs = Object.keys(verbDataMap).map(id => {
      const verbData = verbDataMap[id];
      return {
        id,
        íslensku: verbData.íslensku,
        ensku: verbData.ensku,
        difficulty: verbData.difficulty,
        group: verbData.group
      };
    });
    resolve(verbs);
  });
};

/**
 * Get specific verb by ID
 * Mimics the original API: GET /api/verbs/:id
 */
export const getVerbById = (id) => {
  return new Promise((resolve, reject) => {
    const verbData = verbDataMap[id];
    
    if (!verbData) {
      reject(new Error('Verb not found'));
      return;
    }
    
    resolve({ id, ...verbData });
  });
};
