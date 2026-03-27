export function generateCharacterSprite(opts) {
  const { skinColor, shirtColor, pantsColor, hairColor, hairStyle } = opts;
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 24;
  const ctx = canvas.getContext("2d");

  // Hair
  ctx.fillStyle = hairColor;
  if (hairStyle === 0) {
    // Short
    ctx.fillRect(4, 0, 8, 3);
  } else if (hairStyle === 1) {
    // Medium
    ctx.fillRect(3, 0, 10, 4);
  } else {
    // Long
    ctx.fillRect(3, 0, 10, 6);
  }

  // Head (skin)
  ctx.fillStyle = skinColor;
  ctx.fillRect(4, 3, 8, 6);

  // Eyes
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(6, 5, 2, 2);
  ctx.fillRect(10, 5, 2, 2);

  // Shirt body
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

export function generateBuildingSprite(color, hasCoins) {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  // Body
  ctx.fillStyle = color;
  ctx.fillRect(2, 8, 28, 24);

  // Roof (dark triangle)
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(16, 0);
  ctx.lineTo(32, 10);
  ctx.closePath();
  ctx.fill();

  // Door
  ctx.fillStyle = "#4a2912";
  ctx.fillRect(12, 20, 8, 12);

  // Windows
  ctx.fillStyle = "#58a6ff";
  ctx.fillRect(6, 13, 6, 5);
  ctx.fillRect(20, 13, 6, 5);

  // Coins on roof
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
