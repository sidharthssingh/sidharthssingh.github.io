const STORAGE_KEY = "career-quest-save-v4";
const TILE = 32;
const MAP_W = 20;
const MAP_H = 16;

const worldMap = [
  "TTTTTTTTTTTTTTTTTTTT",
  "T....GG....GG......T",
  "T..~~~~....~~~~....T",
  "T..,.,,....,,.,.G..T",
  "T..,.,....,,.,.....T",
  "T..,.GG....GG.,....T",
  "T....G....,,..G....T",
  "T..,,,,......G.,,..T",
  "T..,,...GG.F...,,..T",
  "T..,,....,,,,,,....T",
  "T....G..,,,,..G....T",
  "T........,,........T",
  "T....GG..,,...GG...T",
  "T........,,........T",
  "T......G....G......T",
  "TTTTTTTTTTTTTTTTTTTT",
];

const actualJobLinks = {
  openai: "https://openai.com/careers/search/?c=1888df7a-5060-4de1-a08d-a07e0ef96ab9",
  anthropic: "https://www.anthropic.com/careers",
  vercel: "https://vercel.com/careers",
  linear: "https://linear.app/careers",
  supabase: "https://supabase.com/careers",
  riot: "https://www.riotgames.com/en/work-with-us",
  atlassian: "https://www.atlassian.com/company/careers",
  google: "https://www.google.com/about/careers/applications/jobs/results/",
  microsoft: "https://careers.microsoft.com/v2/global/en/search",
  apple: "https://jobs.apple.com/en-us/search",
  stripe: "https://stripe.com/jobs/search",
  databricks: "https://www.databricks.com/company/careers/open-positions",
  figma: "https://www.figma.com/careers/",
  notion: "https://www.notion.so/careers",
  nvidia: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite",
  roblox: "https://careers.roblox.com/",
};

const keywordSignals = [
  { key: "ai", label: "AI", tests: ["ai", "machine learning", "llm", "model", "genai", "artificial intelligence"] },
  { key: "platform", label: "Platform", tests: ["platform", "api", "sdk", "developer", "integration"] },
  { key: "analytics", label: "Analytics", tests: ["analytics", "metrics", "data", "sql", "experiment"] },
  { key: "growth", label: "Growth", tests: ["growth", "retention", "funnel", "acquisition", "engagement"] },
  { key: "gaming", label: "Gaming", tests: ["game", "gaming", "player", "live ops", "live service"] },
  { key: "leadership", label: "Leadership", tests: ["led", "managed", "strategy", "stakeholder", "cross-functional"] },
  { key: "execution", label: "Execution", tests: ["launched", "shipped", "roadmap", "delivery", "execution"] },
  { key: "design", label: "UX", tests: ["user research", "design", "ux", "customer journey", "prototype"] },
];

const districts = [
  {
    id: "starter",
    name: "Pallet Portfolio",
    subtitle: "Catch leads and build momentum",
    unlockText: "Available from the start",
    palette: { bg: "#10261d", grassA: "#7aa032", grassB: "#6c8f2f", treeA: "#446b2d", treeB: "#274d1d", water: "#3a7ca5", pathA: "#d6b06f", pathB: "#c89656" },
    encounterRate: 0.18,
    isUnlocked: () => true,
    buildings: [
      { id: "home", label: "Home Base", glyph: "H", x: 9, y: 11, color: "#4d68a8", roof: "#3f4e87", action: "home" },
      { id: "dex", label: "Job Dex Lab", glyph: "D", x: 5, y: 4, color: "#8e7d4d", roof: "#75653c", action: "dex" },
      { id: "resume", label: "Resume Forge", glyph: "R", x: 10, y: 4, color: "#b84545", roof: "#913737", action: "resume" },
      { id: "network", label: "Network Cafe", glyph: "N", x: 16, y: 7, color: "#4f8d62", roof: "#3f704e", action: "network" },
      { id: "apply", label: "Application Gate", glyph: "A", x: 3, y: 7, color: "#8b6ad0", roof: "#6e51b0", action: "apply" },
      { id: "dojo", label: "Interview Dojo", glyph: "I", x: 7, y: 9, color: "#d17c35", roof: "#b56526", action: "interview" },
      { id: "transit", label: "Transit Depot", glyph: "T", x: 12, y: 9, color: "#5aa7a7", roof: "#46898a", action: "transit" },
    ],
    jobs: [
      { id: "vercel-pm", company: "Vercel", role: "Product Manager", url: actualJobLinks.vercel, location: "NYC / SF", priority: "High", type: "Platform", emoji: "▲", hp: 92, district: "starter" },
      { id: "linear-pm", company: "Linear", role: "Product Manager", url: actualJobLinks.linear, location: "Remote", priority: "High", type: "Execution", emoji: "◆", hp: 88, district: "starter" },
      { id: "supabase-pm", company: "Supabase", role: "Product Team Role", url: actualJobLinks.supabase, location: "Remote", priority: "Medium", type: "Platform", emoji: "⚡", hp: 84, district: "starter" },
      { id: "figma-pm", company: "Figma", role: "Product Role", url: actualJobLinks.figma, location: "Remote / NYC", priority: "Medium", type: "Design", emoji: "◼", hp: 86, district: "starter" },
      { id: "notion-pm", company: "Notion", role: "Product Role", url: actualJobLinks.notion, location: "SF / NYC", priority: "Medium", type: "UX", emoji: "N", hp: 85, district: "starter" },
    ],
  },
  {
    id: "scale",
    name: "Cerulean Careers",
    subtitle: "Research, screen, and level up",
    unlockText: "Unlocks after 3 captures or level 3",
    palette: { bg: "#141f33", grassA: "#688848", grassB: "#54723a", treeA: "#566b8a", treeB: "#3f5272", water: "#4a67b8", pathA: "#bca681", pathB: "#9f8a67" },
    encounterRate: 0.2,
    isUnlocked: (state) => state.progress.captures >= 3 || state.progress.level >= 3,
    buildings: [
      { id: "guild", label: "Guild Hall", glyph: "G", x: 9, y: 11, color: "#4a61b8", roof: "#344589", action: "home" },
      { id: "research", label: "Research Library", glyph: "L", x: 5, y: 4, color: "#6b7da0", roof: "#53627c", action: "research" },
      { id: "portfolio", label: "Portfolio Studio", glyph: "P", x: 10, y: 4, color: "#c45e49", roof: "#a04939", action: "resume" },
      { id: "screen", label: "Recruiter Row", glyph: "Q", x: 16, y: 7, color: "#4e9f7a", roof: "#3d7e61", action: "screen" },
      { id: "apply-scale", label: "Apply Terminal", glyph: "A", x: 3, y: 7, color: "#8f68d6", roof: "#704eb1", action: "apply" },
      { id: "case", label: "Case Arena", glyph: "C", x: 7, y: 9, color: "#d48a2a", roof: "#ae6d1f", action: "interview" },
      { id: "transit-scale", label: "Sky Rail", glyph: "T", x: 12, y: 9, color: "#55a9c6", roof: "#3e869f", action: "transit" },
    ],
    jobs: [
      { id: "google-pm", company: "Google", role: "Senior Product Manager", url: actualJobLinks.google, location: "Mountain View", priority: "High", type: "Scale", emoji: "G", hp: 96, district: "scale" },
      { id: "microsoft-pm", company: "Microsoft", role: "Principal PM", url: actualJobLinks.microsoft, location: "Seattle", priority: "High", type: "Platform", emoji: "⊞", hp: 95, district: "scale" },
      { id: "stripe-pm", company: "Stripe", role: "Product Manager", url: actualJobLinks.stripe, location: "SF / Remote", priority: "High", type: "Payments", emoji: "S", hp: 98, district: "scale" },
      { id: "databricks-pm", company: "Databricks", role: "PM, ML Platform", url: actualJobLinks.databricks, location: "San Francisco", priority: "Medium", type: "Data", emoji: "◧", hp: 94, district: "scale" },
      { id: "atlassian-pm", company: "Atlassian", role: "Product Role", url: actualJobLinks.atlassian, location: "Remote", priority: "Medium", type: "Collaboration", emoji: "A", hp: 92, district: "scale" },
      { id: "apple-pm", company: "Apple", role: "PM, Platform", url: actualJobLinks.apple, location: "Cupertino", priority: "Low", type: "Execution", emoji: "", hp: 99, district: "scale" },
    ],
  },
  {
    id: "summit",
    name: "Indigo Offers",
    subtitle: "Boss fights and offer castle",
    unlockText: "Unlocks after 2 interviews or level 5",
    palette: { bg: "#1a1633", grassA: "#57699a", grassB: "#465380", treeA: "#7567a6", treeB: "#5b4d86", water: "#6752c8", pathA: "#af97c9", pathB: "#927bb2" },
    encounterRate: 0.24,
    isUnlocked: (state) => state.progress.interviews >= 2 || state.progress.level >= 5,
    buildings: [
      { id: "war-room", label: "War Room", glyph: "W", x: 9, y: 11, color: "#466faa", roof: "#355587", action: "home" },
      { id: "signal", label: "Signal Observatory", glyph: "O", x: 5, y: 4, color: "#7a6ca8", roof: "#61538a", action: "research" },
      { id: "founder", label: "Founder Lounge", glyph: "F", x: 10, y: 4, color: "#bc5858", roof: "#954343", action: "network" },
      { id: "exec", label: "Exec Briefing", glyph: "E", x: 16, y: 7, color: "#5b9f82", roof: "#467b65", action: "screen" },
      { id: "boss", label: "Boss Arena", glyph: "B", x: 7, y: 9, color: "#da7d26", roof: "#b35f1a", action: "interview" },
      { id: "offer", label: "Offer Castle", glyph: "O", x: 3, y: 7, color: "#59b6b4", roof: "#438d8c", action: "offer" },
      { id: "transit-summit", label: "Sky Dock", glyph: "T", x: 12, y: 9, color: "#5877cd", roof: "#405ba2", action: "transit" },
    ],
    jobs: [
      { id: "openai-pm", company: "OpenAI", role: "Product Manager, API Platform", url: actualJobLinks.openai, location: "San Francisco", priority: "High", type: "AI", emoji: "◎", hp: 106, district: "summit" },
      { id: "anthropic-pm", company: "Anthropic", role: "Product Manager", url: actualJobLinks.anthropic, location: "San Francisco", priority: "High", type: "AI", emoji: "△", hp: 104, district: "summit" },
      { id: "riot-pm", company: "Riot Games", role: "Senior PM, Live Services", url: actualJobLinks.riot, location: "Los Angeles", priority: "Medium", type: "Gaming", emoji: "⚔", hp: 102, district: "summit" },
      { id: "roblox-pm", company: "Roblox", role: "Product Role", url: actualJobLinks.roblox, location: "San Mateo", priority: "Medium", type: "Gaming", emoji: "◈", hp: 101, district: "summit" },
      { id: "nvidia-pm", company: "NVIDIA", role: "AI Product Role", url: actualJobLinks.nvidia, location: "Santa Clara", priority: "Medium", type: "AI", emoji: "⬡", hp: 103, district: "summit" },
    ],
  },
];

const companyArchetypes = [
  { match: ["openai", "anthropic", "nvidia"], focus: "AI product judgment", prep: "Talk about model quality, developer adoption, and product tradeoffs under uncertainty." },
  { match: ["riot", "roblox"], focus: "player and ecosystem product sense", prep: "Talk about retention loops, trust, community, and long-term engagement." },
  { match: ["vercel", "linear", "supabase", "stripe", "databricks"], focus: "platform and developer empathy", prep: "Talk about APIs, workflow friction, DX, and measurable adoption." },
  { match: ["google", "microsoft", "apple", "atlassian"], focus: "scale and cross-functional execution", prep: "Talk about prioritization, alignment, ambiguity, and crisp metric thinking." },
  { match: ["figma", "notion"], focus: "product craft and UX judgment", prep: "Talk about user needs, product taste, collaboration, and quality details." },
];

const defaultState = () => ({
  player: {
    name: "Trainer",
    targetRole: "Product Manager",
    goal: "Land a role I am proud of",
    x: 9,
    y: 13,
  },
  progress: {
    xp: 0,
    level: 1,
    coins: 0,
    streak: 0,
    captures: 0,
    applications: 0,
    interviews: 0,
    offers: 0,
    wins: 0,
  },
  meta: {
    activeLeadId: null,
    nextLeadId: 1,
    currentDistrict: "starter",
  },
  resume: {
    text: "",
    sourceName: "",
    importedAt: null,
    summary: "",
    signals: [],
    highlights: [],
  },
  leads: [],
});

let state = loadState();
let scene = "title";
let currentDialogue = null;
let encounterState = null;
let lastTime = 0;
let camera = { x: 0, y: 0 };

const runtimePlayer = {
  x: state.player.x,
  y: state.player.y,
  renderX: state.player.x,
  renderY: state.player.y,
  moving: false,
  progress: 0,
  fromX: state.player.x,
  fromY: state.player.y,
  toX: state.player.x,
  toY: state.player.y,
  moveDuration: 140,
};

const keys = {};

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const titleScreen = document.getElementById("title-screen");
const introModal = document.getElementById("intro-modal");
const resumeModal = document.getElementById("resume-modal");
const leadModal = document.getElementById("lead-modal");
const battleModal = document.getElementById("battle-modal");
const journalPanel = document.getElementById("journal-panel");
const dialogueBox = document.getElementById("dialogue-box");
const dialogueSpeaker = document.getElementById("dialogue-speaker");
const dialogueText = document.getElementById("dialogue-text");
const dialogueActions = document.getElementById("dialogue-actions");
const hintBar = document.getElementById("hint-bar");

const playerNameInput = document.getElementById("player-name-input");
const targetRoleInput = document.getElementById("target-role-input");
const goalInput = document.getElementById("goal-input");
const resumeFileInput = document.getElementById("resume-file-input");
const resumeTextInput = document.getElementById("resume-text-input");
const resumeStatus = document.getElementById("resume-status");

const leadForm = document.getElementById("lead-form");
const leadModalTitle = document.getElementById("lead-modal-title");
const leadIdInput = document.getElementById("lead-id-input");
const companyInput = document.getElementById("company-input");
const roleInput = document.getElementById("role-input");
const locationInput = document.getElementById("location-input");
const priorityInput = document.getElementById("priority-input");
const urlInput = document.getElementById("url-input");
const notesInput = document.getElementById("notes-input");

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
    status: lead.status || "tracked",
    district: lead.district || "starter",
    notes: lead.notes || "",
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
  state.player.x = runtimePlayer.x;
  state.player.y = runtimePlayer.y;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentDistrict() {
  return districts.find((district) => district.id === state.meta.currentDistrict) || districts[0];
}

function currentBuildings() {
  return currentDistrict().buildings;
}

function unlockedDistricts() {
  return districts.filter((district) => district.isUnlocked(state));
}

function nextLockedDistrict() {
  return districts.find((district) => !district.isUnlocked(state));
}

function districtJobs(id = currentDistrict().id) {
  return districts.find((district) => district.id === id)?.jobs || [];
}

function hasCaptured(jobId) {
  return state.leads.some((lead) => lead.sourceJobId === jobId);
}

function availableWildJobs() {
  return districtJobs().filter((job) => !hasCaptured(job.id));
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
  if (lead.steps.offered) return "Offer won. Celebrate and negotiate thoughtfully.";
  if (lead.steps.rejected) return "Closed out. Capture notes and keep the run alive.";
  if (!lead.steps.researched) return "Visit the research building for this district.";
  if (!lead.steps.tailored) return "Tailor your story at Resume Forge.";
  if (!lead.steps.networked) return "Visit Network Cafe or Founder Lounge.";
  if (!lead.steps.screened) return "Prep your recruiter screen in the screen building.";
  if (!lead.steps.applied) return "Submit the real application at the gate.";
  if (!lead.steps.followedUp) return "Return to the gate and log a follow-up.";
  if (!lead.steps.interviewing) return "Win the interview battle in the arena.";
  return "Take the lead to Offer Castle when it resolves.";
}

function xpForLevel(level) {
  return level * 100;
}

function applyXp(amount) {
  state.progress.xp += amount;
  while (state.progress.xp >= xpForLevel(state.progress.level)) {
    state.progress.xp -= xpForLevel(state.progress.level);
    state.progress.level += 1;
  }
}

function companyProfile(entity) {
  const haystack = `${entity.company} ${entity.role}`.toLowerCase();
  return companyArchetypes.find((entry) => entry.match.some((term) => haystack.includes(term))) || {
    focus: "product judgment and execution",
    prep: "Expect product sense, prioritization, metrics, and communication questions.",
  };
}

function strongestResumeSignals(limit = 3) {
  return (state.resume.signals || []).slice(0, limit).map((signal) => signal.label);
}

function buildLeadQuests(lead) {
  const profile = companyProfile(lead);
  const signals = strongestResumeSignals(2);
  return [
    { title: "Research", text: `Understand ${lead.company}'s users, product bets, and likely metrics.`, done: lead.steps.researched },
    { title: "Story Match", text: state.resume.text ? `Connect your ${signals[0] || "product"} strengths to ${profile.focus}.` : "Import your resume to tailor the story better.", done: lead.steps.tailored },
    { title: "Warm Intro", text: `Find one human path into ${lead.company}: recruiter, teammate, founder, or creator.`, done: lead.steps.networked },
    { title: "Screen Prep", text: `Prepare a crisp answer for why ${lead.company}, why this role, and why now.`, done: lead.steps.screened },
    { title: "Boss Prep", text: profile.prep, done: lead.steps.interviewing },
  ];
}

function openExternalJob(url) {
  if (!url) return;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.href = url;
  }
}

function detectResumeIntel(text) {
  const normalized = text.toLowerCase();
  const signals = keywordSignals
    .map((signal) => ({
      label: signal.label,
      score: signal.tests.reduce((sum, test) => sum + (normalized.includes(test) ? 1 : 0), 0),
    }))
    .filter((signal) => signal.score > 0)
    .sort((a, b) => b.score - a.score);

  const highlights = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter((line) => /\b(led|launched|shipped|grew|built|owned|scaled)\b/i.test(line))
    .slice(0, 3);

  return {
    text,
    sourceName: resumeFileInput.files[0]?.name || "Pasted resume",
    importedAt: Date.now(),
    summary: signals.length ? `Top signals: ${signals.slice(0, 4).map((signal) => signal.label).join(", ")}` : "Resume imported.",
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
    if (firstLine && firstLine.length < 32 && !/\d/.test(firstLine) && state.player.name === "Trainer") {
      state.player.name = firstLine;
    }
    saveState();
    refreshChrome();
    resumeStatus.textContent = "Resume intel saved. Encounters, quests, and boss fights now adapt to your background.";
  } catch (error) {
    console.error(error);
    resumeStatus.textContent = "Could not parse that file. Try pasting the text instead.";
  }
}

function captureLeadFromEncounter(job) {
  const lead = normalizeLead({
    id: state.meta.nextLeadId++,
    sourceJobId: job.id,
    company: job.company,
    role: job.role,
    url: job.url,
    location: job.location,
    priority: job.priority,
    district: job.district,
    type: job.type,
    emoji: job.emoji,
    notes: "",
    status: "tracked",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  state.leads.push(lead);
  state.meta.activeLeadId = lead.id;
  state.progress.captures += 1;
  state.progress.coins += 8;
  applyXp(18);
  saveState();
  refreshChrome();
  return lead;
}

function showDialogue(config) {
  currentDialogue = config;
  dialogueSpeaker.textContent = config.speaker;
  dialogueText.textContent = config.text;
  dialogueActions.innerHTML = "";
  config.actions.forEach((action) => {
    if (action.href) {
      const link = document.createElement("a");
      link.className = `pixel-btn ${action.ghost ? "ghost" : "primary"} small`;
      link.textContent = action.label;
      link.href = action.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.onclick = () => {
        if (action.close !== false) hideDialogue();
      };
      dialogueActions.appendChild(link);
      return;
    }
    const button = document.createElement("button");
    button.className = `pixel-btn ${action.ghost ? "ghost" : "primary"} small`;
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

function showCoach(text, actions = [{ label: "Close", onSelect: hideDialogue }]) {
  showDialogue({ speaker: "Coach Byte", text, actions });
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

function refreshChrome() {
  const activeLead = getActiveLead();
  const locked = nextLockedDistrict();
  document.getElementById("hud-name").textContent = `${state.player.name} · ${currentDistrict().name}`;
  document.getElementById("hud-level").textContent = `Lv.${state.progress.level}`;
  document.getElementById("hud-xp").textContent = `XP ${state.progress.xp} / ${xpForLevel(state.progress.level)}`;
  document.getElementById("hud-coins").textContent = `Coins ${state.progress.coins}`;
  document.getElementById("hud-streak").textContent = `Captures ${state.progress.captures}`;
  document.getElementById("hud-active-lead").textContent = activeLead ? `Active: ${activeLead.company}` : "No active lead";
  hintBar.textContent = locked
    ? `${currentDistrict().name}: ${currentDistrict().subtitle}. Next district: ${locked.name} (${locked.unlockText}). Controls: arrows/WASD move, Space interact, J journal.`
    : `${currentDistrict().name}: ${currentDistrict().subtitle}. All districts unlocked. Controls: arrows/WASD move, Space interact, J journal.`;
  renderSummary();
  renderResumeSummary();
  renderLeadList();
  renderQuestBoard();
  syncTitleButtons();
}

function renderSummary() {
  const summary = document.getElementById("summary-grid");
  summary.innerHTML = "";
  [
    { label: "District", value: currentDistrict().name },
    { label: "Captures", value: String(state.progress.captures) },
    { label: "Applications", value: String(state.progress.applications) },
    { label: "Interviews", value: String(state.progress.interviews) },
    { label: "Offers", value: String(state.progress.offers) },
    { label: "Target Role", value: state.player.targetRole },
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${item.label}</strong><p>${item.value}</p>`;
    summary.appendChild(card);
  });
}

function renderResumeSummary() {
  const container = document.getElementById("resume-summary");
  if (!state.resume.text) {
    container.innerHTML = "<strong>No resume intel yet</strong><p>Import your resume to boost tailoring, networking, and encounter power.</p>";
    return;
  }
  container.innerHTML = `
    <strong>${state.resume.sourceName || "Resume imported"}</strong>
    <p>${state.resume.summary}</p>
    <div class="resume-skill-list">${strongestResumeSignals(4).map((signal) => `<span class="badge">${signal}</span>`).join("")}</div>
  `;
}

function renderLeadList() {
  const container = document.getElementById("lead-list");
  container.innerHTML = "";
  if (!state.leads.length) {
    container.innerHTML = "<div class=\"quest-card\"><strong>No captured jobmon yet</strong><p>Walk through tall grass and throw an application packet to capture your first lead.</p></div>";
    return;
  }
  [...state.leads]
    .sort((a, b) => ({ High: 0, Medium: 1, Low: 2 }[a.priority] - { High: 0, Medium: 1, Low: 2 }[b.priority] || b.updatedAt - a.updatedAt))
    .forEach((lead) => {
      const active = lead.id === state.meta.activeLeadId;
      const card = document.createElement("div");
      card.className = "lead-card";
      card.innerHTML = `
        <div class="lead-card-header">
          <div>
            <strong>${lead.emoji || "◉"} ${lead.company}</strong>
            <p>${lead.role}</p>
          </div>
          <span class="badge ${lead.priority.toLowerCase()}">${lead.priority}</span>
        </div>
        <p>${lead.location || "Location TBD"} · ${stageLabels[getLeadStage(lead)]}</p>
        <p>${getNextObjective(lead)}</p>
        <p><a href="${lead.url}" target="_blank" rel="noopener noreferrer">Open official job page</a></p>
        <div class="lead-card-actions"></div>
      `;
      const actions = card.querySelector(".lead-card-actions");
      const activeBtn = document.createElement("button");
      activeBtn.className = `pixel-btn ${active ? "primary" : "ghost"} small`;
      activeBtn.textContent = active ? "Active" : "Set Active";
      activeBtn.onclick = () => setActiveLead(lead.id);
      actions.appendChild(activeBtn);
      const intelBtn = document.createElement("button");
      intelBtn.className = "pixel-btn ghost small";
      intelBtn.textContent = "Quest Intel";
      intelBtn.onclick = () => showLeadIntel(lead);
      actions.appendChild(intelBtn);
      const linkBtn = document.createElement("button");
      linkBtn.className = "pixel-btn ghost small";
      linkBtn.textContent = "Open Job";
      linkBtn.onclick = () => openExternalJob(lead.url);
      actions.appendChild(linkBtn);
      const editBtn = document.createElement("button");
      editBtn.className = "pixel-btn ghost small";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => openLeadModal(lead.id);
      actions.appendChild(editBtn);
      container.appendChild(card);
    });
}

function renderQuestBoard() {
  const board = document.getElementById("quest-board");
  board.innerHTML = "";
  const activeLead = getActiveLead();
  const quests = activeLead
    ? buildLeadQuests(activeLead)
    : [{ title: "No Active Lead", text: "Capture a job in the grass and set it active in the journal.", done: false }];
  quests.forEach((quest) => {
    const card = document.createElement("div");
    card.className = "quest-card";
    card.innerHTML = `<strong>${quest.done ? "Done" : "Quest"}: ${quest.title}</strong><p>${quest.text}</p>`;
    board.appendChild(card);
  });
  const locked = nextLockedDistrict();
  if (locked) {
    const card = document.createElement("div");
    card.className = "quest-card";
    card.innerHTML = `<strong>District Unlock</strong><p>${locked.name}: ${locked.unlockText}</p>`;
    board.appendChild(card);
  }
}

function syncTitleButtons() {
  const canContinue = state.leads.length > 0 || state.progress.captures > 0 || state.progress.xp > 0 || !!state.resume.text;
  document.getElementById("continue-btn").disabled = !canContinue;
  document.getElementById("continue-btn").style.opacity = canContinue ? "1" : "0.45";
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
  document.getElementById("delete-lead-btn").classList.toggle("hidden", !lead);
  showModal(leadModal);
}

function updateLeadFromForm(event) {
  event.preventDefault();
  const id = Number(leadIdInput.value);
  if (id) {
    const lead = getLead(id);
    if (!lead) return;
    Object.assign(lead, {
      company: companyInput.value.trim(),
      role: roleInput.value.trim(),
      location: locationInput.value.trim(),
      priority: priorityInput.value,
      url: urlInput.value.trim(),
      notes: notesInput.value.trim(),
      updatedAt: Date.now(),
    });
  } else {
    const lead = normalizeLead({
      id: state.meta.nextLeadId++,
      company: companyInput.value.trim(),
      role: roleInput.value.trim(),
      location: locationInput.value.trim(),
      priority: priorityInput.value,
      url: urlInput.value.trim(),
      notes: notesInput.value.trim(),
      district: currentDistrict().id,
      emoji: "◉",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    state.leads.push(lead);
    state.meta.activeLeadId = lead.id;
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

function tileAt(x, y) {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return "T";
  return worldMap[y][x];
}

function isPassable(x, y) {
  const tile = tileAt(x, y);
  return tile !== "T" && tile !== "~" && !currentBuildings().some((building) => building.x === x && building.y === y);
}

function isTallGrass(x, y) {
  return tileAt(x, y) === "G";
}

function tryMove(dx, dy) {
  if (runtimePlayer.moving || currentDialogue || encounterState || !allOverlaysClosed()) return;
  const nx = runtimePlayer.x + dx;
  const ny = runtimePlayer.y + dy;
  if (!isPassable(nx, ny)) return;
  runtimePlayer.moving = true;
  runtimePlayer.progress = 0;
  runtimePlayer.fromX = runtimePlayer.x;
  runtimePlayer.fromY = runtimePlayer.y;
  runtimePlayer.toX = nx;
  runtimePlayer.toY = ny;
}

function finishMove() {
  runtimePlayer.moving = false;
  runtimePlayer.x = runtimePlayer.toX;
  runtimePlayer.y = runtimePlayer.toY;
  runtimePlayer.renderX = runtimePlayer.x;
  runtimePlayer.renderY = runtimePlayer.y;
  saveState();
  if (isTallGrass(runtimePlayer.x, runtimePlayer.y) && Math.random() < currentDistrict().encounterRate) {
    startWildEncounter();
  }
}

function startWildEncounter() {
  const wildPool = availableWildJobs();
  if (!wildPool.length) {
    showCoach("This district's tall grass is quiet. You already caught every seeded lead here.");
    return;
  }
  const job = structuredClone(wildPool[Math.floor(Math.random() * wildPool.length)]);
  encounterState = {
    kind: "wild",
    title: "Wild Encounter",
    subtitle: `A wild ${job.company} role appeared in the grass. Blue bar = your resolve. Red bar = the role's capture resistance.`,
    enemy: job,
    enemyHp: job.hp,
    playerHp: 100,
    captureBonus: 0,
    log: `You found ${job.company} ${job.role}. Open the official job page, weaken the lead, then use Apply to Capture to add it to your roster.`,
  };
  renderEncounter();
  showModal(battleModal);
}

function startInterviewEncounter(lead) {
  const profile = companyProfile(lead);
  encounterState = {
    kind: "interview",
    title: "Interview Boss Fight",
    subtitle: `${lead.company} is testing your ${profile.focus}.`,
    enemy: lead,
    enemyHp: 100,
    playerHp: 100,
    turn: 0,
    questions: [
      {
        prompt: `Why ${lead.company} and why this role right now?`,
        answers: [
          { text: `Tie your background to ${profile.focus} and mention one real reason this company matters to you.`, score: 28, feedback: "Specific and credible." },
          { text: "Say the company is exciting and you want to learn a lot.", score: 12, feedback: "Positive but generic." },
          { text: "Lead with title and compensation.", score: 5, feedback: "Not the signal they want first." },
        ],
      },
      {
        prompt: "Tell me about a product win that proves you can do this job.",
        answers: [
          { text: "Use a structured story with metric impact, ownership, and the tradeoff you made.", score: 30, feedback: "Strong evidence and structure." },
          { text: "Describe a team effort broadly without impact numbers.", score: 11, feedback: "Needs sharper ownership and outcomes." },
          { text: "Stay vague because details are hard to remember.", score: 4, feedback: "Specificity matters in interviews." },
        ],
      },
      {
        prompt: "What would your first 90 days look like here?",
        answers: [
          { text: "Learn the product and users, map the metrics, find quick wins, then prioritize with partners.", score: 26, feedback: "Grounded and realistic." },
          { text: "Ship something huge immediately to show impact.", score: 8, feedback: "Too rushed and context-light." },
          { text: "Wait for perfect clarity before making moves.", score: 3, feedback: "This role needs initiative." },
        ],
      },
    ],
    log: `Boss fight started. Beat the panel with relevance, structure, and evidence.`,
  };
  renderEncounter();
  showModal(battleModal);
}

function renderEncounter() {
  if (!encounterState) return;
  document.getElementById("battle-title").textContent = encounterState.title;
  document.getElementById("battle-subtitle").textContent = encounterState.subtitle;
  document.getElementById("battle-player-name").textContent = state.player.name;
  document.getElementById("battle-player-role").textContent = encounterState.kind === "wild" ? "Resolve Meter" : state.player.targetRole;
  document.getElementById("battle-enemy-name").textContent = `${encounterState.enemy.emoji || "◉"} ${encounterState.enemy.company}`;
  document.getElementById("battle-enemy-role").textContent = encounterState.enemy.role;
  document.getElementById("battle-player-hp").style.width = `${Math.max(0, encounterState.playerHp)}%`;
  document.getElementById("battle-enemy-hp").style.width = `${Math.max(0, encounterState.enemyHp)}%`;
  document.getElementById("battle-log").textContent = encounterState.log;

  const questionEl = document.getElementById("battle-question");
  const answersEl = document.getElementById("battle-answers");
  const actionsEl = document.getElementById("battle-actions");
  answersEl.innerHTML = "";
  actionsEl.innerHTML = "";

  if (encounterState.kind === "wild") {
    questionEl.textContent = `Type: ${encounterState.enemy.type} · Resistance ${Math.max(0, encounterState.enemyHp)} / ${encounterState.enemy.hp}`;
    [
      { label: "Research", onClick: () => wildAttack("research") },
      { label: "Tailor", onClick: () => wildAttack("tailor") },
      { label: "Network", onClick: () => wildAttack("network") },
      { label: "Apply to Capture", onClick: throwApplicationPacket },
    ].forEach((move) => {
      const button = document.createElement("button");
      button.className = "pixel-btn primary";
      button.textContent = move.label;
      button.onclick = move.onClick;
      answersEl.appendChild(button);
    });
    const runBtn = document.createElement("button");
    runBtn.className = "pixel-btn ghost small";
    runBtn.textContent = "Run";
    runBtn.onclick = endEncounter;
    actionsEl.appendChild(runBtn);
    const linkEl = document.createElement("a");
    linkEl.className = "pixel-btn ghost small";
    linkEl.textContent = "Open Official Job";
    linkEl.href = encounterState.enemy.url;
    linkEl.target = "_blank";
    linkEl.rel = "noopener noreferrer";
    actionsEl.appendChild(linkEl);
    return;
  }

  const prompt = encounterState.questions[encounterState.turn];
  if (!prompt) {
    questionEl.textContent = "Boss fight complete.";
  } else {
    questionEl.textContent = prompt.prompt;
    prompt.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.className = "pixel-btn primary";
      button.textContent = answer.text;
      button.onclick = () => resolveInterviewTurn(answer);
      answersEl.appendChild(button);
    });
  }
  const retreatBtn = document.createElement("button");
  retreatBtn.className = "pixel-btn ghost small";
  retreatBtn.textContent = "Retreat";
  retreatBtn.onclick = endEncounter;
  actionsEl.appendChild(retreatBtn);
}

function wildAttack(type) {
  if (!encounterState || encounterState.kind !== "wild") return;
  const multipliers = {
    research: 14,
    tailor: state.resume.text ? 24 : 16,
    network: 12,
  };
  const enemyDamage = multipliers[type];
  encounterState.enemyHp = Math.max(0, encounterState.enemyHp - enemyDamage);
  if (type === "network") encounterState.captureBonus += 10;
  encounterState.log = `${type === "research" ? "You studied the role." : type === "tailor" ? "You hit with a tailored story." : "You built warm rapport."} ${encounterState.enemy.company} lost ${enemyDamage} HP.`;
  if (encounterState.enemyHp <= 0) {
    encounterState.log += " The lead is ready for an application packet.";
    renderEncounter();
    return;
  }
  const counter = 10 + Math.floor(Math.random() * 10);
  encounterState.playerHp = Math.max(0, encounterState.playerHp - counter);
  encounterState.log += ` ${encounterState.enemy.company} pushed back for ${counter} resolve damage.`;
  if (encounterState.playerHp <= 0) {
    encounterState.log = `You ran out of resolve. Regroup and come back stronger.`;
  }
  renderEncounter();
}

function throwApplicationPacket() {
  if (!encounterState || encounterState.kind !== "wild") return;
  const captureChance = Math.min(0.92, 0.22 + encounterState.captureBonus / 100 + (encounterState.enemy.hp - encounterState.enemyHp) / encounterState.enemy.hp * 0.6);
  if (Math.random() < captureChance) {
    const lead = captureLeadFromEncounter(encounterState.enemy);
    encounterState.log = `Captured ${lead.company}. It was added to your roster and set as your active lead. Visit Application Gate to open the real posting and log your application.`;
    renderEncounter();
    setTimeout(endEncounter, 700);
    return;
  }
  const counter = 14 + Math.floor(Math.random() * 8);
  encounterState.playerHp = Math.max(0, encounterState.playerHp - counter);
  encounterState.log = `${encounterState.enemy.company} broke free of the application packet. You took ${counter} resolve damage.`;
  if (encounterState.playerHp <= 0) encounterState.log += " The opportunity got away this time.";
  renderEncounter();
}

function resolveInterviewTurn(answer) {
  if (!encounterState || encounterState.kind !== "interview") return;
  const lead = getLead(encounterState.enemy.id);
  const counter = Math.max(8, 30 - answer.score);
  encounterState.enemyHp = Math.max(0, encounterState.enemyHp - answer.score);
  encounterState.playerHp = Math.max(0, encounterState.playerHp - counter);
  encounterState.log = `${answer.feedback} ${lead.company} pushed back for ${counter} resolve damage.`;

  if (encounterState.enemyHp <= 0) {
    lead.steps.interviewing = true;
    lead.updatedAt = Date.now();
    state.progress.interviews += 1;
    state.progress.wins += 1;
    applyXp(55);
    saveState();
    refreshChrome();
    encounterState.log = `Victory. ${lead.company} sees you as interview-ready.`;
    renderEncounter();
    return;
  }

  if (encounterState.playerHp <= 0) {
    encounterState.log = `You lost the boss fight. Tighten your stories and try again.`;
    renderEncounter();
    return;
  }

  encounterState.turn += 1;
  if (encounterState.turn >= encounterState.questions.length) {
    if (encounterState.enemyHp < encounterState.playerHp) {
      lead.steps.interviewing = true;
      lead.updatedAt = Date.now();
      state.progress.interviews += 1;
      state.progress.wins += 1;
      applyXp(45);
      saveState();
      refreshChrome();
      encounterState.log = `Narrow win. ${lead.company} bought your story.`;
    } else {
      encounterState.log = `The panel still has doubts. Train again in the arena.`;
    }
  }
  renderEncounter();
}

function endEncounter() {
  encounterState = null;
  hideModal(battleModal);
}

function progressLead(step) {
  const lead = getActiveLead();
  if (!lead) {
    showCoach("Set an active lead from your journal first.");
    return;
  }
  const blockers = {
    researched: () => null,
    tailored: () => (!lead.steps.researched ? "Research the company first." : null),
    networked: () => (!lead.steps.tailored ? "Tailor your story first." : null),
    screened: () => (!lead.steps.networked ? "Warm the lead with outreach first." : null),
    applied: () => (!lead.steps.screened ? "Prep the recruiter screen first." : null),
    followedUp: () => (!lead.steps.applied ? "Submit the real application first." : null),
    interviewing: () => (!lead.steps.followedUp ? "Send the follow-up before the boss fight." : null),
    offered: () => (!lead.steps.interviewing ? "Win the interview boss fight first." : null),
  };
  const block = blockers[step]?.();
  if (block) {
    showCoach(block);
    return;
  }

  if (step === "interviewing") {
    startInterviewEncounter(lead);
    return;
  }

  if (step === "offered") {
    showDialogue({
      speaker: "Offer Castle",
      text: `How did ${lead.company} resolve?`,
      actions: [
        {
          label: "Offer Won",
          onSelect: () => {
            lead.steps.offered = true;
            lead.status = "won";
            state.progress.offers += 1;
            applyXp(100);
            state.progress.coins += 90;
            saveState();
            refreshChrome();
            showCoach(`Offer logged for ${lead.company}. Huge win.`);
          },
        },
        {
          label: "Rejected",
          onSelect: () => {
            lead.steps.rejected = true;
            lead.status = "closed";
            saveState();
            refreshChrome();
            showCoach(`${lead.company} was marked closed. Keep the pipeline moving.`);
          },
        },
        { label: "Not Yet", onSelect: hideDialogue, ghost: true },
      ],
    });
    return;
  }

  if (lead.steps[step]) {
    showCoach(`${lead.company} already has this step logged.`);
    return;
  }

  lead.steps[step] = true;
  lead.updatedAt = Date.now();
  if (step === "researched") applyXp(14);
  if (step === "tailored") applyXp(24);
  if (step === "networked") applyXp(20);
  if (step === "screened") applyXp(22);
  if (step === "applied") {
    state.progress.applications += 1;
    state.progress.coins += 18;
    applyXp(35);
  }
  if (step === "followedUp") applyXp(18);
  saveState();
  refreshChrome();
  showCoach(`${lead.company} advanced to ${stageLabels[getLeadStage(lead)]}.`, [
    { label: "Open Job", href: lead.url },
    { label: "Close", onSelect: hideDialogue, ghost: true },
  ]);
}

function setDistrict(id) {
  state.meta.currentDistrict = id;
  runtimePlayer.x = 9;
  runtimePlayer.y = 13;
  runtimePlayer.renderX = 9;
  runtimePlayer.renderY = 13;
  runtimePlayer.toX = 9;
  runtimePlayer.toY = 13;
  saveState();
  refreshChrome();
}

function showLeadIntel(lead) {
  const quests = buildLeadQuests(lead);
  showDialogue({
    speaker: `${lead.company} Intel`,
    text: quests.map((quest, index) => `${index + 1}. ${quest.title}: ${quest.text}`).join(" "),
      actions: [
        { label: "Set Active", onSelect: () => setActiveLead(lead.id) },
        { label: "Open Job", href: lead.url },
        { label: "Close", onSelect: hideDialogue, ghost: true },
      ],
    });
}

function interactBuilding(building) {
  const activeLead = getActiveLead();
  if (building.action === "home") {
    showDialogue({
      speaker: building.label,
      text: `${currentDistrict().name}: ${currentDistrict().subtitle}. ${activeLead ? `Current run: ${activeLead.company} at ${stageLabels[getLeadStage(activeLead)]}.` : "No active lead yet."}`,
      actions: [
        { label: "Open Journal", onSelect: showJournal },
        { label: "Resume Vault", onSelect: () => showModal(resumeModal), ghost: true },
      ],
    });
    return;
  }

  if (building.action === "dex") {
    const pool = availableWildJobs();
    showDialogue({
      speaker: building.label,
      text: pool.length ? `Tall grass in ${currentDistrict().name} still hides ${pool.length} uncaptured leads.` : `You already caught every seeded lead in ${currentDistrict().name}.`,
      actions: [
        { label: "Open Journal", onSelect: showJournal },
        { label: "Add Custom Lead", onSelect: () => openLeadModal(), ghost: true },
      ],
    });
    return;
  }

  if (building.action === "resume") {
    if (!activeLead) return showCoach("Capture a lead first, then come back to tailor your story.");
    const story = buildLeadQuests(activeLead)[1].text;
    showDialogue({
      speaker: building.label,
      text: story,
      actions: [
        { label: "Log Tailoring", onSelect: () => progressLead("tailored") },
        { label: "Open Resume Vault", onSelect: () => showModal(resumeModal), ghost: true },
      ],
    });
    return;
  }

  if (building.action === "research") {
    if (!activeLead) return showCoach("Capture a lead first, then research it.");
    const profile = companyProfile(activeLead);
    showDialogue({
      speaker: building.label,
      text: `${activeLead.company} focus: ${profile.focus}. ${profile.prep}`,
      actions: [
        { label: "Log Research", onSelect: () => progressLead("researched") },
        { label: "Open Job", href: activeLead.url, ghost: true },
      ],
    });
    return;
  }

  if (building.action === "network") {
    progressLead("networked");
    return;
  }

  if (building.action === "screen") {
    progressLead("screened");
    return;
  }

  if (building.action === "apply") {
    if (!activeLead) return showCoach("Capture a lead first, then submit the real application here.");
    showDialogue({
      speaker: building.label,
      text: activeLead.steps.applied
        ? `Step 1: open the official ${activeLead.company} job page. Step 2: send your follow-up. Step 3: come back here and log it.`
        : `Step 1: open the official ${activeLead.company} job page. Step 2: actually apply on their site. Step 3: come back here and click Log Application.`,
      actions: [
        { label: "Open Job", href: activeLead.url },
        { label: activeLead.steps.applied ? "Log Follow-Up" : "Log Application", onSelect: () => progressLead(activeLead.steps.applied ? "followedUp" : "applied") },
      ],
    });
    return;
  }

  if (building.action === "interview") {
    progressLead("interviewing");
    return;
  }

  if (building.action === "offer") {
    progressLead("offered");
    return;
  }

  if (building.action === "transit") {
    showDialogue({
      speaker: building.label,
      text: `Choose your district. ${nextLockedDistrict() ? `Next unlock: ${nextLockedDistrict().name}.` : "Everything is unlocked."}`,
      actions: [
        ...unlockedDistricts().map((district) => ({
          label: district.id === currentDistrict().id ? `${district.name} (Here)` : district.name,
          onSelect: () => setDistrict(district.id),
        })),
        ...(nextLockedDistrict()
          ? [{ label: nextLockedDistrict().name, onSelect: () => showCoach(`${nextLockedDistrict().name} is still locked. ${nextLockedDistrict().unlockText}.`), ghost: true }]
          : []),
      ],
    });
  }
}

function nearbyBuilding() {
  const checks = [
    [runtimePlayer.x + 1, runtimePlayer.y],
    [runtimePlayer.x - 1, runtimePlayer.y],
    [runtimePlayer.x, runtimePlayer.y + 1],
    [runtimePlayer.x, runtimePlayer.y - 1],
  ];
  return currentBuildings().find((building) => checks.some(([x, y]) => x === building.x && y === building.y));
}

function interact() {
  if (!allOverlaysClosed() || currentDialogue || encounterState) return;
  const building = nearbyBuilding();
  if (building) {
    interactBuilding(building);
    return;
  }
  const nearCoach = [[runtimePlayer.x + 1, runtimePlayer.y], [runtimePlayer.x - 1, runtimePlayer.y], [runtimePlayer.x, runtimePlayer.y + 1], [runtimePlayer.x, runtimePlayer.y - 1]].some(([x, y]) => x === 8 && y === 5);
  if (nearCoach) {
    showCoach(state.resume.text ? `Your strongest resume signals are ${strongestResumeSignals(3).join(", ")}. Use them in encounters and boss fights.` : "Import your resume to make captures, quests, and boss fights feel more specific.");
  }
}

function allOverlaysClosed() {
  return introModal.classList.contains("hidden") && resumeModal.classList.contains("hidden") && leadModal.classList.contains("hidden") && journalPanel.classList.contains("hidden");
}

function update(dt) {
  if (scene !== "world") return;
  if (runtimePlayer.moving) {
    runtimePlayer.progress += dt / runtimePlayer.moveDuration;
    const t = Math.min(1, runtimePlayer.progress);
    runtimePlayer.renderX = runtimePlayer.fromX + (runtimePlayer.toX - runtimePlayer.fromX) * t;
    runtimePlayer.renderY = runtimePlayer.fromY + (runtimePlayer.toY - runtimePlayer.fromY) * t;
    if (t >= 1) finishMove();
    return;
  }
  if (!allOverlaysClosed() || currentDialogue || encounterState) return;
  if (keys.ArrowLeft || keys.a) tryMove(-1, 0);
  else if (keys.ArrowRight || keys.d) tryMove(1, 0);
  else if (keys.ArrowUp || keys.w) tryMove(0, -1);
  else if (keys.ArrowDown || keys.s) tryMove(0, 1);
}

function drawTile(x, y, tile) {
  const palette = currentDistrict().palette;
  const px = x * TILE - camera.x;
  const py = y * TILE - camera.y;
  if (px < -TILE || py < -TILE || px > canvas.width + TILE || py > canvas.height + TILE) return;
  if (tile === "T") {
    ctx.fillStyle = palette.treeA;
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = palette.treeB;
    ctx.beginPath();
    ctx.arc(px + 16, py + 14, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#402918";
    ctx.fillRect(px + 13, py + 18, 6, 12);
    return;
  }
  if (tile === "~") {
    ctx.fillStyle = palette.water;
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(px + 4, py + 10, 20, 3);
    ctx.fillRect(px + 9, py + 19, 14, 3);
    return;
  }
  if (tile === ",") {
    ctx.fillStyle = palette.pathA;
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = palette.pathB;
    ctx.fillRect(px + 4, py + 4, 24, 24);
    return;
  }
  const grassBase = (x + y) % 2 === 0 ? currentDistrict().palette.grassA : currentDistrict().palette.grassB;
  ctx.fillStyle = grassBase;
  ctx.fillRect(px, py, TILE, TILE);
  if (tile === "G") {
    ctx.fillStyle = "rgba(227,255,183,0.45)";
    for (let i = 0; i < 4; i += 1) {
      const ox = 6 + i * 5;
      ctx.fillRect(px + ox, py + 11 + (i % 2), 2, 12);
    }
  }
  if (tile === "F") {
    ctx.fillStyle = "#ffe66d";
    ctx.fillRect(px + 10, py + 8, 4, 4);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(px + 16, py + 14, 4, 4);
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
  ctx.fillStyle = "#f2f7e8";
  ctx.fillRect(px + 9, py + 10, 14, 11);
  ctx.fillStyle = "#172015";
  ctx.fillRect(px + 13, py + 18, 6, 14);
  ctx.fillStyle = "#f2f7e8";
  ctx.font = "12px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.fillText(building.glyph, px + TILE / 2, py - 15);
  ctx.textAlign = "start";
  const activeLead = getActiveLead();
  if (activeLead) {
    const map = {
      research: "researched",
      resume: "tailored",
      network: "networked",
      screen: "screened",
      apply: activeLead.steps.applied ? "followedUp" : "applied",
      interview: "interviewing",
      offer: "offered",
    };
    const step = map[building.action];
    if (step && !activeLead.steps[step]) {
      ctx.fillStyle = "#ffcd38";
      ctx.beginPath();
      ctx.arc(px + TILE + 2, py - 6, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawPlayer(time) {
  const px = runtimePlayer.renderX * TILE - camera.x;
  const py = runtimePlayer.renderY * TILE - camera.y;
  const bob = runtimePlayer.moving ? Math.sin(time / 90) * 1.5 : 0;
  ctx.fillStyle = "#0f1722";
  ctx.fillRect(px + 7, py + 23, 18, 4);
  ctx.fillStyle = "#1d3557";
  ctx.fillRect(px + 8, py + 9 + bob, 16, 17);
  ctx.fillStyle = "#f1c27d";
  ctx.fillRect(px + 10, py + 4 + bob, 12, 10);
  ctx.fillStyle = "#e63946";
  ctx.fillRect(px + 7, py + 2 + bob, 18, 5);
  ctx.fillStyle = "#172015";
  ctx.fillRect(px + 11, py + 8 + bob, 2, 2);
  ctx.fillRect(px + 19, py + 8 + bob, 2, 2);
}

function drawCoach() {
  const px = 8 * TILE - camera.x;
  const py = 5 * TILE - camera.y;
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(px + 8, py + 8, 16, 16);
  ctx.fillStyle = "#0f380f";
  ctx.fillRect(px + 10, py + 12, 3, 3);
  ctx.fillRect(px + 19, py + 12, 3, 3);
  ctx.fillRect(px + 12, py + 20, 8, 2);
}

function drawWorld(time) {
  if (scene !== "world") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  camera.x = runtimePlayer.renderX * TILE - canvas.width / 2 + TILE / 2;
  camera.y = runtimePlayer.renderY * TILE - canvas.height / 2 + TILE / 2;
  ctx.fillStyle = currentDistrict().palette.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) drawTile(x, y, tileAt(x, y));
  }
  currentBuildings().forEach(drawBuilding);
  drawCoach();
  drawPlayer(time);
  drawDistrictBanner();
  drawPrompt();
}

function drawDistrictBanner() {
  ctx.fillStyle = "rgba(8,24,32,0.74)";
  ctx.fillRect(20, 84, 240, 38);
  ctx.strokeStyle = "#e0f8cf";
  ctx.strokeRect(20, 84, 240, 38);
  ctx.fillStyle = "#e0f8cf";
  ctx.font = "10px 'Press Start 2P'";
  ctx.fillText(currentDistrict().name, 32, 106);
}

function drawPrompt() {
  const building = nearbyBuilding();
  if (!building) return;
  const label = `SPACE ${building.label}`;
  ctx.font = "10px 'Press Start 2P'";
  const width = ctx.measureText(label).width + 26;
  const px = runtimePlayer.renderX * TILE - camera.x;
  const py = runtimePlayer.renderY * TILE - camera.y;
  ctx.fillStyle = "rgba(224,248,207,0.95)";
  ctx.fillRect(px - width / 2 + 16, py - 28, width, 20);
  ctx.strokeStyle = "#172015";
  ctx.strokeRect(px - width / 2 + 16, py - 28, width, 20);
  ctx.fillStyle = "#172015";
  ctx.textAlign = "center";
  ctx.fillText(label, px + 16, py - 14);
  ctx.textAlign = "start";
}

function loop(time) {
  const dt = time - lastTime;
  lastTime = time;
  update(dt);
  drawWorld(time);
  requestAnimationFrame(loop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

document.getElementById("new-game-btn").addEventListener("click", () => {
  playerNameInput.value = state.player.name === "Trainer" ? "" : state.player.name;
  targetRoleInput.value = state.player.targetRole;
  goalInput.value = state.player.goal;
  showModal(introModal);
});

document.getElementById("continue-btn").addEventListener("click", () => {
  scene = "world";
  titleScreen.classList.remove("active");
  document.getElementById("hud").classList.add("active");
  refreshChrome();
});

document.getElementById("import-resume-title-btn").addEventListener("click", () => showModal(resumeModal));
document.getElementById("open-resume-modal-btn").addEventListener("click", () => showModal(resumeModal));
document.getElementById("open-resume-journal-btn").addEventListener("click", () => showModal(resumeModal));
document.getElementById("reset-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  runtimePlayer.x = 9;
  runtimePlayer.y = 13;
  runtimePlayer.renderX = 9;
  runtimePlayer.renderY = 13;
  runtimePlayer.toX = 9;
  runtimePlayer.toY = 13;
  endEncounter();
  hideDialogue();
  hideJournal();
  hideModal(introModal);
  hideModal(resumeModal);
  hideModal(leadModal);
  document.getElementById("hud").classList.remove("active");
  titleScreen.classList.add("active");
  scene = "title";
  refreshChrome();
});

document.getElementById("start-save-btn").addEventListener("click", () => {
  state = defaultState();
  state.player.name = (playerNameInput.value || "Trainer").trim();
  state.player.targetRole = (targetRoleInput.value || "Product Manager").trim();
  state.player.goal = (goalInput.value || "Land a role I am proud of").trim();
  runtimePlayer.x = 9;
  runtimePlayer.y = 13;
  runtimePlayer.renderX = 9;
  runtimePlayer.renderY = 13;
  runtimePlayer.toX = 9;
  runtimePlayer.toY = 13;
  applyXp(10);
  saveState();
  hideModal(introModal);
  scene = "world";
  titleScreen.classList.remove("active");
  document.getElementById("hud").classList.add("active");
  refreshChrome();
});

document.getElementById("quick-add-btn").addEventListener("click", () => openLeadModal());
document.getElementById("save-resume-btn").addEventListener("click", saveResumeIntel);
document.getElementById("close-battle-btn").addEventListener("click", endEncounter);
document.getElementById("delete-lead-btn").addEventListener("click", deleteLead);
leadForm.addEventListener("submit", updateLeadFromForm);

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => hideModal(document.getElementById(button.dataset.closeModal)));
});

document.querySelectorAll("[data-hide]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.hide).classList.add("hidden"));
});

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    if (!encounterState && !currentDialogue) interact();
  }
  if (event.key.toLowerCase() === "j" && scene === "world") {
    journalPanel.classList.toggle("hidden");
    refreshChrome();
  }
  if (event.key.toLowerCase() === "r" && scene === "world") showModal(resumeModal);
  if (event.key.toLowerCase() === "n" && scene === "world") openLeadModal();
  if (event.key === "Escape") {
    if (encounterState) return endEncounter();
    if (currentDialogue) return hideDialogue();
    if (!leadModal.classList.contains("hidden")) return hideModal(leadModal);
    if (!resumeModal.classList.contains("hidden")) return hideModal(resumeModal);
    if (!introModal.classList.contains("hidden")) return hideModal(introModal);
    if (!journalPanel.classList.contains("hidden")) return hideJournal();
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
