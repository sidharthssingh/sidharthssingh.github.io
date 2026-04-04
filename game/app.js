const STORAGE_KEY = "career-quest-save-v3";

const TILE = 32;
const MAP_W = 20;
const MAP_H = 16;

const mapRows = [
  "TTTTTTTTTTTTTTTTTTTT",
  "T....F......F......T",
  "T..~~~~....~~~~....T",
  "T..,.,,....,,.,....T",
  "T..,.,....,,.,.....T",
  "T..,.,,....,,.,....T",
  "T....F....,,..F....T",
  "T..,,,,......F.,,..T",
  "T..,,......F...,,..T",
  "T..,,....,,,,,,....T",
  "T....F..,,,,..F....T",
  "T........,,........T",
  "T....F...,,...F....T",
  "T........,,........T",
  "T......F....F......T",
  "TTTTTTTTTTTTTTTTTTTT",
];

const guideNpc = { x: 8, y: 5, name: "Coach Byte" };

const stageLabels = {
  scouted: "Scouted",
  researched: "Researched",
  tailored: "Tailored",
  networked: "Networked",
  screened: "Recruiter Screen",
  applied: "Applied",
  followedUp: "Followed Up",
  interviewing: "Interview Ready",
  offered: "Offer Won",
  rejected: "Closed",
};

const actionRewards = {
  researched: { xp: 15, coins: 8, label: "Company research logged" },
  tailored: { xp: 25, coins: 12, label: "Resume tailored" },
  networked: { xp: 20, coins: 10, label: "Outreach sent" },
  screened: { xp: 22, coins: 12, label: "Recruiter screen prepared" },
  applied: { xp: 35, coins: 18, label: "Application submitted" },
  followedUp: { xp: 20, coins: 10, label: "Follow-up sent" },
  interviewing: { xp: 55, coins: 22, label: "Interview prep complete" },
  offered: { xp: 100, coins: 70, label: "Offer landed" },
};

const keywordSignals = [
  { key: "ai", label: "AI", tests: ["ai", "machine learning", "llm", "model", "genai", "artificial intelligence"] },
  { key: "api", label: "APIs", tests: ["api", "platform", "sdk", "developer", "integration"] },
  { key: "analytics", label: "Analytics", tests: ["analytics", "metrics", "dashboard", "data", "sql", "experimentation"] },
  { key: "growth", label: "Growth", tests: ["growth", "funnel", "retention", "acquisition", "engagement"] },
  { key: "gaming", label: "Gaming", tests: ["game", "gaming", "player", "live ops", "live service"] },
  { key: "leadership", label: "Leadership", tests: ["led", "managed", "cross-functional", "stakeholder", "strategy"] },
  { key: "execution", label: "Execution", tests: ["launch", "shipped", "roadmap", "execution", "delivery"] },
  { key: "ux", label: "UX", tests: ["user research", "design", "ux", "customer", "journey"] },
];

const companyArchetypes = [
  { match: ["openai", "anthropic", "nvidia", "hugging face"], focus: "AI product judgment", prep: "Talk about model quality, safety, platform adoption, and fast iteration." },
  { match: ["riot", "epic", "activision", "roblox"], focus: "Player and live-service product sense", prep: "Expect retention, economy, community trust, and long-term engagement questions." },
  { match: ["vercel", "stripe", "plaid", "databricks", "supabase", "linear"], focus: "Platform and developer empathy", prep: "Expect API, workflow, and technical tradeoff questions." },
  { match: ["google", "microsoft", "apple", "atlassian", "hubspot"], focus: "Scale and cross-functional influence", prep: "Expect ambiguity, stakeholder alignment, roadmap, and metrics questions." },
  { match: ["robinhood", "coinbase", "brex"], focus: "Trust and regulated product thinking", prep: "Expect trust, risk, edge-case handling, and compliance framing." },
];

const demoLeads = [
  { company: "Vercel", role: "Product Manager", location: "Remote", priority: "High", url: "https://vercel.com/careers", district: "starter", notes: "Developer tools storytelling and product velocity." },
  { company: "Linear", role: "Product Manager", location: "Remote", priority: "High", url: "https://linear.app/careers", district: "starter", notes: "Execution quality and product craft." },
  { company: "Notion", role: "Product Manager", location: "San Francisco", priority: "Medium", url: "https://www.notion.so/careers", district: "starter", notes: "Collaboration, knowledge workflows, and user empathy." },
  { company: "Figma", role: "Product Manager", location: "New York / Remote", priority: "Medium", url: "https://www.figma.com/careers/", district: "starter", notes: "Creative tooling, multiplayer workflow, design-product partnership." },
  { company: "Supabase", role: "Technical Product Manager", location: "Remote", priority: "High", url: "https://supabase.com/careers", district: "starter", notes: "Open-source product and platform thinking." },
  { company: "Airtable", role: "Product Manager", location: "Remote", priority: "Medium", url: "https://airtable.com/careers", district: "starter", notes: "Workflow design and platform extensibility." },

  { company: "Google", role: "Senior Product Manager", location: "Mountain View", priority: "High", url: "https://www.google.com/about/careers/applications/jobs/results/", district: "scale", notes: "Scale, prioritization, and product strategy." },
  { company: "Microsoft", role: "Principal PM", location: "Seattle", priority: "High", url: "https://careers.microsoft.com/v2/global/en/search", district: "scale", notes: "Enterprise platform, influence, execution." },
  { company: "Stripe", role: "Product Manager", location: "San Francisco", priority: "High", url: "https://stripe.com/jobs/search", district: "scale", notes: "Payments, APIs, and platform clarity." },
  { company: "Databricks", role: "PM, ML Platform", location: "San Francisco", priority: "Medium", url: "https://www.databricks.com/company/careers/open-positions", district: "scale", notes: "Data and ML platform motion." },
  { company: "Atlassian", role: "Senior Product Manager", location: "Remote", priority: "Medium", url: "https://www.atlassian.com/company/careers", district: "scale", notes: "B2B workflow and team productivity." },
  { company: "HubSpot", role: "Product Manager", location: "Remote", priority: "Medium", url: "https://www.hubspot.com/careers/jobs", district: "scale", notes: "Growth loops and customer empathy." },

  { company: "OpenAI", role: "Product Manager, API Platform", location: "San Francisco / Remote", priority: "High", url: "https://openai.com/careers/search", district: "summit", notes: "AI launches, developer platform, model product sense." },
  { company: "Anthropic", role: "Product Manager", location: "San Francisco", priority: "High", url: "https://www.anthropic.com/careers", district: "summit", notes: "Safety and product judgment in frontier AI." },
  { company: "Riot Games", role: "Senior PM, Live Services", location: "Los Angeles", priority: "Medium", url: "https://www.riotgames.com/en/work-with-us", district: "summit", notes: "Live ops, player trust, long-term engagement." },
  { company: "Roblox", role: "Product Manager", location: "San Mateo", priority: "Medium", url: "https://careers.roblox.com/", district: "summit", notes: "UGC ecosystem, safety, and creator economy." },
  { company: "NVIDIA", role: "Product Manager, AI", location: "Santa Clara", priority: "Medium", url: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite", district: "summit", notes: "AI platform and technical storytelling." },
  { company: "Apple", role: "PM, ML Platform", location: "Cupertino", priority: "Low", url: "https://jobs.apple.com/en-us/search", district: "summit", notes: "High standards, ecosystem thinking, execution." },
];

const districtDefs = [
  {
    id: "starter",
    name: "Launch Town",
    subtitle: "Build your pipeline",
    unlockText: "Available from the start",
    isUnlocked: () => true,
    buildings: [
      { id: "home", name: "Home Base", x: 9, y: 11, color: "#4d68a8", roof: "#3f4e87", glyph: "H", action: "home" },
      { id: "scout", name: "Scout Lab", x: 5, y: 4, color: "#b88e2b", roof: "#946f1d", glyph: "S", action: "scout" },
      { id: "resume", name: "Resume Forge", x: 10, y: 4, color: "#b84545", roof: "#913737", glyph: "R", action: "resume" },
      { id: "network", name: "Network Cafe", x: 16, y: 7, color: "#4f8d62", roof: "#3f704e", glyph: "N", action: "network" },
      { id: "apply", name: "Application Gate", x: 3, y: 7, color: "#8b6ad0", roof: "#6e51b0", glyph: "A", action: "apply" },
      { id: "interview", name: "Interview Gym", x: 7, y: 9, color: "#d17c35", roof: "#b56526", glyph: "I", action: "interview" },
      { id: "transit", name: "Transit Station", x: 12, y: 9, color: "#5aa7a7", roof: "#46898a", glyph: "T", action: "transit" },
    ],
  },
  {
    id: "scale",
    name: "Scale City",
    subtitle: "Operate at bigger-company speed",
    unlockText: "Unlocks after 2 applications or level 3",
    isUnlocked: (state) => state.progress.applications >= 2 || state.progress.level >= 3,
    buildings: [
      { id: "home-scale", name: "Guild Hall", x: 9, y: 11, color: "#5868d8", roof: "#4855ad", glyph: "G", action: "home" },
      { id: "research", name: "Research Library", x: 5, y: 4, color: "#6c7b95", roof: "#516078", glyph: "L", action: "research" },
      { id: "resume-scale", name: "Portfolio Studio", x: 10, y: 4, color: "#d16b4f", roof: "#b35539", glyph: "P", action: "resume" },
      { id: "recruiter", name: "Recruiter Row", x: 16, y: 7, color: "#4aa17a", roof: "#39815f", glyph: "Q", action: "screen" },
      { id: "apply-scale", name: "Apply Terminal", x: 3, y: 7, color: "#9b6cf0", roof: "#7a51c0", glyph: "A", action: "apply" },
      { id: "interview-scale", name: "Case Arena", x: 7, y: 9, color: "#c9852d", roof: "#a56b24", glyph: "C", action: "interview" },
      { id: "transit-scale", name: "Sky Rail", x: 12, y: 9, color: "#4aaac4", roof: "#34879c", glyph: "T", action: "transit" },
    ],
  },
  {
    id: "summit",
    name: "Summit Harbor",
    subtitle: "High-stakes final runs",
    unlockText: "Unlocks after 2 interviews or level 5",
    isUnlocked: (state) => state.progress.interviews >= 2 || state.progress.level >= 5,
    buildings: [
      { id: "home-summit", name: "War Room", x: 9, y: 11, color: "#3d73a8", roof: "#315b85", glyph: "W", action: "home" },
      { id: "research-summit", name: "Signal Observatory", x: 5, y: 4, color: "#7b88a8", roof: "#616d89", glyph: "O", action: "research" },
      { id: "resume-summit", name: "Narrative Forge", x: 10, y: 4, color: "#ca5555", roof: "#a34242", glyph: "N", action: "resume" },
      { id: "network-summit", name: "Founder Lounge", x: 16, y: 7, color: "#4e9b78", roof: "#3f7f62", glyph: "F", action: "network" },
      { id: "screen-summit", name: "Exec Briefing", x: 3, y: 7, color: "#7e62d3", roof: "#624dac", glyph: "E", action: "screen" },
      { id: "interview-summit", name: "Boss Arena", x: 7, y: 9, color: "#dd7b26", roof: "#b96418", glyph: "B", action: "interview" },
      { id: "offer-summit", name: "Offer Castle", x: 12, y: 9, color: "#58b2b2", roof: "#438989", glyph: "O", action: "offer" },
    ],
  },
];

const defaultState = () => ({
  player: {
    name: "Trainer",
    targetRole: "Product Manager",
    goal: "Land a role you are proud of",
    x: 9,
    y: 13,
  },
  progress: {
    xp: 0,
    level: 1,
    coins: 0,
    streak: 0,
    applications: 0,
    interviews: 0,
    offers: 0,
    tailored: 0,
    networking: 0,
    research: 0,
    screens: 0,
    battlesWon: 0,
  },
  meta: {
    activeLeadId: null,
    nextLeadId: 1,
    lastActionAt: null,
    currentDistrict: "starter",
  },
  resume: {
    text: "",
    importedAt: null,
    sourceName: "",
    summary: "",
    signals: [],
    highlights: [],
  },
  leads: [],
});

let state = loadState();
let scene = "title";
let lastTime = 0;
let moveCooldown = 0;
const keys = {};
let camera = { x: 0, y: 0 };
let currentDialogue = null;
let battleState = null;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const titleScreen = document.getElementById("title-screen");
const introModal = document.getElementById("intro-modal");
const leadModal = document.getElementById("lead-modal");
const resumeModal = document.getElementById("resume-modal");
const battleModal = document.getElementById("battle-modal");
const journalPanel = document.getElementById("journal-panel");
const dialogueBox = document.getElementById("dialogue-box");
const dialogueSpeaker = document.getElementById("dialogue-speaker");
const dialogueText = document.getElementById("dialogue-text");
const dialogueActions = document.getElementById("dialogue-actions");

const newGameBtn = document.getElementById("new-game-btn");
const continueBtn = document.getElementById("continue-btn");
const importResumeTitleBtn = document.getElementById("import-resume-title-btn");
const openResumeModalBtn = document.getElementById("open-resume-modal-btn");
const openResumeJournalBtn = document.getElementById("open-resume-journal-btn");
const resetBtn = document.getElementById("reset-btn");
const startSaveBtn = document.getElementById("start-save-btn");
const quickAddBtn = document.getElementById("quick-add-btn");
const deleteLeadBtn = document.getElementById("delete-lead-btn");
const closeBattleBtn = document.getElementById("close-battle-btn");
const saveResumeBtn = document.getElementById("save-resume-btn");

const playerNameInput = document.getElementById("player-name-input");
const targetRoleInput = document.getElementById("target-role-input");
const goalInput = document.getElementById("goal-input");
const leadForm = document.getElementById("lead-form");
const leadModalTitle = document.getElementById("lead-modal-title");
const leadIdInput = document.getElementById("lead-id-input");
const companyInput = document.getElementById("company-input");
const roleInput = document.getElementById("role-input");
const locationInput = document.getElementById("location-input");
const priorityInput = document.getElementById("priority-input");
const urlInput = document.getElementById("url-input");
const notesInput = document.getElementById("notes-input");
const resumeFileInput = document.getElementById("resume-file-input");
const resumeTextInput = document.getElementById("resume-text-input");
const resumeStatus = document.getElementById("resume-status");

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const fresh = defaultState();
    return {
      ...fresh,
      ...parsed,
      player: { ...fresh.player, ...(parsed.player || {}) },
      progress: { ...fresh.progress, ...(parsed.progress || {}) },
      meta: { ...fresh.meta, ...(parsed.meta || {}) },
      resume: { ...fresh.resume, ...(parsed.resume || {}) },
      leads: Array.isArray(parsed.leads) ? parsed.leads.map(normalizeLead) : [],
    };
  } catch {
    return defaultState();
  }
}

function normalizeLead(lead) {
  return {
    ...lead,
    district: lead.district || "starter",
    status: lead.status || "active",
    notes: lead.notes || "",
    prepNotes: lead.prepNotes || [],
    steps: {
      researched: false,
      tailored: false,
      networked: false,
      screened: false,
      applied: false,
      followedUp: false,
      interviewing: false,
      offered: false,
      rejected: false,
      ...(lead.steps || {}),
    },
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function hasSave() {
  return state.leads.length > 0 || state.progress.xp > 0 || state.player.name !== "Trainer" || !!state.resume.text;
}

function currentDistrict() {
  return districtDefs.find((district) => district.id === state.meta.currentDistrict) || districtDefs[0];
}

function currentBuildings() {
  return currentDistrict().buildings;
}

function unlockedDistricts() {
  return districtDefs.filter((district) => district.isUnlocked(state));
}

function nextLockedDistrict() {
  return districtDefs.find((district) => !district.isUnlocked(state));
}

function setDistrict(id) {
  state.meta.currentDistrict = id;
  state.player.x = 9;
  state.player.y = 13;
  saveState();
  refreshChrome();
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  scene = "title";
  battleState = null;
  hideDialogue();
  hideJournal();
  hideModal(leadModal);
  hideModal(introModal);
  hideModal(resumeModal);
  hideModal(battleModal);
  document.getElementById("hud").classList.remove("active");
  refreshChrome();
  syncTitleButtons();
  titleScreen.classList.add("active");
}

function startWorld() {
  scene = "world";
  titleScreen.classList.remove("active");
  document.getElementById("hud").classList.add("active");
  refreshChrome();
}

function beginNewAdventure() {
  playerNameInput.value = state.player.name === "Trainer" ? "" : state.player.name;
  targetRoleInput.value = state.player.targetRole;
  goalInput.value = state.player.goal;
  showModal(introModal);
}

function createNewSave() {
  state = defaultState();
  state.player.name = (playerNameInput.value || "Trainer").trim();
  state.player.targetRole = (targetRoleInput.value || "Product Manager").trim();
  state.player.goal = (goalInput.value || "Land a role you are proud of").trim();
  demoLeads.filter((lead) => lead.district === "starter").forEach((lead, index) => addLead(lead, index === 0));
  state.progress.coins = 30;
  state.progress.xp = 15;
  updateLevelFromXp();
  saveState();
  hideModal(introModal);
  startWorld();
}

function openLeadModal(leadId = null) {
  const lead = leadId ? getLead(leadId) : null;
  leadModalTitle.textContent = lead ? "Edit Lead" : "Add Lead";
  leadIdInput.value = lead ? String(lead.id) : "";
  companyInput.value = lead?.company || "";
  roleInput.value = lead?.role || "";
  locationInput.value = lead?.location || "";
  priorityInput.value = lead?.priority || "High";
  urlInput.value = lead?.url || "";
  notesInput.value = lead?.notes || "";
  deleteLeadBtn.classList.toggle("hidden", !lead);
  showModal(leadModal);
}

function addLead(input, setActive = false) {
  const id = state.meta.nextLeadId++;
  const lead = normalizeLead({
    id,
    company: (input.company || "").trim(),
    role: (input.role || "").trim(),
    location: (input.location || "").trim(),
    priority: input.priority || "Medium",
    url: (input.url || "").trim(),
    notes: (input.notes || "").trim(),
    district: input.district || currentDistrict().id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  state.leads.push(lead);
  if (!state.meta.activeLeadId || setActive) state.meta.activeLeadId = id;
  saveState();
  refreshChrome();
  return lead;
}

function updateLeadFromForm(event) {
  event.preventDefault();
  const payload = {
    company: companyInput.value,
    role: roleInput.value,
    location: locationInput.value,
    priority: priorityInput.value,
    url: urlInput.value,
    notes: notesInput.value,
  };
  const id = Number(leadIdInput.value);
  if (id) {
    const lead = getLead(id);
    if (!lead) return;
    Object.assign(lead, payload, { updatedAt: Date.now() });
  } else {
    addLead(payload, true);
  }
  saveState();
  hideModal(leadModal);
  refreshChrome();
}

function deleteLead() {
  const id = Number(leadIdInput.value);
  if (!id) return;
  state.leads = state.leads.filter((lead) => lead.id !== id);
  if (state.meta.activeLeadId === id) state.meta.activeLeadId = state.leads[0]?.id || null;
  saveState();
  hideModal(leadModal);
  refreshChrome();
}

function getLead(id) {
  return state.leads.find((lead) => lead.id === id);
}

function getActiveLead() {
  return getLead(state.meta.activeLeadId);
}

function setActiveLead(id) {
  state.meta.activeLeadId = id;
  saveState();
  refreshChrome();
}

function getLeadStage(lead) {
  if (lead.steps.offered) return "offered";
  if (lead.steps.rejected) return "rejected";
  if (lead.steps.interviewing) return "interviewing";
  if (lead.steps.followedUp) return "followedUp";
  if (lead.steps.applied) return "applied";
  if (lead.steps.screened) return "screened";
  if (lead.steps.networked) return "networked";
  if (lead.steps.tailored) return "tailored";
  if (lead.steps.researched) return "researched";
  return "scouted";
}

function getNextObjective(lead) {
  if (lead.steps.offered) return "Celebrate and negotiate thoughtfully.";
  if (lead.steps.rejected) return "Closed out. Capture lessons and move on.";
  if (!lead.steps.researched) return "Visit Research Library to understand the company better.";
  if (!lead.steps.tailored) return "Visit Resume Forge to tailor your story.";
  if (!lead.steps.networked) return "Visit Network Cafe to send targeted outreach.";
  if (!lead.steps.screened) return "Visit Recruiter Row or Exec Briefing to prep screening calls.";
  if (!lead.steps.applied) return "Visit Application Gate to submit.";
  if (!lead.steps.followedUp) return "Return to Application Gate for follow-up.";
  if (!lead.steps.interviewing) return "Win the prep battle at the local interview arena.";
  return "Visit Offer Castle when the loop resolves.";
}

function applyReward(type) {
  const reward = actionRewards[type];
  if (!reward) return;
  state.progress.xp += reward.xp;
  state.progress.coins += reward.coins;
  state.progress.streak += 1;
  if (type === "researched") state.progress.research += 1;
  if (type === "tailored") state.progress.tailored += 1;
  if (type === "networked") state.progress.networking += 1;
  if (type === "screened") state.progress.screens += 1;
  if (type === "applied") state.progress.applications += 1;
  if (type === "interviewing") {
    state.progress.interviews += 1;
    state.progress.battlesWon += 1;
  }
  if (type === "offered") state.progress.offers += 1;
  state.meta.lastActionAt = Date.now();
  updateLevelFromXp();
}

function updateLevelFromXp() {
  while (state.progress.xp >= xpForLevel(state.progress.level)) {
    state.progress.xp -= xpForLevel(state.progress.level);
    state.progress.level += 1;
  }
}

function xpForLevel(level) {
  return level * 100;
}

function companyProfile(lead) {
  const name = `${lead.company} ${lead.role}`.toLowerCase();
  return companyArchetypes.find((entry) => entry.match.some((term) => name.includes(term))) || {
    focus: "Structured product thinking",
    prep: "Expect product sense, prioritization, communication, and execution questions.",
  };
}

function resumeSignals() {
  return state.resume.signals || [];
}

function strongestResumeSignals(limit = 3) {
  return resumeSignals().slice(0, limit).map((signal) => signal.label);
}

function detectResumeIntel(text) {
  const normalized = text.toLowerCase();
  const signals = keywordSignals
    .map((signal) => ({
      key: signal.key,
      label: signal.label,
      score: signal.tests.reduce((sum, test) => sum + (normalized.includes(test) ? 1 : 0), 0),
    }))
    .filter((signal) => signal.score > 0)
    .sort((a, b) => b.score - a.score);

  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const highlights = sentences
    .filter((line) => /\b(led|shipped|grew|launched|built|owned|improved|scaled)\b/i.test(line))
    .slice(0, 3);

  const summaryBits = [];
  if (signals.length) summaryBits.push(`Signals: ${signals.slice(0, 4).map((signal) => signal.label).join(", ")}`);
  if (highlights.length) summaryBits.push(`Impact: ${highlights[0]}`);

  return {
    text,
    importedAt: Date.now(),
    sourceName: resumeFileInput.files[0]?.name || "Pasted resume",
    summary: summaryBits.join(" | ") || "Resume imported.",
    signals,
    highlights,
  };
}

async function parseResumeFile(file) {
  if (!file) return "";
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") {
    const lib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs");
    lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";
    const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += `${content.items.map((item) => item.str).join(" ")}\n`;
    }
    return text;
  }
  return file.text();
}

async function saveResumeIntel() {
  resumeStatus.textContent = "Reading resume...";
  try {
    let text = resumeTextInput.value.trim();
    if (!text && resumeFileInput.files[0]) text = (await parseResumeFile(resumeFileInput.files[0])).trim();
    if (!text) {
      resumeStatus.textContent = "Add resume text or upload a file first.";
      return;
    }
    state.resume = detectResumeIntel(text);
    const firstLine = text.split("\n").map((line) => line.trim()).find(Boolean);
    if (firstLine && firstLine.length < 35 && !/\d/.test(firstLine) && state.player.name === "Trainer") {
      state.player.name = firstLine;
    }
    saveState();
    refreshChrome();
    resumeStatus.textContent = "Resume intel saved. Quests and interview battles now adapt to your background.";
  } catch (error) {
    console.error(error);
    resumeStatus.textContent = "Could not parse that file. Try pasting the text instead.";
  }
}

function buildLeadQuests(lead) {
  const profile = companyProfile(lead);
  const skills = strongestResumeSignals(3);
  return [
    { title: "Research", text: `Understand ${lead.company}'s business, users, and the role's likely metrics.`, done: lead.steps.researched },
    { title: "Story Match", text: state.resume.text ? `Tie your ${skills[0] || "product"} background to ${profile.focus.toLowerCase()}.` : "Import your resume to tailor this story.", done: lead.steps.tailored },
    { title: "Warm Intro", text: `Find one teammate, recruiter, or creator linked to ${lead.company}.`, done: lead.steps.networked },
    { title: "Screen Prep", text: `Prepare a tight recruiter-screen answer for why ${lead.company} and why now.`, done: lead.steps.screened },
    { title: "Interview Win Condition", text: profile.prep, done: lead.steps.interviewing },
  ];
}

function progressLead(step) {
  const lead = getActiveLead();
  if (!lead) {
    showCoachDialogue("No active lead yet.", [
      { label: "Open journal", onSelect: showJournal },
      { label: "Create a lead", onSelect: () => openLeadModal() },
    ]);
    return;
  }

  if (lead.status !== "active" && step !== "offered") {
    showCoachDialogue(`${lead.company} is already closed out. Pick a different lead in your journal.`);
    return;
  }

  const blockers = {
    researched: () => null,
    tailored: () => (!lead.steps.researched ? "Research the company first." : null),
    networked: () => (!lead.steps.tailored ? "Tailor your resume first." : null),
    screened: () => (!lead.steps.networked ? "Warm up the lead with outreach first." : null),
    applied: () => (!lead.steps.screened ? "Prep the recruiter screen first." : null),
    followedUp: () => (!lead.steps.applied ? "Submit the application first." : null),
    interviewing: () => (!lead.steps.followedUp ? "Send the follow-up before the battle prep stage." : null),
    offered: () => (!lead.steps.interviewing ? "Win the interview battle before logging the final outcome." : null),
  };

  const block = blockers[step]?.();
  if (block) {
    showCoachDialogue(block);
    return;
  }

  if (step === "interviewing") {
    startInterviewBattle(lead);
    return;
  }

  if (step === "offered") {
    showDialogue({
      speaker: "Offer Castle",
      text: `How did ${lead.company} resolve?`,
      actions: [
        { label: "Mark offer won", onSelect: () => finishLead("offered") },
        { label: "Mark rejected", onSelect: () => finishLead("rejected") },
        { label: "Not yet", onSelect: hideDialogue },
      ],
    });
    return;
  }

  if (lead.steps[step]) {
    showCoachDialogue(`${actionRewards[step].label} is already logged for ${lead.company}.`);
    return;
  }

  lead.steps[step] = true;
  lead.updatedAt = Date.now();
  applyReward(step);
  saveState();
  refreshChrome();
  showCoachDialogue(`${actionRewards[step].label}. ${lead.company} is now at the ${stageLabels[getLeadStage(lead)]} stage.`, [
    { label: "Keep moving", onSelect: hideDialogue },
    ...(lead.url ? [{ label: "Open listing", onSelect: () => window.open(lead.url, "_blank", "noopener") }] : []),
  ]);
}

function finishLead(outcome) {
  const lead = getActiveLead();
  if (!lead) return;
  if (outcome === "offered") {
    lead.steps.offered = true;
    lead.status = "won";
    applyReward("offered");
    showCoachDialogue(`Offer logged for ${lead.company}. Big win. Capture what worked so we can repeat it.`);
  } else {
    lead.steps.rejected = true;
    lead.status = "closed";
    state.progress.streak = 0;
    showCoachDialogue(`${lead.company} was marked closed. That's okay. Take the lesson and keep the pipeline alive.`);
  }
  lead.updatedAt = Date.now();
  saveState();
  refreshChrome();
}

function buildBattleQuestions(lead) {
  const profile = companyProfile(lead);
  const skills = strongestResumeSignals(2);
  const best = skills[0] || "product execution";
  const backup = skills[1] || "cross-functional leadership";
  return [
    {
      prompt: `Why ${lead.company} and why this ${lead.role} role?`,
      answers: [
        { text: `Connect your ${best} background to ${profile.focus.toLowerCase()} and mention one real reason this company matters to you.`, score: 28, feedback: "Strong and specific motivation." },
        { text: "Say the brand is exciting and you want to grow a lot here.", score: 12, feedback: "Positive, but still generic." },
        { text: "Focus on title and compensation first.", score: 4, feedback: "The panel wants deeper motivation." },
      ],
    },
    {
      prompt: `Tell me about a product win that proves you can do this job.`,
      answers: [
        { text: `Use a STAR-style story with metrics, ownership, and a lesson tied to ${best}.`, score: 30, feedback: "Clear evidence and strong structure." },
        { text: "Describe a team project broadly without quantifying impact.", score: 10, feedback: "Needs sharper ownership and results." },
        { text: "Stay high-level because details are hard to remember.", score: 5, feedback: "Specificity matters here." },
      ],
    },
    {
      prompt: `What would your first 90 days look like here?`,
      answers: [
        { text: `Listen, map users and metrics, find quick wins, then prioritize with stakeholders using your ${backup} strength.`, score: 26, feedback: "Thoughtful, grounded, and realistic." },
        { text: "Ship a huge feature fast to prove impact immediately.", score: 8, feedback: "Too rushed. Missing context gathering." },
        { text: "Wait until the roadmap is perfectly clear before moving.", score: 3, feedback: "This role needs initiative." },
      ],
    },
  ];
}

function startInterviewBattle(lead) {
  battleState = {
    leadId: lead.id,
    turn: 0,
    playerHp: 100,
    enemyHp: 100,
    questions: buildBattleQuestions(lead),
    log: [`${lead.company} enters the arena. Beat the panel with relevance, structure, and evidence.`],
    complete: false,
  };
  renderBattle();
  showModal(battleModal);
}

function renderBattle() {
  if (!battleState) return;
  const lead = getLead(battleState.leadId);
  const question = battleState.questions[battleState.turn];
  document.getElementById("battle-player-name").textContent = state.player.name;
  document.getElementById("battle-player-role").textContent = state.player.targetRole;
  document.getElementById("battle-enemy-name").textContent = lead.company;
  document.getElementById("battle-enemy-role").textContent = lead.role;
  document.getElementById("battle-player-hp").style.width = `${Math.max(0, battleState.playerHp)}%`;
  document.getElementById("battle-enemy-hp").style.width = `${Math.max(0, battleState.enemyHp)}%`;
  document.getElementById("battle-log").textContent = battleState.log[battleState.log.length - 1];
  document.getElementById("battle-question").textContent = question ? question.prompt : "Battle complete.";

  const answers = document.getElementById("battle-answers");
  answers.innerHTML = "";
  if (!battleState.complete && question) {
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.className = "pixel-btn primary";
      button.textContent = answer.text;
      button.onclick = () => resolveBattleTurn(answer);
      answers.appendChild(button);
    });
  }

  const actions = document.getElementById("battle-actions");
  actions.innerHTML = "";
  const retreatBtn = document.createElement("button");
  retreatBtn.className = "pixel-btn ghost small";
  retreatBtn.textContent = battleState.complete ? "Close" : "Retreat";
  retreatBtn.onclick = closeBattle;
  actions.appendChild(retreatBtn);
}

function resolveBattleTurn(answer) {
  if (!battleState || battleState.complete) return;
  const lead = getLead(battleState.leadId);
  const enemyHit = Math.max(8, 30 - answer.score);
  battleState.enemyHp -= answer.score;
  battleState.playerHp -= enemyHit;
  battleState.log.push(`${answer.feedback} ${lead.company} pushes back for ${enemyHit} damage.`);

  if (battleState.enemyHp <= 0) {
    battleState.complete = true;
    lead.steps.interviewing = true;
    lead.updatedAt = Date.now();
    lead.prepNotes = buildLeadQuests(lead).map((quest) => quest.text);
    applyReward("interviewing");
    saveState();
    refreshChrome();
    battleState.log.push(`Victory. ${lead.company}'s panel is convinced you are interview-ready.`);
    renderBattle();
    showCoachDialogue(`You won the prep battle for ${lead.company}. Your interview stage is now unlocked.`);
    return;
  }

  if (battleState.playerHp <= 0) {
    battleState.complete = true;
    state.progress.streak = Math.max(0, state.progress.streak - 1);
    saveState();
    refreshChrome();
    battleState.log.push("You lost the round. Refine your stories and challenge the arena again.");
    renderBattle();
    return;
  }

  battleState.turn += 1;
  if (battleState.turn >= battleState.questions.length) {
    battleState.complete = true;
    if (battleState.enemyHp > battleState.playerHp) {
      battleState.log.push("The panel still has doubts. Re-run the battle after tightening your stories.");
    } else {
      lead.steps.interviewing = true;
      lead.updatedAt = Date.now();
      lead.prepNotes = buildLeadQuests(lead).map((quest) => quest.text);
      applyReward("interviewing");
      saveState();
      refreshChrome();
      battleState.log.push(`Narrow win. ${lead.company} is satisfied with your prep quality.`);
    }
  }
  renderBattle();
}

function closeBattle() {
  hideModal(battleModal);
  battleState = null;
}

function showCoachDialogue(text, actions = [{ label: "Close", onSelect: hideDialogue }]) {
  showDialogue({ speaker: guideNpc.name, text, actions });
}

function showDialogue(config) {
  currentDialogue = config;
  dialogueSpeaker.textContent = config.speaker;
  dialogueText.textContent = config.text;
  dialogueActions.innerHTML = "";
  config.actions.forEach((action) => {
    const button = document.createElement("button");
    button.className = "pixel-btn primary small";
    button.textContent = action.label;
    button.onclick = () => {
      if (action.close !== false) hideDialogue();
      action.onSelect?.();
    };
    dialogueActions.appendChild(button);
  });
  dialogueBox.classList.remove("hidden");
}

function hideDialogue() {
  currentDialogue = null;
  dialogueBox.classList.add("hidden");
}

function showModal(modal) {
  modal.classList.remove("hidden");
}

function hideModal(modal) {
  modal.classList.add("hidden");
}

function showJournal() {
  journalPanel.classList.remove("hidden");
  refreshChrome();
}

function hideJournal() {
  journalPanel.classList.add("hidden");
}

function syncTitleButtons() {
  continueBtn.disabled = !hasSave();
  continueBtn.style.opacity = hasSave() ? "1" : "0.45";
}

function refreshChrome() {
  syncHud();
  renderSummary();
  renderResumeSummary();
  renderLeadList();
  renderQuestBoard();
  const locked = nextLockedDistrict();
  document.getElementById("hint-bar").textContent = locked
    ? `${currentDistrict().name} · ${currentDistrict().subtitle}. Next district: ${locked.name} (${locked.unlockText}).`
    : `${currentDistrict().name} · ${currentDistrict().subtitle}. All districts unlocked.`;
  syncTitleButtons();
}

function syncHud() {
  const activeLead = getActiveLead();
  document.getElementById("hud-name").textContent = `${state.player.name} · ${currentDistrict().name}`;
  document.getElementById("hud-level").textContent = `Lv.${state.progress.level}`;
  document.getElementById("hud-xp").textContent = `XP ${state.progress.xp} / ${xpForLevel(state.progress.level)}`;
  document.getElementById("hud-coins").textContent = `Coins ${state.progress.coins}`;
  document.getElementById("hud-streak").textContent = `Streak ${state.progress.streak}`;
  document.getElementById("hud-active-lead").textContent = activeLead ? `Active: ${activeLead.company}` : "No active lead";
}

function renderSummary() {
  const summary = document.getElementById("summary-grid");
  summary.innerHTML = "";
  const stats = [
    { label: "District", value: currentDistrict().name },
    { label: "Target Role", value: state.player.targetRole },
    { label: "Applications", value: String(state.progress.applications) },
    { label: "Interviews", value: String(state.progress.interviews) },
    { label: "Offers", value: String(state.progress.offers) },
    { label: "Districts Unlocked", value: String(unlockedDistricts().length) },
  ];
  stats.forEach((item) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${item.label}</strong><p>${item.value}</p>`;
    summary.appendChild(card);
  });
}

function renderResumeSummary() {
  const container = document.getElementById("resume-summary");
  if (!state.resume.text) {
    container.innerHTML = "<strong>No resume intel yet</strong><p>Import your resume and the game will tailor quests and interview battles to your background.</p>";
    return;
  }
  const skills = strongestResumeSignals(4);
  container.innerHTML = `
    <strong>${state.resume.sourceName || "Resume imported"}</strong>
    <p>${state.resume.summary || "Resume intel ready."}</p>
    <div class="resume-skill-list">${skills.map((skill) => `<span class="badge">${skill}</span>`).join("") || '<span class="inline-note">No strong signals detected yet.</span>'}</div>
  `;
}

function renderLeadList() {
  const container = document.getElementById("lead-list");
  container.innerHTML = "";
  if (!state.leads.length) {
    container.innerHTML = `<div class="quest-card"><strong>No leads yet</strong><p>Add a company to start the loop.</p></div>`;
    return;
  }

  [...state.leads]
    .sort((a, b) => ({ High: 0, Medium: 1, Low: 2 }[a.priority] - { High: 0, Medium: 1, Low: 2 }[b.priority] || b.updatedAt - a.updatedAt))
    .forEach((lead) => {
      const isActive = lead.id === state.meta.activeLeadId;
      const quests = buildLeadQuests(lead).slice(0, 2);
      const card = document.createElement("div");
      card.className = "lead-card";
      card.innerHTML = `
        <div class="lead-card-header">
          <div>
            <strong>${lead.company}</strong>
            <p>${lead.role}</p>
          </div>
          <span class="badge ${lead.priority.toLowerCase()}">${lead.priority}</span>
        </div>
        <p>${lead.location || "Location TBD"} · ${lead.district}</p>
        <p>Stage: ${stageLabels[getLeadStage(lead)]}</p>
        <p>${getNextObjective(lead)}</p>
        <div class="quest-checklist">${quests.map((quest) => `<span class="badge">${quest.title}</span>`).join("")}</div>
        <div class="lead-card-actions"></div>
      `;
      const actions = card.querySelector(".lead-card-actions");

      const activeBtn = document.createElement("button");
      activeBtn.className = `pixel-btn ${isActive ? "primary" : "ghost"} small`;
      activeBtn.textContent = isActive ? "Active Lead" : "Set Active";
      activeBtn.onclick = () => setActiveLead(lead.id);
      actions.appendChild(activeBtn);

      const editBtn = document.createElement("button");
      editBtn.className = "pixel-btn ghost small";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => openLeadModal(lead.id);
      actions.appendChild(editBtn);

      const questBtn = document.createElement("button");
      questBtn.className = "pixel-btn ghost small";
      questBtn.textContent = "Quest Intel";
      questBtn.onclick = () => showLeadQuestDialogue(lead);
      actions.appendChild(questBtn);

      if (lead.url) {
        const linkBtn = document.createElement("button");
        linkBtn.className = "pixel-btn ghost small";
        linkBtn.textContent = "Open Link";
        linkBtn.onclick = () => window.open(lead.url, "_blank", "noopener");
        actions.appendChild(linkBtn);
      }

      container.appendChild(card);
    });
}

function showLeadQuestDialogue(lead) {
  const quests = buildLeadQuests(lead);
  showDialogue({
    speaker: `${lead.company} Quest Intel`,
    text: quests.map((quest, index) => `${index + 1}. ${quest.title}: ${quest.text}`).join(" "),
    actions: [
      { label: "Set Active", onSelect: () => setActiveLead(lead.id) },
      { label: "Close", onSelect: hideDialogue },
    ],
  });
}

function renderQuestBoard() {
  const board = document.getElementById("quest-board");
  board.innerHTML = "";
  const activeLead = getActiveLead();
  const quests = [];

  if (activeLead) {
    buildLeadQuests(activeLead).forEach((quest) => {
      quests.push({ title: `${quest.done ? "Done" : "Quest"}: ${quest.title}`, description: quest.text });
    });
  } else {
    quests.push({ title: "No active lead", description: "Open the roster and set a lead active so the buildings know which company run you are on." });
  }

  const locked = nextLockedDistrict();
  quests.push({ title: "Current District", description: `${currentDistrict().name}: ${currentDistrict().subtitle}` });
  if (locked) quests.push({ title: "Next Unlock", description: `${locked.name} unlocks when ${locked.unlockText.toLowerCase()}.` });
  if (state.resume.text) quests.push({ title: "Resume Power-Up", description: `Lean on ${strongestResumeSignals(3).join(", ") || "your strongest work"} in your stories.` });

  quests.forEach((quest) => {
    const card = document.createElement("div");
    card.className = "quest-card";
    card.innerHTML = `<strong>${quest.title}</strong><p>${quest.description}</p>`;
    board.appendChild(card);
  });
}

function tileAt(x, y) {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return "T";
  return mapRows[y][x];
}

function tileSolid(char) {
  return char === "T" || char === "~";
}

function isBuildingTile(x, y) {
  return currentBuildings().some((building) => building.x === x && building.y === y);
}

function update(dt) {
  if (scene !== "world") return;
  if (
    currentDialogue ||
    battleState ||
    !leadModal.classList.contains("hidden") ||
    !introModal.classList.contains("hidden") ||
    !resumeModal.classList.contains("hidden") ||
    !journalPanel.classList.contains("hidden")
  ) return;

  moveCooldown -= dt;
  if (moveCooldown > 0) return;

  let dx = 0;
  let dy = 0;
  if (keys.ArrowLeft || keys.a) dx = -1;
  else if (keys.ArrowRight || keys.d) dx = 1;
  else if (keys.ArrowUp || keys.w) dy = -1;
  else if (keys.ArrowDown || keys.s) dy = 1;

  if (!dx && !dy) return;

  const nx = state.player.x + dx;
  const ny = state.player.y + dy;
  if (!tileSolid(tileAt(nx, ny)) && !isBuildingTile(nx, ny)) {
    state.player.x = nx;
    state.player.y = ny;
    saveState();
  }
  moveCooldown = 130;
}

function interact() {
  if (scene !== "world") return;
  if (!leadModal.classList.contains("hidden") || !introModal.classList.contains("hidden") || !resumeModal.classList.contains("hidden")) return;

  const targets = [
    { x: state.player.x + 1, y: state.player.y },
    { x: state.player.x - 1, y: state.player.y },
    { x: state.player.x, y: state.player.y + 1 },
    { x: state.player.x, y: state.player.y - 1 },
  ];

  const building = currentBuildings().find((entry) => targets.some((point) => point.x === entry.x && point.y === entry.y));
  if (building) {
    interactBuilding(building);
    return;
  }

  if (targets.some((point) => point.x === guideNpc.x && point.y === guideNpc.y)) {
    const signals = strongestResumeSignals(3);
    showCoachDialogue(
      state.resume.text
        ? `Your strongest signals right now are ${signals.join(", ") || "still forming"}. Use them to make every answer and application specific.`
        : "Import your resume when you can. Once I know your background, I can generate sharper company quests and better battle prompts."
    );
  }
}

function interactBuilding(building) {
  const activeLead = getActiveLead();
  const action = building.action;

  if (action === "home") {
    const lines = [
      `${state.player.name}, you're in ${currentDistrict().name}.`,
      `Target role: ${state.player.targetRole}. Goal: ${state.player.goal}.`,
      activeLead ? `Current run: ${activeLead.company} at ${stageLabels[getLeadStage(activeLead)]}.` : "You do not have an active lead yet.",
    ];
    showDialogue({
      speaker: building.name,
      text: lines.join(" "),
      actions: [
        { label: "Open journal", onSelect: showJournal },
        { label: "Resume vault", onSelect: () => showModal(resumeModal) },
        { label: "Add lead", onSelect: () => openLeadModal() },
      ],
    });
    return;
  }

  if (action === "transit") {
    const available = unlockedDistricts();
    showDialogue({
      speaker: building.name,
      text: `Choose your next district. You are currently in ${currentDistrict().name}.`,
      actions: [
        ...available.map((district) => ({
          label: district.id === state.meta.currentDistrict ? `${district.name} (Here)` : district.name,
          onSelect: () => setDistrict(district.id),
        })),
        ...(nextLockedDistrict() ? [{ label: nextLockedDistrict().name, onSelect: () => showCoachDialogue(`${nextLockedDistrict().name} is still locked. ${nextLockedDistrict().unlockText}.`) }] : []),
      ],
    });
    return;
  }

  if (action === "scout") {
    const districtLeads = demoLeads.filter((lead) => lead.district === currentDistrict().id);
    showDialogue({
      speaker: building.name,
      text: `This district has ${districtLeads.length} seeded roles. Load more jobs into your roster or add your own.`,
      actions: [
        {
          label: "Load district jobs",
          onSelect: () => {
            districtLeads.forEach((lead) => {
              const exists = state.leads.some((entry) => entry.company === lead.company && entry.role === lead.role);
              if (!exists) addLead(lead, !state.meta.activeLeadId);
            });
            saveState();
            refreshChrome();
            showCoachDialogue(`${currentDistrict().name} jobs added to your roster.`);
          },
        },
        { label: "Add custom lead", onSelect: () => openLeadModal() },
        { label: "Open journal", onSelect: showJournal },
      ],
    });
    return;
  }

  if (action === "research") {
    if (!activeLead) {
      showCoachDialogue("Set an active lead first, then come back to research it.");
      return;
    }
    const profile = companyProfile(activeLead);
    showDialogue({
      speaker: building.name,
      text: `${activeLead.company} focus: ${profile.focus}. ${profile.prep}`,
      actions: [
        { label: "Log research", onSelect: () => progressLead("researched") },
        { label: "Quest Intel", onSelect: () => showLeadQuestDialogue(activeLead) },
      ],
    });
    return;
  }

  if (action === "resume") {
    if (!activeLead) {
      showCoachDialogue("Set an active lead first, then tailor your story for it.");
      return;
    }
    if (!state.resume.text) {
      showDialogue({
        speaker: building.name,
        text: "Import your resume to unlock better tailoring guidance.",
        actions: [
          { label: "Open Resume Vault", onSelect: () => showModal(resumeModal) },
          { label: "Tailor anyway", onSelect: () => progressLead("tailored") },
        ],
      });
      return;
    }
    const quest = buildLeadQuests(activeLead)[1];
    showDialogue({
      speaker: building.name,
      text: quest.text,
      actions: [
        { label: "Log tailoring", onSelect: () => progressLead("tailored") },
        { label: "Open listing", onSelect: () => activeLead.url && window.open(activeLead.url, "_blank", "noopener") },
      ],
    });
    return;
  }

  if (action === "network") {
    progressLead("networked");
    return;
  }

  if (action === "screen") {
    progressLead("screened");
    return;
  }

  if (action === "apply") {
    if (!activeLead) {
      showCoachDialogue("Set an active lead first, then submit or follow up.");
      return;
    }
    showDialogue({
      speaker: building.name,
      text: `Ready to log the ${activeLead.company} submission? ${getNextObjective(activeLead)}`,
      actions: [
        ...(activeLead.url ? [{ label: "Open listing", onSelect: () => window.open(activeLead.url, "_blank", "noopener") }] : []),
        { label: activeLead.steps.applied ? "Log follow-up" : "Log application", onSelect: () => progressLead(activeLead.steps.applied ? "followedUp" : "applied") },
        { label: "Close", onSelect: hideDialogue },
      ],
    });
    return;
  }

  if (action === "interview") {
    progressLead("interviewing");
    return;
  }

  if (action === "offer") {
    progressLead("offered");
  }
}

function drawWorld() {
  if (scene !== "world") {
    ctx.fillStyle = "#081820";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  camera.x = state.player.x * TILE - canvas.width / 2 + TILE / 2;
  camera.y = state.player.y * TILE - canvas.height / 2 + TILE / 2;

  ctx.fillStyle = districtBackground();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) drawTile(x, y, tileAt(x, y));
  }

  currentBuildings().forEach((building) => drawBuilding(building));
  drawGuide();
  drawPlayer();
  drawDistrictBanner();
  drawInteractionPrompt();
}

function districtBackground() {
  const id = currentDistrict().id;
  if (id === "scale") return "#111b2e";
  if (id === "summit") return "#16142e";
  return "#081820";
}

function drawTile(x, y, char) {
  const px = x * TILE - camera.x;
  const py = y * TILE - camera.y;
  if (px < -TILE || py < -TILE || px > canvas.width + TILE || py > canvas.height + TILE) return;

  if (char === "T") {
    ctx.fillStyle = currentDistrict().id === "summit" ? "#465a7d" : "#4f772d";
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = currentDistrict().id === "summit" ? "#7189a8" : "#31572c";
    ctx.beginPath();
    ctx.arc(px + 16, py + 14, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#432818";
    ctx.fillRect(px + 13, py + 18, 6, 12);
    return;
  }

  if (char === "~") {
    ctx.fillStyle = currentDistrict().id === "summit" ? "#4a5bd8" : "#3a7ca5";
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = "#8ecae6";
    ctx.fillRect(px + 4, py + 10, 24, 3);
    ctx.fillRect(px + 8, py + 19, 16, 3);
    return;
  }

  if (char === ",") {
    ctx.fillStyle = currentDistrict().id === "scale" ? "#b8a17c" : "#d9b06f";
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = currentDistrict().id === "scale" ? "#9b8767" : "#c89450";
    ctx.fillRect(px + 4, py + 4, 24, 24);
    return;
  }

  const grassA = currentDistrict().id === "scale" ? "#5f7f3f" : currentDistrict().id === "summit" ? "#4d5f86" : "#7aa032";
  const grassB = currentDistrict().id === "scale" ? "#516d38" : currentDistrict().id === "summit" ? "#415074" : "#6c8f2f";
  ctx.fillStyle = (x + y) % 2 === 0 ? grassA : grassB;
  ctx.fillRect(px, py, TILE, TILE);
  if (char === "F") {
    ctx.fillStyle = "#ffe66d";
    ctx.fillRect(px + 10, py + 8, 4, 4);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(px + 16, py + 14, 4, 4);
    ctx.fillStyle = "#f4f1de";
    ctx.fillRect(px + 22, py + 10, 3, 3);
  }
}

function drawBuilding(building) {
  const px = building.x * TILE - camera.x;
  const py = building.y * TILE - camera.y;
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(px - 2, py + 4, TILE + 8, TILE + 8);
  ctx.fillStyle = building.color;
  ctx.fillRect(px - 4, py - 2, TILE + 8, TILE + 10);
  ctx.fillStyle = building.roof;
  ctx.beginPath();
  ctx.moveTo(px - 8, py + 4);
  ctx.lineTo(px + TILE / 2, py - 12);
  ctx.lineTo(px + TILE + 8, py + 4);
  ctx.fill();
  ctx.fillStyle = "#f1faee";
  ctx.fillRect(px + 8, py + 10, 16, 12);
  ctx.fillStyle = "#172015";
  ctx.fillRect(px + 13, py + 18, 6, 14);
  ctx.fillStyle = "#f1faee";
  ctx.font = "12px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.fillText(building.glyph, px + TILE / 2, py - 16);
  ctx.font = "10px 'Press Start 2P'";
  ctx.fillStyle = "#e0f8cf";
  ctx.fillText(building.name, px + TILE / 2, py + TILE + 18);
  ctx.textAlign = "start";

  const activeLead = getActiveLead();
  if (activeLead) {
    const stepMap = {
      research: "researched",
      resume: "tailored",
      network: "networked",
      screen: "screened",
      apply: activeLead.steps.applied ? "followedUp" : "applied",
      interview: "interviewing",
      offer: "offered",
    };
    const step = stepMap[building.action];
    if (step && !activeLead.steps[step]) {
      ctx.fillStyle = "#ffcd38";
      ctx.fillRect(px + TILE - 8, py - 8, 6, 6);
    }
  }
}

function drawGuide() {
  const px = guideNpc.x * TILE - camera.x;
  const py = guideNpc.y * TILE - camera.y;
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(px + 8, py + 8, 16, 16);
  ctx.fillStyle = "#0f380f";
  ctx.fillRect(px + 10, py + 12, 3, 3);
  ctx.fillRect(px + 19, py + 12, 3, 3);
  ctx.fillRect(px + 12, py + 20, 8, 2);
  ctx.font = "10px 'Press Start 2P'";
  ctx.fillStyle = "#e0f8cf";
  ctx.fillText("Coach", px - 6, py - 8);
}

function drawPlayer() {
  const px = state.player.x * TILE - camera.x;
  const py = state.player.y * TILE - camera.y;
  ctx.fillStyle = "#1d3557";
  ctx.fillRect(px + 8, py + 8, 16, 18);
  ctx.fillStyle = "#f1c27d";
  ctx.fillRect(px + 10, py + 3, 12, 10);
  ctx.fillStyle = currentDistrict().id === "summit" ? "#ff8fab" : "#e63946";
  ctx.fillRect(px + 7, py + 1, 18, 5);
  ctx.fillStyle = "#172015";
  ctx.fillRect(px + 11, py + 7, 2, 2);
  ctx.fillRect(px + 19, py + 7, 2, 2);
}

function drawDistrictBanner() {
  ctx.fillStyle = "rgba(8,24,32,0.72)";
  ctx.fillRect(20, 82, 230, 36);
  ctx.strokeStyle = "#e0f8cf";
  ctx.strokeRect(20, 82, 230, 36);
  ctx.fillStyle = "#e0f8cf";
  ctx.font = "10px 'Press Start 2P'";
  ctx.fillText(currentDistrict().name, 32, 104);
}

function drawInteractionPrompt() {
  const prompt = nearbyInteractionLabel();
  if (!prompt) return;
  ctx.font = "10px 'Press Start 2P'";
  const width = ctx.measureText(prompt).width + 26;
  const px = state.player.x * TILE - camera.x;
  const py = state.player.y * TILE - camera.y;
  ctx.fillStyle = "rgba(224,248,207,0.94)";
  ctx.fillRect(px - width / 2 + 16, py - 28, width, 20);
  ctx.strokeStyle = "#172015";
  ctx.strokeRect(px - width / 2 + 16, py - 28, width, 20);
  ctx.fillStyle = "#172015";
  ctx.textAlign = "center";
  ctx.fillText(prompt, px + 16, py - 14);
  ctx.textAlign = "start";
}

function nearbyInteractionLabel() {
  const targets = [
    { x: state.player.x + 1, y: state.player.y },
    { x: state.player.x - 1, y: state.player.y },
    { x: state.player.x, y: state.player.y + 1 },
    { x: state.player.x, y: state.player.y - 1 },
  ];
  const building = currentBuildings().find((entry) => targets.some((point) => point.x === entry.x && point.y === entry.y));
  if (building) return `SPACE ${building.name}`;
  if (targets.some((point) => point.x === guideNpc.x && point.y === guideNpc.y)) return "SPACE Coach Byte";
  return "";
}

function loop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  update(dt);
  drawWorld();
  requestAnimationFrame(loop);
}

newGameBtn.addEventListener("click", beginNewAdventure);
continueBtn.addEventListener("click", startWorld);
importResumeTitleBtn.addEventListener("click", () => showModal(resumeModal));
openResumeModalBtn.addEventListener("click", () => showModal(resumeModal));
openResumeJournalBtn.addEventListener("click", () => showModal(resumeModal));
resetBtn.addEventListener("click", resetState);
startSaveBtn.addEventListener("click", createNewSave);
quickAddBtn.addEventListener("click", () => openLeadModal());
deleteLeadBtn.addEventListener("click", deleteLead);
closeBattleBtn.addEventListener("click", closeBattle);
saveResumeBtn.addEventListener("click", saveResumeIntel);
leadForm.addEventListener("submit", updateLeadFromForm);

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => hideModal(document.getElementById(button.dataset.closeModal)));
});

document.querySelectorAll("[data-hide]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.hide).classList.add("hidden"));
});

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;

  if ((event.key === " " || event.key === "Enter") && !battleState) {
    event.preventDefault();
    if (currentDialogue) return;
    interact();
  }

  if (event.key.toLowerCase() === "j" && scene === "world") {
    journalPanel.classList.toggle("hidden");
    refreshChrome();
  }

  if (event.key.toLowerCase() === "n" && scene === "world") {
    openLeadModal();
  }

  if (event.key.toLowerCase() === "r" && scene === "world") {
    showModal(resumeModal);
  }

  if (event.key === "Escape") {
    if (battleState) {
      closeBattle();
      return;
    }
    if (!leadModal.classList.contains("hidden")) {
      hideModal(leadModal);
      return;
    }
    if (!introModal.classList.contains("hidden")) {
      hideModal(introModal);
      return;
    }
    if (!resumeModal.classList.contains("hidden")) {
      hideModal(resumeModal);
      return;
    }
    if (currentDialogue) {
      hideDialogue();
      return;
    }
    if (!journalPanel.classList.contains("hidden")) hideJournal();
  }
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
refreshChrome();
syncTitleButtons();
requestAnimationFrame(loop);
