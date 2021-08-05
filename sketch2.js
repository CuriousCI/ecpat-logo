let logo, particles = []

function preload() {
	logo = loadImage('./logo.png')
}

function setup() {
	createCanvas(logo.width, logo.height)
	noStroke()
}

function draw() {

	particles.forEach(particle => {
		particle.update()
		particle.draw()
	})

	particles.filter(particle => particle.radius > 0)

	for (_ = 0; _ < 5; _++)
		particles.push(
			new Particle(
				createVector(
					mouseX, mouseY
					// random(logo.width),
					// random(logo.height)
				)
			)
		)
}

class Particle {
	constructor(position, color) {
		this.position = position
		this.offset = createVector()

		this.radius = random(20)
		this.color = color
	}

	update() {
		this.radius *= 0.99999
		this.offset.add(random(-0.5, 0.5), random(-0.5, 0.5))
		const rand = createVector(
			noise(this.position.x) * this.offset.x,
			noise(this.position.y) * this.offset.y
		)
		this.position.add(rand)

		this.color = color(logo.get(this.position.x, this.position.y))
	}

	draw() {
		fill(this.color)
		ellipse(this.position.x, this.position.y, this.radius)
	}
}