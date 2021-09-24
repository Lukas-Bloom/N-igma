import { PHYS } from "./constants.js";
import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  clearColor: [0, 0, 0],
  scale: PHYS.WORLD_SCALE,
});

export default k;
