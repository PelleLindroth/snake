let c = document.getElementById('canvas')
let ctx = c.getContext('2d')

class Board {
  constructor(color) {
    this.color = color
  }

  draw() {
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.strokeStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(8, 8)
    ctx.lineTo(c.width - 8, 8)
    ctx.lineTo(c.height - 8, c.width - 8)
    ctx.lineTo(10, c.height - 8)
    ctx.lineTo(8, 8)
    ctx.stroke()
  }
}
