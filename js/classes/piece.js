class Piece {
  constructor(x, y, size, color) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.color = color
  }

  setWidth(width) {
    this.width = width
  }

  setHeight(height) {
    this.height = height
  }

  drawPiece() {
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 4;
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
