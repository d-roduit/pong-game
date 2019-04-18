function clearCanvas() {
	// Efface tout ce qu'il y a dans le canvas
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawObjectsOnCanvas(arrayOfObjectsToDraw) {
	// Dessine tous les objets du jeu puis update la logique pour réagir aux conditions
	for(let objet of arrayOfObjectsToDraw) {
		objet.draw();
	}
}

function updateObjectsOnCanvas(arrayOfObjectsToDraw) {
	for(let objet of arrayOfObjectsToDraw) {
		objet.update();
	}
}


function debugWhenBallTouchBarre2() {
	if(balle.y > barre[1].y - 50) {
		console.log(`
			barre2.x : ${barre[1].x}
			balle.x - balle.radius: ${balle.x - balle.radius}
			balle.x: ${balle.x}
			balle.x + balle.radius: ${balle.x + balle.radius}
			barre2.x + barre2.width : ${barre[1].x + barre[1].width}
			
			balle.y: ${balle.y}
			balle.y + balle.radius: ${balle.y + balle.radius}
			barre2.y: ${barre[1].y}

			balle.dx : ${balle.dx}
			balle.dy : ${balle.dy}
		`);
	}
}