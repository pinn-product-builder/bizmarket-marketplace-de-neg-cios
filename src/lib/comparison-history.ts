import { CategoryWeights } from "./company-scoring";

export interface ComparisonHistoryItem {
  id: string;
  timestamp: number;
  companyIds: string[];
  companyNames: string[];
  weights: CategoryWeights;
  presetUsed?: string;
  notes?: string;
}

const STORAGE_KEY = "comparison_history";
const MAX_HISTORY_ITEMS = 20;

// Get all comparison history
export const getComparisonHistory = (): ComparisonHistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading comparison history:", error);
    return [];
  }
};

// Save a new comparison to history
export const saveComparisonToHistory = (
  companyIds: string[],
  companyNames: string[],
  weights: CategoryWeights,
  presetUsed?: string,
  notes?: string
): void => {
  try {
    const history = getComparisonHistory();
    
    const newItem: ComparisonHistoryItem = {
      id: `comparison_${Date.now()}`,
      timestamp: Date.now(),
      companyIds,
      companyNames,
      weights,
      presetUsed,
      notes,
    };

    // Add to beginning and limit to MAX_HISTORY_ITEMS
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error saving comparison to history:", error);
  }
};

// Delete a specific comparison from history
export const deleteComparisonFromHistory = (id: string): void => {
  try {
    const history = getComparisonHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting comparison from history:", error);
  }
};

// Update notes for a specific comparison
export const updateComparisonNotes = (id: string, notes: string): void => {
  try {
    const history = getComparisonHistory();
    const updated = history.map((item) =>
      item.id === id ? { ...item, notes } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error updating comparison notes:", error);
  }
};

// Clear all history
export const clearComparisonHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing comparison history:", error);
  }
};

// Format timestamp for display
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Agora mesmo";
  if (diffMins < 60) return `${diffMins} min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
