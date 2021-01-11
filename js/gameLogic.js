const scoreHolder = document.querySelector('.current-score')
const modal = document.querySelector('.modal')
const touchPad = document.querySelector('.touch-pad')
const upField = document.querySelector('.up')
const rightField = document.querySelector('.right')
const downField = document.querySelector('.down')
const leftField = document.querySelector('.left')
const speedBar = document.querySelector('.bar')
const messageBox = document.querySelector('.message-box')
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
let speed = 10
let speedBarLength = 2
let score = 0
let ringsEaten = 0
let addition = 1
let gameOn = false
let death = false
let snake, ring, loop
let board = new Board('#333')
board.draw()

const init = () => {
  console.log(isMobile)
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
  addition = 1
  scoreHolder.innerText = score
  toggleModal()
  gameLoop()
}

const toggleModal = () => {
  gameOn ? modal.classList.add('hidden') : modal.classList.remove('hidden')
}

const gameLoop = () => {
  loop = setInterval(() => {
    drawBoardAndRing()
    death = snake.forward()
    death && endGame()

    if (snake.grow && snake.isEven() && speed > 0.2) {
      setNewRing()
      setScore()
      increaseSpeed()
    }
  }, speed
  )
}

const setMessage = () => {
  let p1, p2

  if (isMobile) {
    p1 = document.createElement('p')
    p1.innerHTML = 'TOUCH to start'
    p2 = document.createElement('p')
    p2.innerHTML = 'Use board sides to turn'
  } else {
    p1 = document.createElement('p')
    p1.innerHTML = 'SPACE to start'
    p2 = document.createElement('p')
    p2.innerHTML = 'Arrow keys to turn'
  }
  messageBox.appendChild(p1)
  messageBox.appendChild(p2)
}

setMessage()

const drawBoardAndRing = () => {
  board.draw()
  ring.draw()
}

const increaseSpeed = () => {
  speed -= 0.1
  speed = Math.floor(speed * 10) / 10
  clearInterval(loop)
  increaseSpeedBar()
  gameLoop()
}

const setNewRing = () => {
  ringsEaten++
  let [x, y] = getCoordinates()

  for (let piece of snake.pieces) {
    if (x === piece.x && y === piece.y) {
      ringsEaten--
      setNewRing()
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

const setScore = () => {
  score += addition
  if (ringsEaten && ringsEaten % 10 === 0) {
    addition++
  }
  scoreHolder.innerText = score
}

const increaseSpeedBar = () => {
  speedBarLength += 2
  if (ringsEaten && ringsEaten % 10 === 0) {
    speedBar.style.width = `${speedBarLength}px`
  }
}

const endGame = () => {
  showGameOver()
  speedBarLength = 2
  ringsEaten = 0
  speedBar.style.width = `${speedBarLength}px`
  clearInterval(loop)
  snake.draw()
  init()
}

const showGameOver = () => {
  modal.querySelector('h2').innerText = 'GAME OVER'
  let count = 1
  let blink = setInterval(() => {
    count % 2 != 0 ? modal.classList.add('hidden') : modal.classList.remove('hidden')
    count > 11 && clearInterval(blink)
    count++
  }, 20)
}

const setListeners = () => {
  window.addEventListener('keydown', startListener)
  window.addEventListener('keydown', directionListener)
  modal.addEventListener('touchstart', mobileStartListener)

  upField.addEventListener('touchstart', () => {
    if (snake.direction != 'down') {
      snake.setDirection('up')
    }
  })
  rightField.addEventListener('touchstart', () => {
    if (snake.direction != 'left') {
      snake.setDirection('right')
    }
  })
  downField.addEventListener('touchstart', () => {
    if (snake.direction != 'up') {
      snake.setDirection('down')
    }
  })
  leftField.addEventListener('touchstart', () => {
    if (snake.direction != 'right') {
      snake.setDirection('left')
    }
  })
}

const startListener = e => {
  if (gameOn) return

  if (e.code === 'Space') {
    gameOn = true
    start()
  }
}

const mobileStartListener = e => {
  if (gameOn) return
  gameOn = true
  start()
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

