// AI Configuration
export const AI_CONFIG = {
  useMockAI: true, // Trocar para false quando integrar API real
  mockDelay: { min: 500, max: 1500 }, // Delay realista em ms
};

// Get random delay within configured range
export const getRandomDelay = () => {
  const { min, max } = AI_CONFIG.mockDelay;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
