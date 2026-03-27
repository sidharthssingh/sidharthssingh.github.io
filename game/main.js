import { titleScene } from "./scenes/title.js";
import { characterScene } from "./scenes/character.js";
import { worldScene } from "./scenes/world.js";
import { buildingScene } from "./scenes/building.js";
import { loadState } from "./state.js";

kaplay({
  width: 800,
  height: 600,
  background: [13, 17, 23],
  stretch: true,
  letterbox: true,
});

scene("title", titleScene);
scene("character", characterScene);
scene("world", worldScene);
scene("building", buildingScene);

loadState();

go("title");
