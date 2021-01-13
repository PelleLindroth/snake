class Snake {
  constructor(length, size, color, x, y) {
    this.length = length
    this.size = size
    this.color = color
    this.direction = 'right'
    this.wantedDirection = this.direction
    this.x = x
    this.y = y
    this.growth = 1
    this.grow = false
    this.pieces = this.build()
    this.head = this.pieces[0]
  }

  build() {
    let pieces = []
    let x = this.x

    for (let i = 0; i < this.length; i++) {
      let piece = new Piece(x, this.y, this.size, this.color)
      pieces.push(piece)
      x -= this.size
    }

    return pieces
  }

  forward() {
    if (this.checkCollision()) {
      return true
    }

    if (this.isEven()) {
      this.direction = this.wantedDirection
      this.checkEat() ? this.grow = true : this.grow = false
      !this.grow && this.pieces.pop()
      this.setNewHead()
    } else {
      this.growHead()
    }

    !this.grow && this.shrinkTail()
    this.draw()
  }

  setNewHead = () => {
    switch (this.direction) {
      case 'right':
        this.x += this.size
        this.pieces.unshift(new Piece(this.x, this.y, this.size, this.color))
        break
      case 'left':
        this.x -= this.size
        this.pieces.unshift(new Piece(this.x + (this.size - this.growth), this.y, this.size, this.color))
        break
      case 'up':
        this.y -= this.size
        this.pieces.unshift(new Piece(this.x, this.y + (this.size - this.growth), this.size, this.color))
        break
      case 'down':
        this.y += this.size
        this.pieces.unshift(new Piece(this.x, this.y, this.size, this.color))
        break
    }

    this.head = this.pieces[0]
    this.head.y === this.pieces[1].y ? this.head.setWidth(this.growth) : this.head.setHeight(this.growth)
  }

  growHead = () => {
    let nextPiece = this.pieces[1]

    if (this.head.y === nextPiece.y) {
      this.head.setWidth(this.head.width + this.growth)
      if (this.head.x < nextPiece.x) {
        this.head.x -= this.growth
      }
    } else {
      this.head.setHeight(this.head.height + this.growth)
      if (this.head.y < nextPiece.y) {
        this.head.y -= this.growth
      }
    }
  }

  shrinkTail = () => {
    let tail = this.pieces[this.pieces.length - 1]
    let penultimatePiece = this.pieces[this.pieces.length - 2]

    if (tail.y === penultimatePiece.y) {
      tail.setWidth(tail.width - this.growth)
      tail.x < penultimatePiece.x && (tail.x += this.growth)
    } else {
      tail.setHeight(tail.height - this.growth)
      tail.y < penultimatePiece.y && (tail.y += this.growth)
    }
  }

  setDirection = (direction) => {
    this.wantedDirection = direction
  }

  isEven = () => {
    return this.head.width === 10 && this.head.height === 10
  }

  checkEat = () => {
    return this.head.x === ring.x && this.head.y === ring.y
  }

  checkCollision = () => {
    if (this.x > wrapperWidth - 20 || this.y > wrapperWidth - 20 || this.x < 10 | this.y < 10) {
      return true
    }

    for (let piece of this.pieces) {
      if (this.direction === 'right' && piece != this.head && (this.head.x + this.head.width) === (piece.x + 1) && this.head.y === piece.y) {
        return true
      } else if (this.direction === 'left' && piece != this.head && this.head.x === (piece.x + (this.size - 1)) && this.head.y === piece.y) {
        return true
      } else if (this.direction === 'up' && piece != this.head && this.head.y === (piece.y + (this.size - 1)) && this.head.x === piece.x) {
        return true
      } else if (this.direction === 'down' && piece != this.head && (this.head.y + this.head.height) === (piece.y + 1) && this.head.x === piece.x) {
        return true
      }
    }

    return false
  }

  draw() {
    for (let piece of this.pieces) {
      piece.drawPiece()
    }
  }
}