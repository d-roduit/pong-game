class Barre {
	constructor({x, y, width, height, dx, color='black', modeAutoplay = false}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
		this.color = color;
		this.modeAutoplay = modeAutoplay;
	}

	draw() {
		c.beginPath();
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		if(this.isModeAutoplayEnabled()) {
			this.autoPlay();
		}
	}

	hasAbilityToMoveLeft() {
		return this.x > 0;
	}

	hasAbilityToMoveRight() {
		return this.x + this.width < canvas.width;
	}

	hasLeftArrowPressed() {
		return 37;
	}

	hasRightArrowPressed() {
		return 39;
	}

	moveLeft() {
		this.x -= this.dx;
	}

	moveRight() {
		this.x += this.dx;
	}

	autoPlay() {
		if(balle.x - (this.width/2) >= 0 && balle.x + (this.width/2) <= canvas.width) {
			this.x = balle.x - (this.width / 2);
		}
	}

	isModeAutoplayEnabled() {
		return this.modeAutoplay;
	}

	enableModeAutoplay() {
		this.modeAutoplay = true;
	}

	disableModeAutoplay() {
		this.modeAutoplay = false;
	}

}