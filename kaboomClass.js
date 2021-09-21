import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

/* export const k = kaboom({
  clearColor: ["black"],
});

export default k; */


class Kaboom {
  #clearColor;
  #k
  constructor(clearColor) {
    this.clearColor = clearColor;
    this.k=kaboom({
      clearColor: clearColor,
    });
  }


   doThis() {
    
    console.log(this.clearColor);

  }


}

export default Kaboom