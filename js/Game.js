class Game {
  constructor () {
    this.board = new Board
    this.players = this.createPlayers()
    this.ready = false
  } 

  /**
  Create 2 player objects
  @return {array} playerArr: return array of objects that contains player's info
  */
  createPlayers () {
    const player1 = new Player('No.1', 1, '#e15258', true)
    const player2 = new Player('No.2', 2, '#e59a13')
    return [player1, player2]
  }

  /**
   * Check the active player
   * @return {object} the Player object whose property: active is true
   */
  get activePlayer () {
    return this.players.find(ele => ele.active)
  }

  /**
   * start the game
   */
  startGame () {
    this.board.drawHtmlBoard()
    this.activePlayer.activeToken.drawHtmlToken()
    this.ready = true
  }

  
  /**
   * Branches code, listen on what key player presses
   * @param {object} event object of keydown
   */
  handleKeyDown (keyDown) {
    if (this.ready) {
      if (keyDown === 'ArrowLeft') {
        this.activePlayer.activeToken.moveLeft()
      }

      if (keyDown === 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns)
      }

      if (keyDown === 'ArrowDown') {
        this.playToken()
      }
    }
  }

  /**
   * Define the target space and do the drop animation
   */
  playToken () {
    const spaces = this.board.spaces
    const activeToken = this.activePlayer.activeToken
    const thisSpaces = spaces[activeToken.columnLocation]
    let targetSpace = null
    

    for (let space of thisSpaces) {
      // find the last empty space
      if (!space.token) {
        targetSpace = space
      }
    }
    
    if (targetSpace) {
      this.ready = false
      const gameObj = this

      activeToken.drop(targetSpace, function () {
        console.log('drop', gameObj.board);
        gameObj.updateGameState(activeToken, targetSpace)
      })
    }
  }

  /**
 * Detect four in a row
 * @param {object} target target space of the dropped token
 * @return {boolean} win the game or not
 */
  checkForWin(target) {
    const owner = target.token.owner
    let isWin = false
    console.log(this.board.columns);
    // Horizontal check
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner) {
          
          isWin = true
        }
      }
    }

    // Vertical check
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner) {
          isWin = true
        }
      }
    }

    // Diagonal: \
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y - 1].owner === owner &&
          this.board.spaces[x + 2][y - 2].owner === owner &&
          this.board.spaces[x + 3][y - 3].owner === owner) {
          isWin = true
        }
      }
    }

    // Diagonal: /
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y + 1].owner === owner &&
          this.board.spaces[x + 2][y + 2].owner === owner &&
          this.board.spaces[x + 3][y + 3].owner === owner) {
          isWin = true
        }
      }
    }

    return isWin
  }

  /**
   * Switch active player
   */
  switchPlayers () {
    for (let player of this.players) {
      player.active = player.active ? false : true
    }
  }

  /**
   * Display game over message
   * @param {string} message message - Game over message
   */
  gameOver (message) {
    const gameoverEle = document.querySelector('#game-over')
    gameoverEle.style.display = 'block'
    gameoverEle.textContent = message
    this.ready = false
  }

  /**
   * Update game state after a token is dropped
   * @param {object} token the dropped token 
   * @param {object} target the space for the dropped token
   */
  updateGameState (token, target) {
    target.mark(token)
    if (this.checkForWin(target)) {
      this.gameOver(`${token.owner.name} win`)
    } else if (!this.checkForWin(target) && !this.activePlayer.checkTokens()) {
      this.gameOver('Token has run out')
    } else {
      this.switchPlayers()
      this.ready = true
      this.activePlayer.activeToken.drawHtmlToken()
    }
  }
}