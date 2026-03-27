const STORAGE_KEY = "jobquest-state";

const DEFAULT_STATE = {
  resumeText: "",
  resumeSkills: [],
  resumeTitle: "",
  character: {
    name: "",
    skinColor: "#f5c6a0",
    shirtColor: "#58a6ff",
    pantsColor: "#30363d",
    hairColor: "#3b2314",
    hairStyle: "short",
  },
  jobs: [],
  appliedJobs: [],
  coins: 0,
  xp: 0,
  level: 1,
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export let state = deepClone(DEFAULT_STATE);

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...deepClone(DEFAULT_STATE), ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load state, using defaults:", e);
    state = deepClone(DEFAULT_STATE);
  }
  return state;
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save state:", e);
  }
}

export function resetState() {
  state = deepClone(DEFAULT_STATE);
  localStorage.removeItem(STORAGE_KEY);
  return state;
}

export function addCoins(amount) {
  state.coins += amount;
  saveState();
}

export function markApplied(jobUrl) {
  if (!state.appliedJobs.includes(jobUrl)) {
    state.appliedJobs.push(jobUrl);
    saveState();
  }
}

export function isApplied(jobUrl) {
  return state.appliedJobs.includes(jobUrl);
}
