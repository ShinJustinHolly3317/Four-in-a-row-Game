class Space {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.id = `space-${x}-${y}`
    this.token = null
    this.diameter = 76
    this.radius = this.diameter / 2
  }

  /**
   * render Space
   */
  drawSVGSpace() {
    const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    svgSpace.setAttributeNS(null, "id", this.id);
    svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "r", this.radius - 8);
    svgSpace.setAttributeNS(null, "fill", "black");
    svgSpace.setAttributeNS(null, "stroke", "none");
    
    document.getElementById("mask").appendChild(svgSpace);  
  }

  /**
   * Update a space to reflext the token dropped into it
   * @param {object} token the dropped token
   */
  mark (token) {
    this.token = token
  }

  /**
   * Get the owner of this space
   * @param {object} space the selected space object 
   * @return {object} owner of the space, or null
   */
  get owner () {
    if (this.token) {
      return this.token.owner
    } else {
      return null
    }
  }
}