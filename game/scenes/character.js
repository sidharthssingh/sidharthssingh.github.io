import { state, saveState } from "../state.js";
import { generateCharacterSprite } from "../sprites.js";

const SKIN = ["#f4c794", "#e0ac69", "#c68642", "#8d5524", "#4a2912"];
const SHIRT = ["#58a6ff", "#f85149", "#3fb950", "#d29922", "#bc8cff", "#ff7b72", "#39d0d8"];
const PANTS = ["#30363d", "#1a1a2e", "#2d333b", "#3b2f2f", "#1f3a5f"];
const HAIR_COLOR = ["#1a1a2e", "#4a2912", "#8d5524", "#c68642", "#f4c794", "#f85149", "#58a6ff"];
const HAIR_STYLES = ["Short", "Medium", "Long"];

export function characterScene() {
  const palettes = [SKIN, SHIRT, PANTS, HAIR_COLOR, HAIR_STYLES];
  const labels = ["Skin", "Shirt", "Pants", "Hair Color", "Hair Style"];

  // Current selection indices
  let selections = [0, 0, 0, 0, 0];
  let currentRow = 0;
  let previewSprite = null;

  // Title
  add([
    text("CREATE YOUR CHARACTER", { size: 24 }),
    pos(400, 40),
    anchor("center"),
    color(88, 166, 255),
  ]);

  // Character name
  add([
    text(state.character.name || "Unnamed", { size: 18 }),
    pos(400, 80),
    anchor("center"),
    color(255, 255, 255),
  ]);

  // Preview background
  add([
    rect(160, 220),
    pos(400, 200),
    anchor("center"),
    color(22, 27, 34),
  ]);

  // Selection indicator
  const indicator = add([
    text(">", { size: 20 }),
    pos(140, 340),
    color(88, 166, 255),
  ]);

  // Option row labels and value displays
  const valueLabels = [];
  for (let i = 0; i < labels.length; i++) {
    const yPos = 340 + i * 36;

    add([
      text(labels[i] + ":", { size: 16 }),
      pos(170, yPos),
      color(200, 200, 200),
    ]);

    if (i < 4) {
      // Color swatch
      const swatch = add([
        rect(24, 16),
        pos(340, yPos + 2),
        color(Color.fromHex(palettes[i][0])),
      ]);
      // Also show hex text
      const valLabel = add([
        text(palettes[i][0], { size: 14 }),
        pos(374, yPos),
        color(255, 255, 255),
      ]);
      valueLabels.push({ swatch, label: valLabel });
    } else {
      // Hair style text
      const valLabel = add([
        text(HAIR_STYLES[0], { size: 14 }),
        pos(340, yPos),
        color(255, 255, 255),
      ]);
      valueLabels.push({ swatch: null, label: valLabel });
    }
  }

  // Instructions
  add([
    text("Arrow keys: navigate / change | ENTER: start game", { size: 14 }),
    pos(400, 540),
    anchor("center"),
    color(150, 150, 150),
  ]);

  function getOpts() {
    return {
      skinColor: SKIN[selections[0]],
      shirtColor: SHIRT[selections[1]],
      pantsColor: PANTS[selections[2]],
      hairColor: HAIR_COLOR[selections[3]],
      hairStyle: selections[4],
    };
  }

  function updatePreview() {
    // Remove old preview sprite
    if (previewSprite) {
      destroy(previewSprite);
      previewSprite = null;
    }

    const opts = getOpts();
    const canvas = generateCharacterSprite(opts);
    const spriteName = "preview-" + Date.now();
    loadSprite(spriteName, canvas.toDataURL());

    wait(0.05, () => {
      previewSprite = add([
        sprite(spriteName, { width: 16 * 8, height: 24 * 8 }),
        pos(400, 200),
        anchor("center"),
      ]);
    });
  }

  function updateUI() {
    // Update indicator position
    indicator.pos.y = 340 + currentRow * 36;

    // Update value displays
    for (let i = 0; i < valueLabels.length; i++) {
      const palette = palettes[i];
      const val = palette[selections[i]];

      if (i < 4) {
        const c = Color.fromHex(val);
        valueLabels[i].swatch.color = c;
        valueLabels[i].label.text = val;
      } else {
        valueLabels[i].label.text = val;
      }
    }

    updatePreview();
  }

  // Initial preview
  updatePreview();

  // Controls
  onKeyPress("up", () => {
    currentRow = (currentRow - 1 + labels.length) % labels.length;
    indicator.pos.y = 340 + currentRow * 36;
  });

  onKeyPress("down", () => {
    currentRow = (currentRow + 1) % labels.length;
    indicator.pos.y = 340 + currentRow * 36;
  });

  onKeyPress("left", () => {
    const palette = palettes[currentRow];
    selections[currentRow] = (selections[currentRow] - 1 + palette.length) % palette.length;
    updateUI();
  });

  onKeyPress("right", () => {
    const palette = palettes[currentRow];
    selections[currentRow] = (selections[currentRow] + 1) % palette.length;
    updateUI();
  });

  onKeyPress("enter", () => {
    const opts = getOpts();
    state.character.skinColor = opts.skinColor;
    state.character.shirtColor = opts.shirtColor;
    state.character.pantsColor = opts.pantsColor;
    state.character.hairColor = opts.hairColor;
    state.character.hairStyle = selections[4];
    saveState();
    go("world");
  });
}
