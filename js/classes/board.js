let c = document.getElementById('canvas')
let ctx = c.getContext('2d')

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent)

if (isMobile) {
  ctx.canvas.width = window.innerWidth - (window.innerWidth % 10) - 20
  ctx.canvas.height = window.innerWidth - (window.innerWidth % 10) - 20
} else {
  ctx.canvas.width = 400
  ctx.canvas.height = 400
}

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
    ctx.lineTo(8, c.height - 8)
    ctx.lineTo(8, 8)
    ctx.stroke()
  }
}
