class Token {
  constructor (index, owner) {
    this.owner = owner
    this.id = `token-${index}-${this.owner.id}`
    this.dropped = false
    this.columnLocation = 0
  }

  /**
   * Render token on page
   */
  drawHtmlToken () {
    const newTokenEle = document.createElement('div')
    newTokenEle.setAttribute('id', this.id)
    newTokenEle.setAttribute('class', 'token')
    newTokenEle.style.backgroundColor = this.owner.color
    document.querySelector('#game-board-underlay').appendChild(newTokenEle)
  }

  /**
   * @getter {html node} return this html token node with reference to the Token object
   */
  get htmlToken () {
    return document.querySelector(`#${this.id}`)
  }

  /**
   * Gets how many pixels away from the left edge
   * @return {string} left offset of token object htmlObject
   */
  get offsetLeft () {
    return this.htmlToken.offsetLeft
  }

  /**
   * Token object moves left  
   */
  moveLeft () {
    if (this.columnLocation > 0) {
      this.htmlToken.style.left = this.offsetLeft - 76
      this.columnLocation -= 1
    }
  }

  /**
   * Token object moves right
   */
  moveRight (cols) {
    if (this.columnLocation < cols - 1) {
      this.htmlToken.style.left = this.offsetLeft + 76
      this.columnLocation += 1
    }
  }

  /**
   * Drop html token into target space
   * @param {object} target - target space object
   * @param {function} reset - reset function called after drop animation is completed
   */
  drop (target, reset) {
    this.dropped = true
    $(this.htmlToken).animate({
      top: (target.y * target.diameter)
    }, 750, 'easeOutBounce', reset);  
  }
}