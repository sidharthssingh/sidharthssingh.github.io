import { state, isApplied } from "../state.js";
import { loadCharacterSprite, generateBuildingSprite } from "../sprites.js";

export function worldScene() {
  const SPEED = 200;

  const buildings = [
    { id: 0, name: "Tech Tower", x: 200, y: 150, color: "#58a6ff" },
    { id: 1, name: "Startup Garage", x: 500, y: 150, color: "#3fb950" },
    { id: 2, name: "Gaming Den", x: 200, y: 350, color: "#bc8cff" },
    { id: 3, name: "Finance HQ", x: 500, y: 350, color: "#d29922" },
    { id: 4, name: "AI Labs", x: 350, y: 250, color: "#39d0d8" },
  ];

  // Green ground
  add([
    rect(width(), height()),
    pos(0, 0),
    color(26, 46, 26),
  ]);

  // Horizontal path
  add([
    rect(width(), 40),
    pos(0, 240),
    color(60, 60, 40),
  ]);

  // Vertical path
  add([
    rect(40, height()),
    pos(340, 0),
    color(60, 60, 40),
  ]);

  // HUD - Coins display
  add([
    text(`Coins: ${state.coins}`, { size: 14 }),
    pos(16, 16),
    color(210, 153, 34),
    fixed(),
    z(100),
  ]);

  // HUD - Level display
  add([
    text(`Lv.${state.level} ${state.character.name}`, { size: 14 }),
    pos(16, 38),
    color(125, 133, 144),
    fixed(),
    z(100),
  ]);

  // HUD - Instructions
  add([
    text("Arrow keys: move | SPACE: enter building", { size: 12 }),
    pos(width() / 2, height() - 20),
    anchor("center"),
    color(125, 133, 144),
    fixed(),
    z(100),
  ]);

  // Load and place building sprites (with delay so sprites load)
  wait(0.05, () => {
    buildings.forEach((b) => {
      const hasCoins = state.jobs.some(
        (job) => job.buildingId === b.id && !isApplied(job.url)
      );
      const spriteCanvas = generateBuildingSprite(b.color, hasCoins);
      const spriteName = `building-sprite-${b.id}`;
      loadSprite(spriteName, spriteCanvas.toDataURL());

      add([
        sprite(spriteName),
        pos(b.x, b.y),
        anchor("center"),
        scale(3),
        area({ shape: new Rect(vec2(0, 0), 96, 96) }),
        body({ isStatic: true }),
        `building-${b.id}`,
        "building",
      ]);

      // Name label below building
      add([
        text(b.name, { size: 11 }),
        pos(b.x, b.y + 56),
        anchor("center"),
        color(255, 255, 255),
      ]);
    });
  });

  // Load and place player (with slightly longer delay)
  let nearBuilding = null;
  let promptLabel = null;

  wait(0.1, () => {
    loadCharacterSprite({ loadSprite }, "player", state.character);

    const player = add([
      sprite("player"),
      pos(350, 450),
      anchor("center"),
      scale(3),
      area({ shape: new Rect(vec2(0, 0), 48, 72) }),
      body(),
      "player",
    ]);

    // Movement
    onKeyDown("left", () => {
      player.move(-SPEED, 0);
    });
    onKeyDown("right", () => {
      player.move(SPEED, 0);
    });
    onKeyDown("up", () => {
      player.move(0, -SPEED);
    });
    onKeyDown("down", () => {
      player.move(0, SPEED);
    });

    // Clamp to canvas bounds
    player.onUpdate(() => {
      player.pos.x = Math.max(24, Math.min(width() - 24, player.pos.x));
      player.pos.y = Math.max(24, Math.min(height() - 24, player.pos.y));
    });

    // Building interaction
    buildings.forEach((b) => {
      player.onCollide(`building-${b.id}`, () => {
        nearBuilding = b.id;
        if (promptLabel) {
          destroy(promptLabel);
        }
        promptLabel = add([
          text(`[SPACE] Enter ${b.name}`, { size: 14 }),
          pos(width() / 2, height() - 50),
          anchor("center"),
          color(57, 208, 216),
          fixed(),
          z(100),
        ]);
      });

      player.onCollideEnd(`building-${b.id}`, () => {
        if (nearBuilding === b.id) {
          nearBuilding = null;
        }
        if (promptLabel) {
          destroy(promptLabel);
          promptLabel = null;
        }
      });
    });

    onKeyPress("space", () => {
      if (nearBuilding !== null) {
        go("building", { buildingId: nearBuilding });
      }
    });
  });
}
