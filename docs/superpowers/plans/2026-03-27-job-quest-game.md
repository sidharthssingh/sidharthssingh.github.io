# Job Quest Game - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MVP browser-based top-down RPG where users upload a resume, create a character, explore a town with company buildings, talk to NPCs with real job postings, and collect coins by applying.

**Architecture:** Single-page static site using Kaplay.js (formerly Kaboom.js) for the 2D game engine. Game has 4 scenes: title/upload, character creator, world map, and building interior. Job data is fetched once on resume upload and stored in module-level state. All pixel art is generated programmatically (no external sprite assets needed for MVP - we draw simple colored rectangles/shapes). Game state persists in localStorage.

**Tech Stack:** HTML, CSS, vanilla JS, Kaplay.js (CDN), PDF.js (CDN) for resume text extraction

---

## File Structure

```
sidharthssingh.github.io/
├── game/
│   ├── index.html          # Game page entry point
│   ├── main.js             # Kaplay init, scene registration, boot
│   ├── scenes/
│   │   ├── title.js        # Resume upload + intro screen
│   │   ├── character.js    # Character creator (pick colors, name)
│   │   ├── world.js        # Top-down town map with buildings
│   │   └── building.js     # Building interior with NPCs + job postings
│   ├── state.js            # Global game state (resume data, jobs, coins, applied list)
│   ├── jobs.js             # Job fetching logic (resume → job postings)
│   ├── resume-parser.js    # PDF text extraction using PDF.js
│   └── sprites.js          # Programmatic sprite generation (colored rects/shapes)
├── index.html              # Existing terminal portfolio (unchanged)
├── friendly.html           # Existing friendly page (unchanged)
├── ...existing files...
```

**Key design decisions:**
- Each scene in its own file for isolation
- `state.js` is the single source of truth, lives outside scenes so it survives scene transitions
- Programmatic sprites (colored rectangles) instead of pixel art assets — keeps MVP fast, no asset pipeline
- PDF.js from CDN for resume parsing — no build step needed
- Job fetching uses free APIs (RapidAPI JSearch or similar) — falls back to mock data if API unavailable

---

### Task 1: Game Page Scaffold + Kaplay Init

**Files:**
- Create: `game/index.html`
- Create: `game/main.js`
- Create: `game/state.js`
- Modify: `index.html` (add link to game)
- Modify: `friendly.html` (add link to game)

- [ ] **Step 1: Create `game/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Quest | Sidharth Singh</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0d1117; display: flex; justify-content: center; align-items: center; min-height: 100vh; overflow: hidden; }
    canvas { image-rendering: pixelated; image-rendering: crisp-edges; }
  </style>
</head>
<body>
  <script src="https://unpkg.com/kaplay@3001.0.0/dist/kaplay.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
  <script type="module" src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `game/state.js`**

```js
// Global game state — persists across scene transitions
// Saved to localStorage on mutations

const DEFAULT_STATE = {
  resumeText: "",
  resumeSkills: [],
  resumeTitle: "",
  character: {
    name: "Player",
    skinColor: "#f4c794",
    shirtColor: "#58a6ff",
    pantsColor: "#30363d",
    hairColor: "#1a1a2e",
    hairStyle: 0, // 0=short, 1=medium, 2=long
  },
  jobs: [],           // Array of { company, title, salary, location, url, buildingId }
  appliedJobs: [],    // Array of job URLs already applied to
  coins: 0,
  xp: 0,
  level: 1,
};

export const state = { ...DEFAULT_STATE };

export function loadState() {
  try {
    const saved = localStorage.getItem("jobquest-state");
    if (saved) Object.assign(state, JSON.parse(saved));
  } catch (e) {
    console.warn("Failed to load state:", e);
  }
}

export function saveState() {
  try {
    localStorage.setItem("jobquest-state", JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save state:", e);
  }
}

export function resetState() {
  Object.assign(state, { ...DEFAULT_STATE });
  localStorage.removeItem("jobquest-state");
}

export function addCoins(amount) {
  state.coins += amount;
  state.xp += 10;
  if (state.xp >= state.level * 100) {
    state.level++;
  }
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
```

- [ ] **Step 3: Create `game/main.js`**

```js
import { state, loadState } from "./state.js";
import { titleScene } from "./scenes/title.js";
import { characterScene } from "./scenes/character.js";
import { worldScene } from "./scenes/world.js";
import { buildingScene } from "./scenes/building.js";

kaplay({
  width: 800,
  height: 600,
  background: [13, 17, 23],
  stretch: true,
  letterbox: true,
  pixelDensity: 1,
  crisp: true,
});

loadState();

scene("title", titleScene);
scene("character", characterScene);
scene("world", worldScene);
scene("building", buildingScene);

go("title");
```

- [ ] **Step 4: Create placeholder scene files**

Create minimal exports for each scene so `main.js` doesn't error:

`game/scenes/title.js`:
```js
export function titleScene() {
  add([text("JOB QUEST - Loading...", { size: 24 }), pos(center()), anchor("center")]);
}
```

`game/scenes/character.js`:
```js
export function characterScene() {
  add([text("Character Creator - WIP", { size: 24 }), pos(center()), anchor("center")]);
}
```

`game/scenes/world.js`:
```js
export function worldScene() {
  add([text("World Map - WIP", { size: 24 }), pos(center()), anchor("center")]);
}
```

`game/scenes/building.js`:
```js
export function buildingScene() {
  add([text("Building - WIP", { size: 24 }), pos(center()), anchor("center")]);
}
```

- [ ] **Step 5: Add game link to portfolio pages**

In `index.html`, add a `game` command hint. In `friendly.html` nav, add a "Play Job Quest" link.

- [ ] **Step 6: Test in browser**

Run: `open game/index.html` (or use a local server)
Expected: Black screen with "JOB QUEST - Loading..." text centered.

- [ ] **Step 7: Commit**

```bash
git add game/ index.html friendly.html
git commit -m "feat: scaffold Job Quest game with Kaplay.js and scene structure"
```

---

### Task 2: Resume Upload + Parsing (Title Scene)

**Files:**
- Create: `game/resume-parser.js`
- Modify: `game/scenes/title.js`

- [ ] **Step 1: Create `game/resume-parser.js`**

Uses PDF.js to extract text from an uploaded PDF, then extracts skills and job title.

```js
const SKILL_KEYWORDS = [
  "python", "javascript", "sql", "java", "react", "node", "aws", "gcp", "azure",
  "product management", "product strategy", "roadmapping", "agile", "scrum",
  "data analytics", "machine learning", "ai", "ml", "llm", "figma", "tableau",
  "a/b testing", "jira", "rest api", "graphql", "docker", "kubernetes",
  "typescript", "go", "rust", "swift", "kotlin", "flutter", "tensorflow",
  "pytorch", "pandas", "numpy", "spark", "kafka", "redis", "mongodb",
  "postgresql", "mysql", "elasticsearch", "ci/cd", "devops", "terraform",
];

const TITLE_PATTERNS = [
  /senior product manager/i,
  /product manager/i,
  /technical product manager/i,
  /software engineer/i,
  /senior software engineer/i,
  /data scientist/i,
  /engineering manager/i,
  /designer/i,
  /analyst/i,
];

export async function parseResumePDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = window["pdfjs-dist/build/pdf"] || window.pdfjsLib;

  // Set worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item) => item.str).join(" ") + "\n";
  }

  const lower = fullText.toLowerCase();

  // Extract skills
  const skills = SKILL_KEYWORDS.filter((skill) => lower.includes(skill));

  // Extract most recent title
  let title = "Product Manager"; // default
  for (const pattern of TITLE_PATTERNS) {
    const match = fullText.match(pattern);
    if (match) {
      title = match[0];
      break;
    }
  }

  return { fullText, skills, title };
}
```

- [ ] **Step 2: Build the title scene with upload UI**

Rewrite `game/scenes/title.js`:

```js
import { state, saveState, resetState } from "../state.js";
import { parseResumePDF } from "../resume-parser.js";

export function titleScene() {
  // Background
  add([rect(width(), height()), pos(0, 0), color(13, 17, 23)]);

  // Title
  add([
    text("JOB QUEST", { size: 48 }),
    pos(width() / 2, 120),
    anchor("center"),
    color(57, 208, 216),
  ]);

  // Subtitle
  add([
    text("Gamify your job search", { size: 18 }),
    pos(width() / 2, 170),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // Upload prompt
  const uploadText = add([
    text("Drop your resume PDF here\nor click to upload", { size: 16, align: "center" }),
    pos(width() / 2, 300),
    anchor("center"),
    color(230, 237, 243),
  ]);

  // Dashed upload box
  add([
    rect(300, 120, { radius: 8 }),
    pos(width() / 2, 300),
    anchor("center"),
    outline(2, Color.fromHex("#30363d")),
    color(22, 27, 34),
  ]);

  // "Or skip" option
  add([
    text("Press ENTER to skip (use demo data)", { size: 12 }),
    pos(width() / 2, 420),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // New game option
  add([
    text("Press N for new game / R to resume", { size: 12 }),
    pos(width() / 2, 450),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // Hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".pdf";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Click canvas to trigger upload
  onClick(() => fileInput.click());

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadText.text = "Parsing resume...";

    try {
      const { fullText, skills, title } = await parseResumePDF(file);
      state.resumeText = fullText;
      state.resumeSkills = skills;
      state.resumeTitle = title;
      state.character.name = extractName(fullText);
      saveState();
      go("character");
    } catch (err) {
      console.error("Resume parse error:", err);
      uploadText.text = "Error parsing PDF. Try again\nor press ENTER to skip.";
    }
  });

  // Skip with demo data
  onKeyPress("enter", () => {
    state.resumeText = "Demo user";
    state.resumeSkills = ["python", "sql", "product management", "agile", "ai"];
    state.resumeTitle = "Product Manager";
    saveState();
    go("character");
  });

  // Resume saved game
  onKeyPress("r", () => {
    if (state.jobs.length > 0) {
      go("world");
    }
  });

  // New game
  onKeyPress("n", () => {
    resetState();
  });
}

function extractName(text) {
  // First line of resume is usually the name
  const firstLine = text.trim().split("\n")[0].trim();
  // Take first 30 chars max, only if it looks like a name (no numbers, short)
  if (firstLine.length < 40 && !/\d/.test(firstLine)) {
    return firstLine;
  }
  return "Player";
}
```

- [ ] **Step 3: Test resume upload**

Open `game/index.html` in browser. Upload a PDF resume.
Expected: Text changes to "Parsing resume...", then transitions to character scene.
Test ENTER skip: should go to character scene with demo data.

- [ ] **Step 4: Commit**

```bash
git add game/resume-parser.js game/scenes/title.js
git commit -m "feat: add title scene with resume upload and PDF parsing"
```

---

### Task 3: Character Creator Scene

**Files:**
- Create: `game/sprites.js`
- Modify: `game/scenes/character.js`

- [ ] **Step 1: Create `game/sprites.js`**

Draws simple pixel characters as colored rectangles (head, body, legs, hair).

```js
// Draws a character on a canvas and returns it as a data URL
// Character is 16x24 pixels, drawn at 4x scale on a 64x96 canvas

export function generateCharacterSprite(opts) {
  const { skinColor, shirtColor, pantsColor, hairColor, hairStyle } = opts;

  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 24;
  const ctx = canvas.getContext("2d");

  // Hair (top of head)
  ctx.fillStyle = hairColor;
  if (hairStyle === 0) {
    // Short hair
    ctx.fillRect(4, 0, 8, 3);
  } else if (hairStyle === 1) {
    // Medium hair
    ctx.fillRect(3, 0, 10, 4);
  } else {
    // Long hair
    ctx.fillRect(3, 0, 10, 6);
  }

  // Head (skin)
  ctx.fillStyle = skinColor;
  ctx.fillRect(4, 3, 8, 6);

  // Eyes
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(6, 5, 2, 2);
  ctx.fillRect(10, 5, 2, 2);

  // Shirt
  ctx.fillStyle = shirtColor;
  ctx.fillRect(3, 9, 10, 8);

  // Arms
  ctx.fillRect(1, 10, 2, 6);
  ctx.fillRect(13, 10, 2, 6);

  // Pants
  ctx.fillStyle = pantsColor;
  ctx.fillRect(4, 17, 4, 5);
  ctx.fillRect(9, 17, 4, 5);

  // Shoes
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(3, 22, 5, 2);
  ctx.fillRect(9, 22, 5, 2);

  return canvas;
}

export function loadCharacterSprite(k, name, opts) {
  const canvas = generateCharacterSprite(opts);
  k.loadSprite(name, canvas.toDataURL());
}
```

- [ ] **Step 2: Build character creator scene**

Rewrite `game/scenes/character.js`:

```js
import { state, saveState } from "../state.js";
import { generateCharacterSprite } from "../sprites.js";

const SKIN_COLORS = ["#f4c794", "#e0ac69", "#c68642", "#8d5524", "#4a2912"];
const SHIRT_COLORS = ["#58a6ff", "#f85149", "#3fb950", "#d29922", "#bc8cff", "#ff7b72", "#39d0d8"];
const PANTS_COLORS = ["#30363d", "#1a1a2e", "#2d333b", "#3b2f2f", "#1f3a5f"];
const HAIR_COLORS = ["#1a1a2e", "#4a2912", "#8d5524", "#c68642", "#f4c794", "#f85149", "#58a6ff"];
const HAIR_STYLES = ["Short", "Medium", "Long"];

export function characterScene() {
  let skinIdx = SKIN_COLORS.indexOf(state.character.skinColor);
  if (skinIdx === -1) skinIdx = 0;
  let shirtIdx = SHIRT_COLORS.indexOf(state.character.shirtColor);
  if (shirtIdx === -1) shirtIdx = 0;
  let pantsIdx = PANTS_COLORS.indexOf(state.character.pantsColor);
  if (pantsIdx === -1) pantsIdx = 0;
  let hairIdx = HAIR_COLORS.indexOf(state.character.hairColor);
  if (hairIdx === -1) hairIdx = 0;
  let hairStyleIdx = state.character.hairStyle || 0;

  const options = [
    { label: "Skin", colors: SKIN_COLORS, getIdx: () => skinIdx, setIdx: (i) => { skinIdx = i; } },
    { label: "Shirt", colors: SHIRT_COLORS, getIdx: () => shirtIdx, setIdx: (i) => { shirtIdx = i; } },
    { label: "Pants", colors: PANTS_COLORS, getIdx: () => pantsIdx, setIdx: (i) => { pantsIdx = i; } },
    { label: "Hair Color", colors: HAIR_COLORS, getIdx: () => hairIdx, setIdx: (i) => { hairIdx = i; } },
    { label: "Hair Style", colors: HAIR_STYLES, getIdx: () => hairStyleIdx, setIdx: (i) => { hairStyleIdx = i; } },
  ];

  let selectedOption = 0;

  // Title
  add([
    text("CREATE YOUR CHARACTER", { size: 28 }),
    pos(width() / 2, 40),
    anchor("center"),
    color(57, 208, 216),
  ]);

  // Name display
  add([
    text(() => state.character.name, { size: 18 }),
    pos(width() / 2, 80),
    anchor("center"),
    color(230, 237, 243),
  ]);

  // Character preview (large, centered)
  const previewSize = 160;
  const previewObj = add([
    rect(previewSize, previewSize * 1.5, { radius: 8 }),
    pos(width() / 2, 200),
    anchor("center"),
    color(22, 27, 34),
    outline(2, Color.fromHex("#30363d")),
  ]);

  // We'll draw the character sprite as an image on top
  let charPreview = null;

  function updatePreview() {
    if (charPreview) destroy(charPreview);

    const charOpts = {
      skinColor: SKIN_COLORS[skinIdx],
      shirtColor: SHIRT_COLORS[shirtIdx],
      pantsColor: PANTS_COLORS[pantsIdx],
      hairColor: HAIR_COLORS[hairIdx],
      hairStyle: hairStyleIdx,
    };

    const canvas = generateCharacterSprite(charOpts);
    const spriteName = "preview-" + Date.now();
    loadSprite(spriteName, canvas.toDataURL());

    // Wait a frame for sprite to load, then display
    wait(0.05, () => {
      charPreview = add([
        sprite(spriteName),
        pos(width() / 2, 200),
        anchor("center"),
        scale(8),
      ]);
    });
  }

  updatePreview();

  // Option labels and arrows
  const optionY = 340;
  const optionSpacing = 36;

  const optionLabels = [];
  const optionValues = [];

  options.forEach((opt, i) => {
    const y = optionY + i * optionSpacing;

    optionLabels.push(
      add([
        text(opt.label, { size: 14 }),
        pos(200, y),
        anchor("left"),
        color(125, 133, 144),
      ])
    );

    optionValues.push(
      add([
        text(() => {
          if (opt.label === "Hair Style") return HAIR_STYLES[opt.getIdx()];
          return "■"; // colored square shown via color
        }, { size: 14 }),
        pos(500, y),
        anchor("left"),
        color(() => {
          if (opt.label === "Hair Style") return Color.fromHex("#e6edf3");
          return Color.fromHex(opt.colors[opt.getIdx()]);
        }),
      ])
    );
  });

  // Selection indicator
  const selector = add([
    text(">", { size: 16 }),
    pos(180, optionY),
    color(57, 208, 216),
  ]);

  // Instructions
  add([
    text("Arrow keys: navigate / change | ENTER: start game", { size: 12 }),
    pos(width() / 2, 540),
    anchor("center"),
    color(125, 133, 144),
  ]);

  onKeyPress("up", () => {
    selectedOption = Math.max(0, selectedOption - 1);
    selector.pos.y = optionY + selectedOption * optionSpacing;
  });

  onKeyPress("down", () => {
    selectedOption = Math.min(options.length - 1, selectedOption + 1);
    selector.pos.y = optionY + selectedOption * optionSpacing;
  });

  onKeyPress("right", () => {
    const opt = options[selectedOption];
    const newIdx = (opt.getIdx() + 1) % opt.colors.length;
    opt.setIdx(newIdx);
    updatePreview();
  });

  onKeyPress("left", () => {
    const opt = options[selectedOption];
    const newIdx = (opt.getIdx() - 1 + opt.colors.length) % opt.colors.length;
    opt.setIdx(newIdx);
    updatePreview();
  });

  onKeyPress("enter", () => {
    state.character.skinColor = SKIN_COLORS[skinIdx];
    state.character.shirtColor = SHIRT_COLORS[shirtIdx];
    state.character.pantsColor = PANTS_COLORS[pantsIdx];
    state.character.hairColor = HAIR_COLORS[hairIdx];
    state.character.hairStyle = hairStyleIdx;
    saveState();
    go("world");
  });
}
```

- [ ] **Step 3: Test character creator**

Open game, press ENTER to skip resume, arrive at character screen.
Expected: See character preview, navigate options with arrow keys, colors change live, ENTER goes to world.

- [ ] **Step 4: Commit**

```bash
git add game/sprites.js game/scenes/character.js
git commit -m "feat: add character creator with color customization and sprite preview"
```

---

### Task 4: World Map Scene

**Files:**
- Modify: `game/scenes/world.js`
- Modify: `game/sprites.js` (add building sprite)

- [ ] **Step 1: Add building sprite generation to `game/sprites.js`**

Append to `sprites.js`:

```js
export function generateBuildingSprite(color, hasCoins) {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  // Building body
  ctx.fillStyle = color;
  ctx.fillRect(2, 8, 28, 24);

  // Roof
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(16, 0);
  ctx.lineTo(32, 10);
  ctx.fill();

  // Door
  ctx.fillStyle = "#4a2912";
  ctx.fillRect(12, 20, 8, 12);

  // Window
  ctx.fillStyle = "#58a6ff";
  ctx.fillRect(6, 13, 6, 5);
  ctx.fillRect(20, 13, 6, 5);

  // Coins indicator
  if (hasCoins) {
    ctx.fillStyle = "#d29922";
    ctx.beginPath();
    ctx.arc(8, 4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(16, 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(24, 4, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}
```

- [ ] **Step 2: Build the world map scene**

Rewrite `game/scenes/world.js`:

```js
import { state, saveState, isApplied } from "../state.js";
import { loadCharacterSprite, generateBuildingSprite } from "../sprites.js";

// Building definitions — positions in the town
const BUILDINGS = [
  { id: 0, name: "Tech Tower",     x: 200, y: 150, color: "#58a6ff" },
  { id: 1, name: "Startup Garage",  x: 500, y: 150, color: "#3fb950" },
  { id: 2, name: "Gaming Den",      x: 200, y: 350, color: "#bc8cff" },
  { id: 3, name: "Finance HQ",      x: 500, y: 350, color: "#d29922" },
  { id: 4, name: "AI Labs",         x: 350, y: 250, color: "#39d0d8" },
];

export function worldScene() {
  // Ground
  add([rect(width(), height()), pos(0, 0), color(26, 46, 26)]);

  // Draw paths (lighter ground between buildings)
  add([rect(width(), 40), pos(0, 240), color(60, 60, 40)]);
  add([rect(40, height()), pos(340, 0), color(60, 60, 40)]);

  // Load player sprite
  loadCharacterSprite(
    { loadSprite },
    "player",
    state.character
  );

  // HUD - coins display
  add([
    text(() => `Coins: ${state.coins}`, { size: 16 }),
    pos(16, 16),
    fixed(),
    z(100),
    color(210, 153, 34),
  ]);

  // HUD - level
  add([
    text(() => `Lv.${state.level} ${state.character.name}`, { size: 14 }),
    pos(16, 38),
    fixed(),
    z(100),
    color(125, 133, 144),
  ]);

  // HUD - instructions
  add([
    text("Arrow keys: move | SPACE: enter building", { size: 11 }),
    pos(width() / 2, height() - 16),
    anchor("center"),
    fixed(),
    z(100),
    color(125, 133, 144),
  ]);

  // Place buildings
  BUILDINGS.forEach((b) => {
    // Check if this building has unapplied jobs
    const buildingJobs = state.jobs.filter((j) => j.buildingId === b.id);
    const hasCoins = buildingJobs.some((j) => !isApplied(j.url));

    const bCanvas = generateBuildingSprite(b.color, hasCoins);
    const spriteName = `building-${b.id}`;
    loadSprite(spriteName, bCanvas.toDataURL());

    wait(0.05, () => {
      const building = add([
        sprite(spriteName),
        pos(b.x, b.y),
        anchor("center"),
        scale(3),
        area({ shape: new Rect(vec2(0, 0), 96, 96) }),
        body({ isStatic: true }),
        `building-${b.id}`,
        "building",
      ]);

      // Building label
      add([
        text(b.name, { size: 11 }),
        pos(b.x, b.y + 56),
        anchor("center"),
        color(230, 237, 243),
      ]);
    });
  });

  // Spawn player
  wait(0.1, () => {
    const player = add([
      sprite("player"),
      pos(350, 450),
      anchor("center"),
      scale(3),
      area({ shape: new Rect(vec2(0, 0), 48, 72) }),
      body(),
      "player",
    ]);

    const SPEED = 200;

    onKeyDown("left", () => player.move(-SPEED, 0));
    onKeyDown("right", () => player.move(SPEED, 0));
    onKeyDown("up", () => player.move(0, -SPEED));
    onKeyDown("down", () => player.move(0, SPEED));

    // Track which building player is near
    let nearBuilding = null;
    let promptText = null;

    BUILDINGS.forEach((b) => {
      player.onCollide(`building-${b.id}`, () => {
        nearBuilding = b.id;
        if (promptText) destroy(promptText);
        promptText = add([
          text(`[SPACE] Enter ${b.name}`, { size: 13 }),
          pos(width() / 2, height() - 40),
          anchor("center"),
          fixed(),
          z(100),
          color(57, 208, 216),
        ]);
      });

      player.onCollideEnd(`building-${b.id}`, () => {
        if (nearBuilding === b.id) {
          nearBuilding = null;
          if (promptText) {
            destroy(promptText);
            promptText = null;
          }
        }
      });
    });

    onKeyPress("space", () => {
      if (nearBuilding !== null) {
        go("building", { buildingId: nearBuilding });
      }
    });

    // Keep player in bounds
    player.onUpdate(() => {
      player.pos.x = clamp(player.pos.x, 24, width() - 24);
      player.pos.y = clamp(player.pos.y, 24, height() - 24);
    });
  });
}
```

- [ ] **Step 3: Test world map**

Skip resume → create character → enter world.
Expected: Green map, 5 buildings with labels, character moves with arrow keys, collision with buildings shows prompt, SPACE enters building scene.

- [ ] **Step 4: Commit**

```bash
git add game/scenes/world.js game/sprites.js
git commit -m "feat: add world map with buildings, player movement, and collision"
```

---

### Task 5: Job Fetching

**Files:**
- Create: `game/jobs.js`
- Modify: `game/scenes/title.js` (trigger job fetch after resume parse)

- [ ] **Step 1: Create `game/jobs.js`**

Fetches jobs from a free API based on resume skills, assigns them to buildings. Falls back to curated mock data.

```js
import { state, saveState } from "./state.js";

const BUILDING_THEMES = [
  { id: 0, name: "Tech Tower", queries: ["software engineer", "technical product manager"] },
  { id: 1, name: "Startup Garage", queries: ["startup product manager", "founding engineer"] },
  { id: 2, name: "Gaming Den", queries: ["gaming product manager", "game developer"] },
  { id: 3, name: "Finance HQ", queries: ["fintech product manager", "financial analyst tech"] },
  { id: 4, name: "AI Labs", queries: ["ai product manager", "machine learning engineer"] },
];

const MOCK_JOBS = [
  // Tech Tower
  { company: "Google", title: "Senior Product Manager", salary: 250, location: "Mountain View, CA", url: "https://careers.google.com", buildingId: 0 },
  { company: "Microsoft", title: "Technical PM - Azure", salary: 220, location: "Seattle, WA", url: "https://careers.microsoft.com", buildingId: 0 },
  { company: "Apple", title: "Product Manager - ML Platform", salary: 240, location: "Cupertino, CA", url: "https://jobs.apple.com", buildingId: 0 },
  // Startup Garage
  { company: "Vercel", title: "Product Manager", salary: 180, location: "Remote", url: "https://vercel.com/careers", buildingId: 1 },
  { company: "Supabase", title: "Technical PM", salary: 170, location: "Remote", url: "https://supabase.com/careers", buildingId: 1 },
  { company: "Linear", title: "Product Manager", salary: 190, location: "Remote", url: "https://linear.app/careers", buildingId: 1 },
  // Gaming Den
  { company: "Riot Games", title: "Senior PM - Live Services", salary: 200, location: "Los Angeles, CA", url: "https://www.riotgames.com/careers", buildingId: 2 },
  { company: "Epic Games", title: "Technical PM", salary: 190, location: "Cary, NC", url: "https://www.epicgames.com/careers", buildingId: 2 },
  { company: "Zynga", title: "Product Manager - Mobile", salary: 180, location: "Austin, TX", url: "https://www.zynga.com/careers", buildingId: 2 },
  // Finance HQ
  { company: "Stripe", title: "Product Manager - Payments", salary: 260, location: "San Francisco, CA", url: "https://stripe.com/jobs", buildingId: 3 },
  { company: "Robinhood", title: "Senior PM - Trading", salary: 230, location: "Menlo Park, CA", url: "https://robinhood.com/careers", buildingId: 3 },
  { company: "Plaid", title: "Technical PM", salary: 210, location: "San Francisco, CA", url: "https://plaid.com/careers", buildingId: 3 },
  // AI Labs
  { company: "Anthropic", title: "Product Manager - Claude", salary: 280, location: "San Francisco, CA", url: "https://www.anthropic.com/careers", buildingId: 4 },
  { company: "OpenAI", title: "Technical PM - API Platform", salary: 290, location: "San Francisco, CA", url: "https://openai.com/careers", buildingId: 4 },
  { company: "Databricks", title: "PM - ML Platform", salary: 240, location: "San Francisco, CA", url: "https://www.databricks.com/careers", buildingId: 4 },
];

export async function fetchJobs() {
  // For MVP, use mock data tailored to resume
  // In future, this is where API calls go (JSearch, LinkedIn, etc.)

  // Customize mock jobs slightly based on resume title
  const title = state.resumeTitle.toLowerCase();
  let jobs = [...MOCK_JOBS];

  // Adjust salary display as "coins" (salary in K / 10)
  jobs = jobs.map((j) => ({
    ...j,
    coins: Math.round(j.salary / 10),
  }));

  state.jobs = jobs;
  saveState();
  return jobs;
}
```

- [ ] **Step 2: Wire job fetch into title scene**

In `game/scenes/title.js`, after resume parsing succeeds and before `go("character")`, add:

```js
import { fetchJobs } from "../jobs.js";

// Inside the fileInput change handler, after saveState():
uploadText.text = "Finding jobs for you...";
await fetchJobs();
go("character");

// Inside the ENTER skip handler:
onKeyPress("enter", async () => {
  state.resumeText = "Demo user";
  state.resumeSkills = ["python", "sql", "product management", "agile", "ai"];
  state.resumeTitle = "Product Manager";
  saveState();
  await fetchJobs();
  go("character");
});
```

- [ ] **Step 3: Test job fetch**

Skip resume → check browser console for `state.jobs` having 15 entries.
Expected: Each job has company, title, salary, coins, buildingId.

- [ ] **Step 4: Commit**

```bash
git add game/jobs.js game/scenes/title.js
git commit -m "feat: add job fetching with mock data assigned to buildings"
```

---

### Task 6: Building Interior Scene (NPCs + Apply)

**Files:**
- Modify: `game/scenes/building.js`

- [ ] **Step 1: Build the building interior scene**

Rewrite `game/scenes/building.js`:

```js
import { state, saveState, addCoins, markApplied, isApplied } from "../state.js";
import { loadCharacterSprite } from "../sprites.js";

export function buildingScene({ buildingId }) {
  const BUILDING_NAMES = ["Tech Tower", "Startup Garage", "Gaming Den", "Finance HQ", "AI Labs"];
  const BUILDING_COLORS = ["#58a6ff", "#3fb950", "#bc8cff", "#d29922", "#39d0d8"];

  const buildingName = BUILDING_NAMES[buildingId] || "Building";
  const buildingColor = BUILDING_COLORS[buildingId] || "#58a6ff";

  // Get jobs for this building
  const jobs = state.jobs.filter((j) => j.buildingId === buildingId);

  // Floor
  add([rect(width(), height()), pos(0, 0), color(22, 27, 34)]);

  // Floor tiles pattern
  for (let x = 0; x < width(); x += 40) {
    for (let y = 60; y < height(); y += 40) {
      add([
        rect(38, 38),
        pos(x + 1, y + 1),
        color(26, 33, 44),
      ]);
    }
  }

  // Header bar
  const c = Color.fromHex(buildingColor);
  add([rect(width(), 50), pos(0, 0), color(c)]);
  add([
    text(buildingName, { size: 22 }),
    pos(width() / 2, 25),
    anchor("center"),
    color(13, 17, 23),
  ]);

  // Back button hint
  add([
    text("ESC: Leave building", { size: 12 }),
    pos(16, 575),
    fixed(),
    z(100),
    color(125, 133, 144),
  ]);

  // HUD
  add([
    text(() => `Coins: ${state.coins}`, { size: 14 }),
    pos(width() - 16, 575),
    anchor("right"),
    fixed(),
    z(100),
    color(210, 153, 34),
  ]);

  // Place NPC desks for each job
  const npcPositions = [
    { x: 150, y: 200 },
    { x: 400, y: 200 },
    { x: 650, y: 200 },
  ];

  // Load player
  loadCharacterSprite({ loadSprite }, "player-inside", state.character);

  // Active dialogue state
  let dialogueBox = null;
  let activeJobIdx = null;

  function clearDialogue() {
    if (dialogueBox) {
      dialogueBox.forEach((obj) => destroy(obj));
      dialogueBox = null;
      activeJobIdx = null;
    }
  }

  function showJobDialogue(job, idx) {
    clearDialogue();
    activeJobIdx = idx;
    const applied = isApplied(job.url);

    const parts = [];

    // Backdrop
    parts.push(add([
      rect(500, 220, { radius: 8 }),
      pos(width() / 2, 420),
      anchor("center"),
      color(30, 36, 47),
      outline(2, Color.fromHex(buildingColor)),
      fixed(),
      z(200),
    ]));

    // Company + Title
    parts.push(add([
      text(`${job.company}`, { size: 18 }),
      pos(width() / 2, 340),
      anchor("center"),
      color(Color.fromHex(buildingColor)),
      fixed(),
      z(201),
    ]));

    parts.push(add([
      text(job.title, { size: 14 }),
      pos(width() / 2, 365),
      anchor("center"),
      color(230, 237, 243),
      fixed(),
      z(201),
    ]));

    // Location + Salary
    parts.push(add([
      text(`${job.location}  |  ${job.coins} coins`, { size: 12 }),
      pos(width() / 2, 390),
      anchor("center"),
      color(125, 133, 144),
      fixed(),
      z(201),
    ]));

    if (applied) {
      parts.push(add([
        text("Already applied!", { size: 14 }),
        pos(width() / 2, 430),
        anchor("center"),
        color(125, 133, 144),
        fixed(),
        z(201),
      ]));
    } else {
      parts.push(add([
        text("[ENTER] Apply & collect coins!", { size: 14 }),
        pos(width() / 2, 430),
        anchor("center"),
        color(63, 185, 80),
        fixed(),
        z(201),
      ]));
    }

    parts.push(add([
      text("[ESC] Close", { size: 11 }),
      pos(width() / 2, 460),
      anchor("center"),
      color(125, 133, 144),
      fixed(),
      z(201),
    ]));

    dialogueBox = parts;
  }

  // Place NPCs
  jobs.forEach((job, idx) => {
    if (idx >= 3) return; // max 3 per building
    const p = npcPositions[idx];
    const applied = isApplied(job.url);

    // Desk
    add([
      rect(60, 30, { radius: 4 }),
      pos(p.x, p.y + 30),
      anchor("center"),
      color(74, 41, 18),
    ]);

    // NPC (simple colored rect person)
    const npcColor = applied ? "#30363d" : buildingColor;
    const npc = add([
      rect(24, 36, { radius: 4 }),
      pos(p.x, p.y),
      anchor("center"),
      color(Color.fromHex(npcColor)),
      area(),
      body({ isStatic: true }),
      `npc-${idx}`,
      "npc",
    ]);

    // NPC head
    add([
      circle(10),
      pos(p.x, p.y - 24),
      anchor("center"),
      color(Color.fromHex("#f4c794")),
    ]);

    // Company label
    add([
      text(job.company, { size: 10 }),
      pos(p.x, p.y - 42),
      anchor("center"),
      color(230, 237, 243),
    ]);

    // Coin indicator if not applied
    if (!applied) {
      add([
        text(`${job.coins}`, { size: 10 }),
        pos(p.x, p.y - 55),
        anchor("center"),
        color(210, 153, 34),
      ]);
    }
  });

  // Player
  wait(0.1, () => {
    const player = add([
      sprite("player-inside"),
      pos(width() / 2, 480),
      anchor("center"),
      scale(3),
      area({ shape: new Rect(vec2(0, 0), 48, 72) }),
      body(),
      "player",
    ]);

    const SPEED = 180;

    onKeyDown("left", () => { if (!dialogueBox) player.move(-SPEED, 0); });
    onKeyDown("right", () => { if (!dialogueBox) player.move(SPEED, 0); });
    onKeyDown("up", () => { if (!dialogueBox) player.move(0, -SPEED); });
    onKeyDown("down", () => { if (!dialogueBox) player.move(0, SPEED); });

    // Keep in bounds
    player.onUpdate(() => {
      player.pos.x = clamp(player.pos.x, 24, width() - 24);
      player.pos.y = clamp(player.pos.y, 70, height() - 24);
    });

    // NPC interaction
    let nearNpc = null;
    let npcPrompt = null;

    jobs.forEach((job, idx) => {
      if (idx >= 3) return;

      player.onCollide(`npc-${idx}`, () => {
        nearNpc = idx;
        if (npcPrompt) destroy(npcPrompt);
        npcPrompt = add([
          text("[SPACE] Talk", { size: 12 }),
          pos(npcPositions[idx].x, npcPositions[idx].y + 60),
          anchor("center"),
          color(57, 208, 216),
          z(50),
        ]);
      });

      player.onCollideEnd(`npc-${idx}`, () => {
        if (nearNpc === idx) {
          nearNpc = null;
          if (npcPrompt) {
            destroy(npcPrompt);
            npcPrompt = null;
          }
        }
      });
    });

    onKeyPress("space", () => {
      if (dialogueBox) {
        clearDialogue();
        return;
      }
      if (nearNpc !== null && jobs[nearNpc]) {
        showJobDialogue(jobs[nearNpc], nearNpc);
      }
    });

    onKeyPress("enter", () => {
      if (activeJobIdx !== null) {
        const job = jobs[activeJobIdx];
        if (!isApplied(job.url)) {
          markApplied(job.url);
          addCoins(job.coins);

          // Show reward flash
          clearDialogue();
          const reward = add([
            text(`+${job.coins} coins!`, { size: 28 }),
            pos(width() / 2, height() / 2),
            anchor("center"),
            color(210, 153, 34),
            fixed(),
            z(300),
          ]);

          wait(1.5, () => {
            destroy(reward);
            // Reload scene to update NPC colors
            go("building", { buildingId });
          });
        }
      }
    });
  });

  onKeyPress("escape", () => {
    if (dialogueBox) {
      clearDialogue();
    } else {
      go("world");
    }
  });
}
```

- [ ] **Step 2: Test full flow**

1. Open game → skip resume (ENTER)
2. Create character → press ENTER
3. Walk to a building → press SPACE to enter
4. Walk to NPC → press SPACE to talk
5. Press ENTER to apply → see coin reward
6. ESC to leave building → building should show no coins if all jobs applied

Expected: Full loop works, coins accumulate, applied state persists.

- [ ] **Step 3: Commit**

```bash
git add game/scenes/building.js
git commit -m "feat: add building interior with NPC dialogue and job application flow"
```

---

### Task 7: Polish + Game Link on Portfolio

**Files:**
- Modify: `game/scenes/world.js` (add boundary walls)
- Modify: `script.js` (add `game` command to terminal)
- Modify: `friendly.html` (add game link)
- Modify: `index.html` (minor)

- [ ] **Step 1: Add `game` command to terminal portfolio**

In `script.js`, add to the COMMANDS object:

```js
game: cmdGame,
```

And add the function:

```js
function cmdGame() {
  print('Launching <span class="green">Job Quest</span>...');
  print('<span class="dim">A gamified job search RPG. Because why not.</span>');
  window.open('game/', '_blank');
}
```

- [ ] **Step 2: Add game link to `friendly.html` nav**

Add a link in the nav alongside "Terminal Mode":

```html
<a href="game/" class="terminal-btn" style="border-color:#3fb950;color:#3fb950;">Play Job Quest</a>
```

- [ ] **Step 3: Test everything end to end**

Full test:
1. Terminal portfolio: type `game` → opens game in new tab
2. Friendly page: click "Play Job Quest" → opens game
3. Game full flow: upload/skip → character → world → building → apply → coins

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: Job Quest MVP - gamified job search RPG"
git push origin main
```

---

## Summary

| Task | What it builds | Files |
|------|---------------|-------|
| 1 | Game scaffold + Kaplay init | `game/index.html`, `game/main.js`, `game/state.js`, scene stubs |
| 2 | Resume upload + PDF parsing | `game/resume-parser.js`, `game/scenes/title.js` |
| 3 | Character creator | `game/sprites.js`, `game/scenes/character.js` |
| 4 | World map with buildings | `game/scenes/world.js`, `game/sprites.js` |
| 5 | Job fetching (mock data) | `game/jobs.js`, `game/scenes/title.js` |
| 6 | Building interior + apply flow | `game/scenes/building.js` |
| 7 | Polish + portfolio integration | `script.js`, `friendly.html`, final push |
