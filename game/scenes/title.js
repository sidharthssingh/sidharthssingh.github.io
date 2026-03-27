import { state, saveState, resetState } from "../state.js";
import { parseResumePDF } from "../resume-parser.js";

export function titleScene() {
  // Dark background
  add([
    rect(800, 600),
    pos(0, 0),
    color(13, 17, 23),
  ]);

  // Title: JOB QUEST
  add([
    text("JOB QUEST", { size: 48 }),
    pos(400, 120),
    anchor("center"),
    color(57, 208, 216), // #39d0d8 cyan
  ]);

  // Subtitle
  add([
    text("Gamify your job search", { size: 18 }),
    pos(400, 170),
    anchor("center"),
    color(125, 133, 144), // #7d8590 dim
  ]);

  // Upload area background
  add([
    rect(300, 120, { radius: 8 }),
    pos(400, 300),
    anchor("center"),
    color(22, 27, 34), // slightly lighter dark
    outline(2, rgb(48, 54, 61)),
  ]);

  // Upload area text line 1
  add([
    text("Drop your resume PDF here", { size: 14 }),
    pos(400, 285),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // Upload area text line 2
  add([
    text("or click to upload", { size: 14 }),
    pos(400, 310),
    anchor("center"),
    color(57, 208, 216),
  ]);

  // Hint: ENTER to skip
  add([
    text("Press ENTER to skip (use demo data)", { size: 14 }),
    pos(400, 420),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // Hint: N / R
  add([
    text("Press N for new game / R to resume", { size: 14 }),
    pos(400, 450),
    anchor("center"),
    color(125, 133, 144),
  ]);

  // Status text for feedback
  const statusLabel = add([
    text("", { size: 14 }),
    pos(400, 370),
    anchor("center"),
    color(57, 208, 216),
  ]);

  // Create hidden file input
  let fileInput = document.getElementById("resume-file-input");
  if (fileInput) fileInput.remove();
  fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".pdf";
  fileInput.id = "resume-file-input";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Handle file selection
  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    statusLabel.text = "Parsing resume...";

    try {
      const result = await parseResumePDF(file);

      state.resumeText = result.fullText;
      state.resumeSkills = result.skills;
      state.resumeTitle = result.title;
      state.character.name = result.name;
      saveState();

      go("character");
    } catch (err) {
      console.error("Failed to parse resume:", err);
      statusLabel.text = "Error parsing PDF. Try again or press ENTER.";
    }
  });

  // Click on canvas triggers file input
  onClick(() => {
    fileInput.click();
  });

  // ENTER: use demo data
  onKeyPress("enter", () => {
    state.resumeText = "Demo user";
    state.resumeSkills = ["python", "sql", "product management", "agile", "ai"];
    state.resumeTitle = "Product Manager";
    state.character.name = "Demo Player";
    saveState();
    go("character");
  });

  // R: resume saved game
  onKeyPress("r", () => {
    if (state.jobs && state.jobs.length > 0) {
      go("world");
    }
  });

  // N: new game
  onKeyPress("n", () => {
    resetState();
  });

}
