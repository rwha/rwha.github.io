var playing = false;
var colors = ['red','green','blue','yellow'];
var sequence = [];
var clicked = [];

function createButton(parent, color) {
	var b = document.createElement('button');
	b.className += "game-button " + color;
	b.id = color;
	b.addEventListener('click', btnClicked, false);
	parent.appendChild(b);
}

function btnClicked() {
	var self = this;
	//self.style.opacity = 1;
	//window.setTimeout(function() {
	//	self.style.opacity = 0.5;
	//}, 500);
	if(playing) {
		clicked.push(self.id);
		if(clicked[clicked.length-1] !== sequence[clicked.length-1]) {
			console.log('game over');
			
		}
		if(clicked.length === sequence.length && clicked[clicked.length-1] === sequence[sequence.length-1]) {
			playing = false;
			var t = new Date().getTime() + 500;
			var v = 0;
			while (new Date().getTime() < t) {
				v++;
			}
			computerTurn();
		} else {
			//console.log('c: ', clicked);
			//console.log('s: ', sequence);
		}
		
	}
}

function createBoard(x,y) {
	var x = x || 2;
	var y = y || 2;
	var grid = x * y;
	var width = document.body.offsetWidth;
	var height = document.body.offsetHeight;
	for (var i=0;i<grid;i++) {
		var d = document.createElement('div');
		d.style.width = (width/x - 20) + 'px';
		d.style.height = (height/y - 20) + 'px';
		d.className = 'button-parent';
		createButton(d,colors[i]);
		document.body.appendChild(d);
	}
}

function computerTurn() {
	sequence.push(colors[Math.floor(Math.random()*colors.length)]);
	(function flashButtons(i) {
			var t = new Date().getTime() + 2000;
			var v = 0
			while (new Date().getTime() < t){
				v++;
			}

		document.getElementById(sequence[sequence.length - i]).style.opacity = 1;
		setTimeout(function() {
			document.getElementById(sequence[sequence.length - i]).style.opacity = 0.5;
			if(--i) {
				flashButtons(i); 
			} else {
				playerTurn();
			}
		}, 300);
	})(sequence.length);
}

function playerTurn() {
	console.log(sequence);
	playing = true;
	clicked = [];
}