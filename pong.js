
let canvas = document.getElementsByTagName('canvas')[0];
let startButton = document.getElementsByTagName('button')[0];

/*-----------------
>>> CANVAS
-----------------*/
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 1.5;

let c = canvas.getContext('2d');


let objetsADessiner = [];
let barre = [];
let balle;


function createGameObjects() {
	// Caractéristiques des barres des joueurs
	let barre1Settings = {
		width: 40,
		height: 5,
		get x() { return (canvas.width / 2) - (this.width / 2) },
		y: 5,
		dx: 10,
		modeAutoplay: true
	}

	let barre2Settings = {
		width: 40,
		height: 5,
		get x() { return (canvas.width / 2) - (this.width / 2) },
		get y() { return canvas.height - (barre1Settings.y + this.height) },
		dx: 10
	}

	// Créé la barre du joueur 1
	barre[0] = new Barre(barre1Settings);

	// Créé la barre du joueur 2
	barre[1] = new Barre(barre2Settings);

	// Caractéristiques de la balle
	let balleSettings = {
		x: canvas.width / 2,
		y: 50,
		radius: 5,
		dx: Math.floor(Math.random() * (3.4 - (-3.4) + 1)) + (-3.4),
		dy: 3.4,
		barre
	}

	// Créé la balle
	balle = new Balle(balleSettings);

	// Vide le tableau des objets qui ont toujours leurs anciennes caractéristiques (placement, etc)
	objetsADessiner = [];

	// Met les barres et la balle dans la liste des objets à dessiner
	objetsADessiner.push(barre[0]);
	objetsADessiner.push(barre[1]);
	objetsADessiner.push(balle);

}


// Déplacer la barre 2
window.addEventListener('keydown', (event) => {
	switch(event.keyCode) {
		case barre[1].hasLeftArrowPressed():
			if(barre[1].hasAbilityToMoveLeft()) {
				barre[1].moveLeft();
			}
			break;

		case barre[1].hasRightArrowPressed():
			if(barre[1].hasAbilityToMoveRight()) {
				barre[1].moveRight();
			}
			break;
	}
});



function countBeforeGameStart(timer) {
	return new Promise((resolve, reject) => {
		let timeInterval = setInterval(() => {
			// On remet à zéro le canvas
			clearCanvas();
			
			// On dessine tous les objets dans le canvas
			drawObjectsOnCanvas(objetsADessiner);

			// Si le timer est à 0, on veut afficher le texte "Start"
			timer = (timer === 0) ? 'Start' : timer;

			// Caractéristiques du texte
			let timerTextSettings = {
				text: timer,
				x: canvas.width / 2,
				y: canvas.height / 2 
			}

			let timerText = new Text(timerTextSettings);
			timerText.write();
		  
			if(timer === 'Start') {
				// On arrête la boucle du timer
				clearInterval(timeInterval);

				// On resolve la promesse 1 seconde après la fin du timer pour exécuter le .then()
				setTimeout(() => resolve(), 1000);
			}

			timer--;
		}, 1000);
	});
}



function launchGame() {
	clearCanvas();

	updateObjectsOnCanvas(objetsADessiner);

	drawObjectsOnCanvas(objetsADessiner);
	

	// Fonction de debug pour connaitre les positions de la balle et de la barre[1]
	// debugWhenBallTouchBarre2();

	let game = requestAnimationFrame(launchGame);
	
	if(balle.touchBorder('bottom') || balle.touchBorder('top')) {
		cancelAnimationFrame(game);

		let endOfGameTextSettings = {
				text: '',
				x: canvas.width / 2,
				y: (canvas.height / 2) + 15
			}

		let endOfGameText = new Text(endOfGameTextSettings);

		if(balle.touchBorder('bottom')) {
			endOfGameText.text = 'Perdu !';
		} else if(balle.touchBorder('top')) {
			endOfGameText.text = 'Gagné !';
		}

		endOfGameText.write();
	}
}


// Créer les objets à afficher
createGameObjects();

// Dessine tous les objets du jeu puis update la logique pour réagir aux conditions
drawObjectsOnCanvas(objetsADessiner);

// Cliquer sur le bouton pour commencer à jouer
startButton.addEventListener('click', () => {
	clearCanvas();

	createGameObjects();

	drawObjectsOnCanvas(objetsADessiner);

	countBeforeGameStart(3)
		.then(launchGame);
});




/**
 * À faire
 * 
	[] La barre1 joue toute seule
	[] Faire en sorte que la balle puisse partir soit en haut soit en bas au début
	
 */




