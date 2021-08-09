class Board {
  constructor () {
    this.columns = 7
    this.rows = 6
    this.spaces = this.createSpace()
  }

  /*
  Create a 2D array of the gord of the board
  @return {array} spaceArr: the coordinate of each space object
  */
  createSpace () {
    const spaceArr = []
    for (let x = 0; x < this.columns; x++) {
      const spaceRow = []
      for (let y = 0; y < this.rows; y++){
        spaceRow.push(new Space(x, y))
      }
      spaceArr.push(spaceRow)
    }
    return spaceArr
  }

  /**
   * render board on page
   */
  drawHtmlBoard () {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++){
        this.spaces[x][y].drawSVGSpace()
      }
    }
  }
}