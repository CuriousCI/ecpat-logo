let logo, particles = []

function mouseMoved() {
	for (let _ = 0; _ < 5; _++)
		particles.push(
			new Particle(
				createVector(mouseX, mouseY),
				color(logo.get(mouseX, mouseY))
			)
		)
}

function windowResized() {
	logo.resize(0, windowHeight - 20)
	resizeCanvas(logo.width, logo.height)
}

function preload() {
	logo = loadImage('./logo.png')
}

function setup() {
	logo.resize(0, windowHeight - 20)
	createCanvas(logo.width, logo.height)
	noStroke()
}

function draw() {
	particles.forEach(particle => {
		particle.update()
		particle.draw()
	})

	particles.filter(particle => particle.radius > 0)
}

class Particle {
	constructor(position, color) {
		this.position = position
		this.offset = createVector()
		this.radius = random(windowHeight / 100)
		this.color = color
	}

	update() {
		this.radius *= random(0.99, 0.999)
		this.offset.add(random(-.5, .5), random(-.5, .5))
		let rand = createVector(
			noise(this.position.x),
			noise(this.position.y)
		)
		rand.mult(this.offset)
		this.position.add(rand)

		this.color = color(
			logo.get(
				this.position.x,
				this.position.y
			)
		)
	}

	draw() {
		fill(this.color)
		ellipse(
			this.position.x,
			this.position.y,
			this.radius
		)
	}
}