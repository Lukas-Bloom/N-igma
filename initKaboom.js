import { PHYS } from "./constants.js";
import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  clearColor: [118, 216, 253],
  scale: PHYS.WORLD_SCALE,
   width: 550,
   height: 336,
   
});

export default k;
