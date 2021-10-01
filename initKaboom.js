import { PHYS } from "./constants.js";
import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  clearColor: [240, 223, 153],
  scale: PHYS.WORLD_SCALE,
   width: 550,
   height: 360,
});

export default k;
