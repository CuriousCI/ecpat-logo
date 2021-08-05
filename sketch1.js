let logo, particles = [];

function preload() {
	logo = loadImage('./logo.png')
}

function setup() {
	createCanvas(logo.width, logo.height)
	noStroke()
	for (let x = 0; x < logo.width; x += 20)
		for (let y = 0; y < logo.height; y += 20)
			particles.push(new Particle(
				createVector(x, y),
				color(logo.get(x, y)),
				color(logo.get(x, y)),
				// random([1, 5, 5, 10, 10, 20, 40, 40, 80])
				random(20)
			));
}

function draw() {
	particles.forEach(particle => {
		particle.update()
		particle.draw()
	});

	particles = particles.filter(particle => particle.radius > 0.001)
}

class Particle {
	constructor(position, color, target, radius) {
		this.position = position
		this.velocity = createVector(
			random([-1, 0, 1]),
			random([-1, 1])
		)
		this.acceleration = createVector()
		this.sin = random(30, 80)

		this.color = color
		this.target = target
		this.radius = radius

		this.id = random(50000)
	}

	update() {
		this.position.add(this.velocity)

		this.velocity.add(this.acceleration)
		this.velocity.mult(0.9995)
		this.velocity.x += sin(
			this.position.x /
			(100 + this.id % 5) /
			this.sin
		)

		this.radius *= 0.99

		// if (!(frameCount + this.id) % 500)
		this.target = color(
			logo.get(
				this.position.x,
				this.position.y
			)
		)

		// this.color = this.target
		this.color = lerpColor(
			this.color,
			this.target,
			0.5
		)
	}

	draw() {
		push()
		translate(this.position)
		fill(this.color)
		ellipse(0, 0, this.radius)
		// if (random() < 0.99)
		pop()
	}
}