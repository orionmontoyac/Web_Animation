class Vector2 {
  constructor( x, y ) {
    this.x = x
    this.y = y
  }

  getAngle() {
    return Math.atan2( this.y, this.x )
  }

  setAngle( angle ) {
		const length = this.getLength()
		this.x = Math.cos( angle ) * length
		this.y = Math.sin( angle ) * length
	}

  getLength() {
    return Math.sqrt( this.x * this.x + this.y * this.y )
  }

  setLength( length ) {
    const angle = this.getAngle()
		this.x = Math.cos( angle ) * length
		this.y = Math.sin( angle ) * length
  }
}

class Planet extends Vector2 {
  constructor( position, radius, color, speed, direction, orbitDiameter ) {
    super( position.x, position.y )

    this.x += orbitDiameter || 0

    this.radius = radius
    this.color = color
    this.velocity = new Vector2( 0, 0 )
    this.velocity.setLength( speed )
    this.velocity.setAngle( direction )
    this.mass = 0
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  angleTo( planet ) {
    return Math.atan2( planet.y - this.y, planet.x - this.x )
  }

  distanceTo( planet ) {
    const dx = planet.x - this.x
    const dy = planet.y - this.y

    return Math.sqrt( dx * dx + dy * dy )
  }

  gravitateTo( planet ) {
    let gravity = new Vector2( 0, 0 )
    let distance = this.distanceTo( planet )

    gravity.setLength( planet.mass / ( distance * distance ) )
    gravity.setAngle( this.angleTo( planet ) )

    this.velocity.x += gravity.x
    this.velocity.y += gravity.y
  }
}

class Experience {
  constructor( container ) {
    console.clear()

    this.canvas = document.createElement( 'canvas' )
    container.appendChild( this.canvas )
    this.context = this.canvas.getContext( '2d' )

    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.planetsNumber = 2000
    this.planets = []

    this.clear = true
    this.resize()
    this.bind()
    this.init()
  }

  init() {
    this.star = new Planet( this.center, 100, 'white', 0, 0 )
    this.star.mass = 15000
    this.planets.push( this.star )

    this.loop()
  }

  bind() {
    window.addEventListener( 'resize', this.resize.bind( this ), false )
  }

  render() {
    if( this.planets.length < this.planetsNumber ) {
      const speed = Math.random() * 4 + 8
      const orbitDiameter = speed * 25
      const planet = new Planet( { 'x': this.star.x, 'y': this.star.y }, 5, getRandomColor(), speed, -Math.PI / 2, orbitDiameter )
      this.planets.push( planet )
    }

    for( let planet of this.planets ) {
      if( planet.mass === 0 ) {
        planet.gravitateTo( this.star )
        planet.update()
      }

      this.context.beginPath()
      this.context.arc( planet.x, planet.y, planet.radius, 0, Math.PI * 2, true )
      this.context.fillStyle = planet.color
      this.context.fill()
      this.context.closePath()
    }
  }

  loop() {
    this.raf = window.requestAnimationFrame( this.loop.bind( this ) )

    const now = Date.now()
    const delta = now - this.then

    if( delta > this.fpsInterval ) {
      if( this.clear === true ) {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height )
      }
      this.render()
      this.then = now
    }
  }

  toggleClear() {
    this.clear = !this.clear
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.center = {
      'x': this.canvas.width / 2,
      'y': this.canvas.height / 2
    }

    this.reset()
  }

  reset() {
    window.cancelAnimationFrame( this.raf )
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height )
    this.loop()
  }
}

const getRandomColor = () => {
  const value = Math.floor( Math.random() * 255 )
  return '#' + value.toString( 16 ) + value.toString( 16 ) + value.toString( 16 )
}

const container = document.getElementById( 'canvas' )
let experience = new Experience( container )

const toggleClearButton = document.getElementById( 'toggleClear' )
toggleClearButton.addEventListener( 'click', ( e ) => {
  experience.toggleClear()
}, false )
