// Common Icelandic language data

export const COMMON_PRONOUNS = {
  lþ: [
    "Ég hef",
    "Þú hefur",
    "Hann/Hún/Það hefur",
    "Við höfum",
    "Þið hafið",
    "Þeir/Þær/Þau hafa"
  ]
};

export const getDifficultyEmoji = (difficulty, group) => {
  const level = difficulty || group || 3;
  
  if (level === 1) return '😊';
  if (level === 2) return '🙂';
  if (level === 3) return '🤔';
  if (level === 4) return '🤨';
  if (level === 5) return '😡';
  
  return '🤔';
};
