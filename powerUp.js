import { PLAYER, COL } from "./constants.js";
import { spawnParticles } from "./collisionEvents/powerUpCollisions.js";
import { socket } from "./socket.js";

export default function powerUp() {
  return {
    update() {},
    changePowerUp(powerUp, obj) {
      if (this.currentPowerUp === powerUp) {
        return;
      }

      play("sound-powerup2");
      spawnParticles(this, COL.BLUE);
      destroy(obj);
      this.clearPowerUps();
      this.currentPowerUp = powerUp;

      switch (powerUp) {
        case "grow": {
          this.scale = vec2(2);
          this.width = PLAYER.WIDTH;
          this.height = PLAYER.HEIGHT;
          break;
        }
        case "doublejump": {
          this.jumpsAmount = 2;
          break;
        }
        case "ghost": {
          break;
        }
        case "shrink": {
          this.scale = vec2(0.5);
          this.width = PLAYER.WIDTH;
          this.height = PLAYER.HEIGHT;
          break;
        }
        case "dash": {
          break;
        }
        case "barrier": {
          this.tempColor = this.color
          this.color = {r:0, g:225, b:225}
          break;
        }

        default: {
        }
      }
    },
    // Add more things that should be cleared
    clearPowerUps() {
      this.currentPowerUp = "";
      this.scale = vec2(1);
      this.jumpsAmount = 1;
      this.color = this.tempColor || this.color
    },
  };
}

export const loseBarrier = (counter, player) => {
  if (counter === 7) {
    socket.emit("powerUp")
    player.clearPowerUps()
    player.jump(1)
    return
  }
  setTimeout(function () {
    if (player.color.r == 0 && player.color.g == 225 && player.color.b == 225) {
      player.color = player.tempColor
    } else {
      player.color = { r: 0, g: 225, b: 225 }
    }
    loseBarrier(++counter, player)
  }, counter * 50)
}
