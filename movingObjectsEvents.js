export const platformHorizontal = (speed, dir, distance) => {

    let limitLeft, limitRight;
    return {
      load() {
        limitLeft = Math.floor(this.pos.x) - distance;
        limitRight = Math.floor(this.pos.x) + distance;
      },
      update() {
        const vel = speed * dir;
        const lol = this.move(vel, 0);
        if (
          Math.floor(this.pos.x) < limitLeft ||
          Math.floor(this.pos.x) > limitRight ||
          lol
        ) {
          dir = vel > 0 ? -1 : 1;
        }
      },
    };
};

export const batVertical = (speed, dir, distance) => {
  let limitTop, limitBot;
  return {
    id: "fly",
    load() {
      this.play("fly");
     // limitTop = Math.floor(this.pos.y) - distance;
     // limitBot = Math.floor(this.pos.y) + distance;
    }
/*     update() {
      const vel = speed * dir;
      const lol = this.move(0, vel);
      if (
        Math.floor(this.pos.y) < limitTop ||
        Math.floor(this.pos.y) > limitBot ||
        lol
      ) {
        dir = vel > 0 ? -1 : 1;
      }
    }, */
  }
};

export const patrol = (speed = 60, dir = randi(1, 2) === 1 ? -1 : 1) => {
  return {
    update() {
      const vel = speed * dir;
      const colliding = this.move(vel, 0);
      if (colliding) {
        dir = vel > 0 ? -1 : 1;
      }
    },
    load() {
      this.play("walk");
    },
  };
};

export const platformVertical = (speed = rand(30, 50), dir = -1) => {
  return {
    update() {
      // console.log(Math.floor(time()) % 2);
      const vel = speed * dir;
      Math.floor(time()) % 2 === 0 ? this.move(0, -vel) : this.move(0, vel);
    },
  };
};
