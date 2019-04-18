class Text {
	constructor({text, x, y, fontFamily = 'Segoe UI', fontSize = '30', color = 'black', textAlign = 'center'}) {
		this.text = String(text);
		this.x = x;
		this.y = y;
		this.fontFamily = String(fontFamily);
		this.fontSize = String(fontSize);
		this.color = String(color);
		this.textAlign = String(textAlign);
	}

	write() {
		c.font = this.fontSize + 'px ' + this.fontFamily;
		c.textAlign = this.textAlign;
		c.fillText(this.text, this.x, this.y);
	}
}