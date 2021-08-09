class Player {
  constructor (name, id, color, active = false) {
    this.name = name
    this.id = id 
    this.color = color
    this.active = active
    this.tokens = this.createTokens(21)
  }

  /**
  * create token objects for player
  * @param {integer} num: numbers of token objects to be created
  * @return {array} tokenArr: an array of new created token objects
  */
  createTokens (num) {
    const tokenArr = []
    for (let i = 0; i < num; i++) {
      tokenArr.push(new Token(i, this))
    }
    return tokenArr
  }

  /**
   * Check if each player still has tokens 
   * @return {boolean} true or not
   */
  checkTokens() {
    return !(this.unUsedTokens.length === 0)
  }

  /**
   * Get the tokens which havn't been dropped
   * @return {array} an array containing objects of tokens with the property dropped === false
   */
  get unUsedTokens () {
    return this.tokens.filter(ele => !ele.dropped)
  }

  /**
   * Pick an token from the unUsedTokens, and get ready to drop
   * @return {object} choose the first token from the unUsedTokens, make it active
   */
  get activeToken () {
    return this.unUsedTokens[0]
  }
}