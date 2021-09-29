import { PHYS } from "./constants.js";

export const handleKeyEvents = (p) => {
  return (
    keyDown("left", () => {
      if (keyIsPressed("left")) {
        p.flipX(true);
        p.play("run");
      }
      if (p.slideRight > PHYS.SLIDE || p.isTeleSwap) {
        return;
      }
      if (p.slideLeft) {
        p.move(-p.slideLeft, 0);
        p.slideLeft = Math.min(
          p.slideLeft + p.slideLeft / PHYS.SLIDE,
          PHYS.MOVE_SPEED
        );
      } else {
        p.move(p.isOnSlime ? -PHYS.SLIME_MOVE_SPEED : -PHYS.MOVE_SPEED, 0);
      }
    }),
    keyRelease("left", () => {
      p.play("idle");
      if (p.slideRight > PHYS.SLIDE) {
        return;
      }
      if (p.isOnIce) {
        slideLeft();
      }
    }),
    keyDown("right", () => {
      if (keyIsPressed("right")) {
        p.flipX(false);
        p.play("run");
      }
      if (p.slideLeft > PHYS.SLIDE || p.isTeleSwap) {
        return;
      }
      if (p.slideRight) {
        p.move(p.slideRight, 0);
        p.slideRight = Math.min(
          p.slideRight + p.slideRight / PHYS.SLIDE,
          PHYS.MOVE_SPEED
        );
      } else {
        p.move(p.isOnSlime ? PHYS.SLIME_MOVE_SPEED : PHYS.MOVE_SPEED, 0);
      }
    }),
    keyRelease("right", () => {
      p.play("idle");
      if (p.slideLeft > PHYS.SLIDE) {
        return;
      }
      if (p.isOnIce) {
        slideRight();
      }
    }),
    keyPress("space", () => {
      if (p.jumps > 0 && !p.isJumping && !p.isTeleSwap) {
        p.jump(p.isOnSlime ? PHYS.SLIME_JUMP : PHYS.JUMP_HEIGHT);
        play("sound-jump");
      }
    }),
    keyRelease("space", () => {
      p.isJumping = false;
      p.jumps--;
    }),
    keyPress("shift", () => {
      if (p.currentPowerUp !== "dash") return;

      if (keyIsDown("right") || keyIsDown("left")) {
        const dir = keyIsDown("left") ? -1 : 1;
        p.currentPowerUp = "dashCooldown";
        const xStart = p.pos.x;
        p.move(4000 * dir, 0);
        const xEnd = p.pos.x;

        let ii = 0;
        for (let i = xStart * dir; i < xEnd * dir - 22; i += 22) {
          ii++;
          add([
            pos(p.pos.x - 22 * ii * dir, p.pos.y - 17),
            sprite("beanDash", { flipX: dir === -1 ? true : false }),
            color(p.color),
            opacity(0.5),
            lifespan(0.45 - 0.1 * ii),
          ]);
        }
        setTimeout(function () {
          if (p.currentPowerUp === "dashCooldown") {
            p.currentPowerUp = "dash";
          }
        }, 3000);
      }
    })
  );
};
