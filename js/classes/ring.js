class Ring {
  constructor(x, y) {
    this.x = x,
      this.y = y
  }

  draw() {
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2;
    ctx.moveTo(this.x + 5, this.y + 5)
    ctx.beginPath()
    ctx.arc(this.x + 5, this.y + 5, 3, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.lineWidth = 1
  }
}