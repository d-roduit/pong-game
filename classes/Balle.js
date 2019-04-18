class Balle {
	constructor({x, y, radius, dx, dy, color = 'black', barre = []}) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.dx = dx;
		this.dy = dy;
		this.vitesseMax = 10;
		this.color = color;
		this.barre = barre;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}


	changeDirection(axe) {
		switch(axe) {
			case 'horizontal':
				this.dx = -this.dx;
				break;
			case 'vertical':
				this.dy = -this.dy;
				break;
		}
	}


	touchBorder(side) {
		switch(side) {
			case 'left':
				return this.x + this.radius >= canvas.width;
			case 'right':
				return this.x - this.radius <= 0;
			case 'top':
				return this.y - this.radius <= 0;
			case 'bottom':
				return this.y + this.radius >= canvas.height;
		}
	}

	touchBarre(barre) {
		switch(barre) {
			case 'barre1':
				return this.x + this.radius > this.barre[0].x && this.x - this.radius < this.barre[0].x + this.barre[0].width && this.y - this.radius < this.barre[0].y + this.barre[0].height;
				break;
			case 'barre2':
				// console.log(this.barre[1]);
				return this.x + this.radius > this.barre[1].x && this.x - this.radius < this.barre[1].x + this.barre[1].width && this.y + this.radius > this.barre[1].y;
				break;
		}
	}

	update() {
		// Si la balle touche à gauche ou à droite, elle rebondit
		if(this.touchBorder('left') || this.touchBorder('right')) {
			this.changeDirection('horizontal');
		}

		// Si la balle touche la barre du joueur 1 (joueur d'en haut)
		if(this.touchBarre('barre1')) {
			this.changeDirection('vertical');

			if(this.barre[0].width > 20) {
				this.barre[0].width--;
			}

		}

		// Si la balle touche la barre du joueur 2 (joueur d'en bas)
		if(this.touchBarre('barre2')) {
			this.changeDirection('vertical');

			if(this.barre[1].width > 20) {
				this.barre[1].width--;
			}
		}


		// Si la balle touche le haut ou le bas
		if(this.touchBorder('top') || this.touchBorder('bottom')) {

		} else {
			this.x += this.dx;
			this.y += this.dy;
		}
	}
}
