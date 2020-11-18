const scoreHolder = document.querySelector('.current-score')
const modal = document.querySelector('.modal')
let speed = 10
let score = 0
let gameOn = false
let gameOff = true
let snake, ring, loop
let board = new Board('#333')
board.draw()

const init = () => {
  speed = 10
  gameOn = false
  ring = new Ring(100, 100)
  snake = new Snake(
    5,
    10,
    '#fff',
    40,
    380
  )
  toggleModal()
  setListeners()
}

const start = () => {
  score = 0
  setScore()
  toggleModal()
  gameLoop()
}

const toggleModal = () => {
  gameOn ? modal.classList.add('hidden') : modal.classList.remove('hidden')
}

const gameLoop = () => {
  loop = setInterval(() => {
    drawBoardAndCoin()
    gameOff = snake.forward()
    gameOff && endGame()

    if (snake.grow && snake.isEven() && speed > 0.2) {
      setNewCoin()
      setScore()
      increaseSpeed()
    }
  }, speed
  )
}

const drawBoardAndCoin = () => {
  board.draw()
  ring.draw()
}

const increaseSpeed = () => {
  speed -= 0.1
  speed = Math.floor(speed * 10) / 10
  clearInterval(loop)
  gameLoop()
}

const setNewCoin = () => {
  console.log()
  let [x, y] = getCoordinates()

  for (let piece of snake.pieces) {
    if (x === piece.x && y === piece.y) {
      setNewCoin()
    }
  }

  ring = new Ring(x, y)
  ring.draw()
}

const getCoordinates = () => {
  let x = Math.ceil(Math.random() * 370) + 10
  x -= x % 10
  let y = Math.ceil(Math.random() * 370) + 10
  y -= y % 10

  return [x, y]
}

const endGame = () => {
  modal.querySelector('h2').innerText = 'GAME OVER'
  clearInterval(loop)
  snake.draw()
  init()
}

const setListeners = () => {
  window.addEventListener('keydown', startListener)
  window.addEventListener('keydown', directionListener)
}

const startListener = e => {
  if (gameOn) return

  if (e.code === 'Space') {
    gameOn = true
    start()
  }
}

const directionListener = e => {
  if (!gameOn) return

  switch (e.code) {
    case 'ArrowRight':
      if (snake.direction != 'left') {
        snake.setDirection('right')
      }
      break
    case 'ArrowLeft':
      if (snake.direction != 'right') {
        snake.setDirection('left')
      }
      break
    case 'ArrowUp':
      if (snake.direction != 'down') {
        snake.setDirection('up')
      }
      break
    case 'ArrowDown':
      if (snake.direction != 'up') {
        snake.setDirection('down')
      }
      break
  }
}

const setScore = () => {
  let addition = 10 - Math.floor(speed)
  if (addition == 0) addition = 1

  score += addition
  scoreHolder.innerText = score
}
