const game = new Game()

//Elements
const startBtn = document.querySelector('#begin-game')


/* Listeners */
/*
listener for click on '#begin-game' button, and calls startGame in game object
*/
startBtn.addEventListener('click', function (event) {
  game.startGame()

  this.style.display = 'none'
  document.querySelector('#play-area').style.opacity = '1'
})

/**
 * Listen to keyboard press
 */
document.addEventListener('keydown', (e) => {
  game.handleKeyDown(e.key)
})