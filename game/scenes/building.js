import { state, saveState, addCoins, markApplied, isApplied } from "../state.js";
import { loadCharacterSprite } from "../sprites.js";

export function buildingScene({ buildingId }) {
  const BUILDING_NAMES = ["Tech Tower", "Startup Garage", "Gaming Den", "Finance HQ", "AI Labs"];
  const BUILDING_COLORS = ["#58a6ff", "#3fb950", "#bc8cff", "#d29922", "#39d0d8"];
  const NPC_POSITIONS = [{ x: 150, y: 200 }, { x: 400, y: 200 }, { x: 650, y: 200 }];
  const SPEED = 180;

  const buildingName = BUILDING_NAMES[buildingId];
  const buildingColor = BUILDING_COLORS[buildingId];
  const jobs = state.jobs.filter((j) => j.buildingId === buildingId).slice(0, 3);

  let dialogueOpen = false;
  let dialogueBox = null;
  let dialogueChildren = [];
  let nearNpc = null;
  let promptLabel = null;
  let currentJob = null;

  // --- Dark background ---
  add([
    rect(width(), height()),
    pos(0, 0),
    color(22, 27, 34),
  ]);

  // --- Floor tile pattern ---
  for (let tileY = 60; tileY < height(); tileY += 40) {
    for (let tileX = 0; tileX < width(); tileX += 40) {
      add([
        rect(38, 38),
        pos(tileX, tileY),
        color(26, 33, 44),
      ]);
    }
  }

  // --- Header bar ---
  add([
    rect(width(), 50),
    pos(0, 0),
    color(Color.fromHex(buildingColor)),
  ]);

  add([
    text(buildingName, { size: 22 }),
    pos(width() / 2, 25),
    anchor("center"),
    color(13, 17, 23),
  ]);

  // --- HUD ---
  add([
    text("ESC: Leave building", { size: 12 }),
    pos(16, 575),
    color(125, 133, 144),
    fixed(),
    z(100),
  ]);

  add([
    text(`Coins: ${state.coins}`, { size: 12 }),
    pos(width() - 16, 575),
    anchor("right"),
    color(210, 153, 34),
    fixed(),
    z(100),
  ]);

  // --- NPCs ---
  jobs.forEach((job, idx) => {
    const npcPos = NPC_POSITIONS[idx];
    const applied = isApplied(job.url);
    const npcColor = applied ? "#30363d" : buildingColor;

    // Desk
    add([
      rect(60, 30),
      pos(npcPos.x - 30, npcPos.y + 30),
      color(Color.fromHex("#4a2912")),
    ]);

    // NPC body
    add([
      rect(24, 36, { radius: 4 }),
      pos(npcPos.x - 12, npcPos.y - 18),
      color(Color.fromHex(npcColor)),
    ]);

    // NPC head
    add([
      circle(10),
      pos(npcPos.x, npcPos.y - 24),
      anchor("center"),
      color(Color.fromHex("#f4c794")),
    ]);

    // Company label
    add([
      text(job.company, { size: 10 }),
      pos(npcPos.x, npcPos.y - 42),
      anchor("center"),
      color(255, 255, 255),
    ]);

    // Coin amount (only if not applied)
    if (!applied) {
      add([
        text(`${job.coins} coins`, { size: 10 }),
        pos(npcPos.x, npcPos.y - 55),
        anchor("center"),
        color(210, 153, 34),
      ]);
    }

    // NPC collision area (invisible)
    add([
      rect(60, 80),
      pos(npcPos.x - 30, npcPos.y - 30),
      opacity(0),
      area(),
      body({ isStatic: true }),
      `npc-${idx}`,
      "npc",
    ]);
  });

  // --- Player ---
  wait(0.05, () => {
    loadCharacterSprite({ loadSprite }, "player-inside", state.character);

    const player = add([
      sprite("player-inside"),
      pos(width() / 2, 480),
      anchor("center"),
      scale(3),
      area({ shape: new Rect(vec2(0, 0), 48, 72) }),
      body(),
      "player-inside",
    ]);

    // Movement
    onKeyDown("left", () => {
      if (!dialogueOpen) player.move(-SPEED, 0);
    });
    onKeyDown("right", () => {
      if (!dialogueOpen) player.move(SPEED, 0);
    });
    onKeyDown("up", () => {
      if (!dialogueOpen) player.move(0, -SPEED);
    });
    onKeyDown("down", () => {
      if (!dialogueOpen) player.move(0, SPEED);
    });

    // Clamp
    player.onUpdate(() => {
      player.pos.x = Math.max(24, Math.min(width() - 24, player.pos.x));
      player.pos.y = Math.max(70, Math.min(height() - 24, player.pos.y));
    });

    // NPC interaction
    jobs.forEach((job, idx) => {
      player.onCollide(`npc-${idx}`, () => {
        nearNpc = { job, idx };
        if (promptLabel) destroy(promptLabel);
        promptLabel = add([
          text("[SPACE] Talk", { size: 14 }),
          pos(NPC_POSITIONS[idx].x, NPC_POSITIONS[idx].y + 80),
          anchor("center"),
          color(57, 208, 216),
          z(100),
        ]);
      });

      player.onCollideEnd(`npc-${idx}`, () => {
        if (nearNpc && nearNpc.idx === idx) {
          nearNpc = null;
        }
        if (promptLabel) {
          destroy(promptLabel);
          promptLabel = null;
        }
      });
    });
  });

  // --- Helper: close dialogue ---
  function closeDialogue() {
    if (dialogueBox) {
      destroy(dialogueBox);
      dialogueBox = null;
    }
    dialogueChildren.forEach((c) => destroy(c));
    dialogueChildren = [];
    dialogueOpen = false;
    currentJob = null;
  }

  // --- Helper: show dialogue ---
  function showDialogue(job) {
    dialogueOpen = true;
    currentJob = job;
    const applied = isApplied(job.url);
    const cx = width() / 2;
    const cy = 420;

    // Dark box with border
    dialogueBox = add([
      rect(500, 220, { radius: 8 }),
      pos(cx, cy),
      anchor("center"),
      color(22, 27, 34),
      outline(2, Color.fromHex(buildingColor)),
      fixed(),
      z(200),
    ]);

    // Company name
    dialogueChildren.push(add([
      text(job.company, { size: 18 }),
      pos(cx, cy - 80),
      anchor("center"),
      color(Color.fromHex(buildingColor)),
      fixed(),
      z(200),
    ]));

    // Job title
    dialogueChildren.push(add([
      text(job.title, { size: 14 }),
      pos(cx, cy - 50),
      anchor("center"),
      color(255, 255, 255),
      fixed(),
      z(200),
    ]));

    // Location + coins
    dialogueChildren.push(add([
      text(`${job.location} | ${job.coins} coins`, { size: 12 }),
      pos(cx, cy - 25),
      anchor("center"),
      color(125, 133, 144),
      fixed(),
      z(200),
    ]));

    if (applied) {
      dialogueChildren.push(add([
        text("Already applied!", { size: 14 }),
        pos(cx, cy + 20),
        anchor("center"),
        color(125, 133, 144),
        fixed(),
        z(200),
      ]));
    } else {
      dialogueChildren.push(add([
        text("[ENTER] Apply & collect coins!", { size: 14 }),
        pos(cx, cy + 20),
        anchor("center"),
        color(Color.fromHex("#3fb950")),
        fixed(),
        z(200),
      ]));
    }

    // Close hint
    dialogueChildren.push(add([
      text("[ESC] Close", { size: 12 }),
      pos(cx, cy + 60),
      anchor("center"),
      color(125, 133, 144),
      fixed(),
      z(200),
    ]));
  }

  // --- Key: SPACE ---
  onKeyPress("space", () => {
    if (dialogueOpen) {
      closeDialogue();
    } else if (nearNpc) {
      showDialogue(nearNpc.job);
    }
  });

  // --- Key: ENTER (apply) ---
  onKeyPress("enter", () => {
    if (dialogueOpen && currentJob && !isApplied(currentJob.url)) {
      markApplied(currentJob.url);
      addCoins(currentJob.coins);

      // Reward flash
      add([
        text(`+${currentJob.coins} coins!`, { size: 28 }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(210, 153, 34),
        fixed(),
        z(300),
      ]);

      // Reload scene after 1.5s
      wait(1.5, () => {
        go("building", { buildingId });
      });
    }
  });

  // --- Key: ESC ---
  onKeyPress("escape", () => {
    if (dialogueOpen) {
      closeDialogue();
    } else {
      go("world");
    }
  });
}
