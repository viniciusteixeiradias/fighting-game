let gameOver = false

function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + enemy.height
  )
}

function determineWinner ({ player, enemy, timerId }) {
  gameOver = true
  clearTimeout(timerId)
  const displayText = document.querySelector('#displayText')
  displayText.style.display = 'flex'

  if (player.health === enemy.health) {
    displayText.innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    displayText.innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    displayText.innerHTML = 'Player 2 Wins'
  }

  setTimeout(() => {
    restartGame({ player, enemy })
  }, 3000)
}

function restartGame({ player, enemy }) {
  player.reset(200, 0)
  enemy.reset(700, 0)

  gsap.to('#playerHealth', { width: '100%' })
  gsap.to('#enemyHealth', { width: '100%' })

  document.querySelector('#displayText').style.display = 'none'

  keys.a.pressed = false
  keys.d.pressed = false
  keys.ArrowRight.pressed = false
  keys.ArrowLeft.pressed = false

  timer = 60
  document.querySelector('#timer').innerHTML = timer
  gameOver = false
  decreaseTimer()
}

let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId =  setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0 && !gameOver) {
    determineWinner({ player, enemy, timerId })
  }
}