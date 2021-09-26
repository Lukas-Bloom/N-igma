import { PLAYER } from './constants.js'
export default function powerUp() {

  return {

    update() {
     
    },
    changePowerUp(powerUp, obj) {
      
      if(this.currentPowerUp === powerUp) {
        return
      }

      destroy(obj)
      this.clearPowerUps()
      this.currentPowerUp = powerUp

      switch (powerUp) {
        case "grow": {
          this.scale = vec2(2)
          this.width = PLAYER.WIDTH
          this.height = PLAYER.HEIGHT
          break
        }
        case "doublejump": {
          this.jumpsAmount = 2
          break
        }
        case "ghost": {
          break
        }
        case "shrink": {
          this.scale = vec2(0.5)
          this.width = PLAYER.WIDTH
          this.height = PLAYER.HEIGHT
          break
        }
    


        default: {
          
        }
      } 
      
    },
    // Add more things that should be cleared
    clearPowerUps() {
      this.currentPowerUp = ''
      this.scale = vec2(1)
      this.jumpsAmount = 1
    }
  }
}