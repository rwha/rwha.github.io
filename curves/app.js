'use strict';
var card, curves = {};

curves.meta = {
	astroid: {
		type: "parametric",
		title: "Astroid",
		equation: "\\begin{aligned} x \&= a \\cos^3(t) \\\\[0.75ex] y \&= a \\sin^3(t)\\end{aligned}",
		draw: function(t) {
			var a = 9;
			var ci = Math.cos(t);
			var si = Math.sin(t);
			var xi = a * ci * ci * ci;
			var yi = a * si * si * si;
			return {x: xi, y: yi};
		}
	},
	bicorn: {
		type: "parametric",
		title: "Bicorn",
		equation: "\\begin{aligned} x \&= a \\cos(t) \\\\[0.75ex] y \&= \\frac{\\sin^2(t)}{2 + \\sin(t)}\\end{aligned}",
		draw: function(t) {
			var a = 9;
			var sin = Math.sin(t);
			var xi = a * Math.cos(t);
			var yi = a * (sin*sin)/(2 + sin);
			return {x: xi, y: yi};
		}
	},
	cardiod: {
		type: "polar",
		title: "Cardiod",
		equation: "r = 2a(1+\\cos\\theta); a=2",
		draw: function(t) {
			var a = 2;
			var s = Math.sin(t);
			var c = Math.cos(t);
			var r = 2 * a * (1 + c); 
			return {x: (r * c), y: (r * s)};
		}
	},
	cayleysSextic: {
		type: "polar",
		title: "Cayley's Sextic",
		max: 3,
		equation: "r = 4a\\cos^3(\\frac{\\theta}{3}); a=2",
		draw: function(t) {
			var a = 2;
			var c = Math.cos(t/3);
			var r = 4 * a * c * c * c
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cissoidOfDiocles: {
		type: "polar",
		title: "Cissoid of Diocles",
		equation: "r = 2a \\tan\\theta\\ sin\\theta; a=2",
		draw: function(t) {
			var a = 2;
			var r = 2 * a * Math.tan(t) * Math.sin(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cochleoid: {
		type: "polar",
		title: "Cochleoid",
		max: 6,
		equation: "r = \\frac{a \\sin\\theta}{\\theta}; a=9", //; 0\\leq\\theta\\leq6\\pi",
		draw: function(t) {
			var a = 9;
			var r = a * Math.sin(t)/t;
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	conchoid: {
		type: "polar",
		title: "Conchoid",
		equation: "r = a + b\\sec\\theta; a=5, b=2", //; 0\\leq\\theta\\leq2\\pi",
		draw: function(t) {
			var a = 5;
			var b = 2;
			var r = a + b/Math.cos(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	conchoidOfDeSluze: {
		type: "polar",
		title: "Conchoid of DeSluze",
		equation: "r = \\frac{k^2\\cos^2\\theta-a^2}{\\cos\\theta}; a=1, k=2.5",
		draw: function(t) {
			var a = 1;
			var k = 2.5;
			var c = Math.cos(t);
			var r = (k * k * c * c - a * a)/c;
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cycloid: {
		type: "parametric",
		title: "Cycloid",
		equation: "\\begin{aligned} x \&= t - \\sin t \\\\[0.75ex] y \&= 1 - \\cos t\\end{aligned}",
		draw: function(t) {
			var a = 1;
			var h = 1;
			var xi = a * t - h * Math.sin(t);
			var yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	curateCycloid: {
		type: "parametric",
		title: "Cycloid (curate)",
		equation: "\\begin{aligned} x \&= 2t - \\sin t \\\\[0.75ex] y \&= 2 - \\cos t\\end{aligned}",
		draw: function(t) {
			var a = 2;
			var h = 1;
			var xi = a * t - h * Math.sin(t);
			var yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	prolateCycloid: {
		type: "parametric",
		title: "Cycloid (prolate)",
		equation: "\\begin{aligned} x \&= t - 2\\sin t \\\\[0.75ex] y \&= 1 - 2\\cos t\\end{aligned}",
		draw: function(t) {
			var a = 1;
			var h = 2;
			var xi = a * t - h * Math.sin(t);
			var yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	epicycloid: {
		type: "parametric",
		title: "Epicycloid",
		max: 20,
		equation: "\\begin{aligned} x \&= (a+b) \\cos t - b \\cos((\\frac{a}{b} + 1)t) \\\\[0.75ex] y \&= (a+b) \\sin t - b \\sin((\\frac{a}{b}+1)t)\\end{aligned}",
		draw: function(t) {
			var a = 4.5, b = 2;
			var xi = (a + b) * Math.cos(t) - b * Math.cos((a/b + 1) * t);
			var yi = (a + b) * Math.sin(t) - b * Math.sin((a/b + 1) * t);
			return {x: xi, y: yi};
		}
	},
	epitrochoid: {
		type: "parametric",
		title: "Epitrochoid",
		max: 20,
		equation: "\\begin{aligned} x \&= (a+b) \\cos t - c \\cos((\\frac{a}{b} + 1)t) \\\\[0.75ex] y \&= (a+b) \\sin t - c \\sin((\\frac{a}{b}+1)t)\\end{aligned}",
		draw: function(t) {
			var a = 4.5, b = 2, c = 3;
			var xi = (a + b) * Math.cos(t) - c * Math.cos((a/b + 1) * t);
			var yi = (a + b) * Math.sin(t) - c * Math.sin((a/b + 1) * t);
			return {x: xi, y: yi};
		}
	},
	foliumOfDescartes: {
		type: "polar",
		title: "Folium of Descartes",
		equation: "r = \\frac{3a\\sin\\theta \\cos\\theta}{\\sin^3\\theta + \\cos^3\\theta}",
		draw: function(t) {
			var a = 3;
			var s = Math.sin(t);
			var c = Math.cos(t);
			var r = 3 * a * s * c/((s * s * s) + (c * c * c));
			return {x: (r * c), y: (r * s)};
		}
	},
	hypocycloid: {
		type: "parametric",
		title: "Hypocycloid",
		equation: "\\begin{aligned} x \&= (a-b)\\cos t + b\\cos((\\frac{a}{b}-1)t) \\\\[0.75ex] y \&= (a-b)\\sin t - b\\sin((\\frac{a}{b}-1)t)\\end{aligned}",
		draw: function(t) {
			var a = 9;
			var b = 5.4;
			var xi = (a-b) * Math.cos(t) + b * Math.cos((a/b-1)*t);
			var yi = (a-b) * Math.sin(t) - b * Math.sin((a/b-1)*t)
			return {x: xi, y: yi};
		}
	},
	hypotrochoid: {
		type: "parametric",
		title: "Hypotrochoid",
		max: 47,
		equation: "\\begin{aligned} x \&= (a-b)\\cos t + c\\cos((\\frac{a}{b}-1)t) \\\\[0.75ex] y \&= (a-b)\\sin t - c\\cos((\\frac{a}{b}-1)t)\\end{aligned}",
		draw: function(t) {
			var a = 10, b = 14, c = 4.4;
			var xi = (a - b) * Math.cos(t) + c * Math.cos((a/b - 1) * t);
			var yi = (a - b) * Math.sin(t) - c * Math.sin((a/b - 1) * t);
			return {x: xi, y: yi};
		}
	},
	limacon: {
		type: "polar",
		title: "Limaçon",
		equation: "r = a + b\\cos t",
		draw: function(t) {
			var r = 3 + 6 * Math.cos(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		},
	},
	parabola: {
		type: "parametric",
		title: "Parabola",
		equation: "y = ax^2 + bx + c",
		draw: function(t){
			return {x: t, y: (t * t)};
		},
	},
	newtonsParabola: {
		type: "polar",
		title: "Newton's Parabolas**",
		//max: 4,
		equation: "ay^2 = x(x^2 - 2bx + c), a > 0",
		draw: function(t) {
			var a = 8;
			var b = -4;
			var c = 5;
			var y = Math.sin(t);
			var x = Math.cos(t);
			var r = (x * (x * x + 2 * b * x + c))/(a * y * y);
			//var r = (x * x * x -  2 * a * x * x - x + a)/(y * y);
			return {x: (r * x), y: (r * y)};
		}
	},
	cassinianOvals: {
		type: "polar",
		title: "Cassinian Ovals**",
		//max: 4,
		equation: "(x^2 + y^2)^2 - 2a^2(x^2-y^2) + a^4 - c^4 = 0",
		draw: function(t) {
			var a = 1;
			var c = 1.5;
			var y = Math.sin(t);
			var x = Math.cos(t);
			var x2 = Math.pow(x, 2);
			var y2 = Math.pow(y, 2);
			var r = (Math.pow((x2 + y2), 2) + Math.pow(a, 4) - Math.pow(c, 4))/(a * a * 2 * (x2 - y2));
			return {x: (r * x), y: (r * y)};
		}
	},
	/*
	tridentOfNewton: {
		type: "parametric",
		title: "Trident of Newton",
		//max: 20,
		draw: function(t) {
			//var s = t; // - 3;
			var a = 0.1, b = 0.2, c = 0.3, d = 0.4;
			//var xi = s * (s * s - 2 * b * s + c);
			var yi = a * t * t * t + b * t * t  + c * t + d;
			return {x: t, y: yi*t};
		}
	},	
	*/
	
};

curves.Card = function() {
	this.canvas = (function(){
		var cvs = document.createElement('canvas');
		cvs.height = cvs.width = 1000;
		can.appendChild(cvs);
		return cvs;
	}());
	
	(function(c){
		var t = document.getElementById('tiles');
		var frag = document.createDocumentFragment();
		Object.keys(c).forEach(function(k){
			var p = document.createElement('div');
			p.textContent = c[k].title;
			p.className = 'parent';
			p.setAttribute('id', k);
			frag.appendChild(p);
		});
		t.appendChild(frag);
		Array.prototype.forEach.call(t.childNodes, function(n){
			var nc = n;
			nc.addEventListener('click', function(e){
				e.stopPropagation();
				var s = document.getElementsByClassName('selected')[0];
				if(s) s.className = 'parent'; 
				this.className = 'selected';
				card.draw(this.id);
			});
		});
	}(curves.meta));
}

curves.Card.prototype.parametric = function(curve) {
	var x,y,xi,yi,tos,los,started = false;
	var ctx = this.canvas.getContext('2d');
	var max = curve.max || 10;
	ctx.beginPath();
	for (var s = -10; s <= max; s += 0.01) {
		var points = curve.draw(s);
		x = points.x;
		y = points.y;
		xi = ((x+10)/20)*1000;
		yi = ((10-y)/20)*1000;
		if(!started) { started = true; ctx.moveTo(xi,yi); }
		tos = (xi>0 && xi<1000 && yi>0 && yi<1000);
		if(los || tos) {
			ctx.lineTo(xi,yi);
		} else {
			ctx.moveTo(xi,yi);
		}
		los=tos;
	}
	ctx.shadowColor = ctx.strokeStyle = 'green';
	ctx.stroke();
}

curves.Card.prototype.polar = function(curve) {
	var r,x,y,xi,yi,tos,los,started=false;
	var ctx = this.canvas.getContext('2d');
	var max = (curve.max || 2) * Math.PI;
	ctx.beginPath();
	for (var theta = 0; theta <= max; theta += 0.01) {
		r = curve.draw(theta);
		x = r.x;
		y = r.y;
		xi = ((x+10)/20)*1000;
		yi = ((10-y)/20)*1000;
		if(!started) { started = true; ctx.moveTo(xi,yi); }
		tos = (xi>0 && xi<1000 && yi>0 && yi<1000);
		if(los || tos) {
			ctx.lineTo(xi,yi);
		} else {
			ctx.moveTo(xi,yi);
		}
		los=tos;
	}
	ctx.shadowColor = ctx.strokeStyle = 'red';
	ctx.stroke();
}

curves.Card.prototype.resetCanvas = function() {
	var ctx = this.canvas.getContext('2d');
	ctx.clearRect(0,0,1000,1000);
	ctx.beginPath();
	ctx.moveTo(0, 500);
	ctx.lineTo(1000, 500);
	ctx.moveTo(500, 0);
	ctx.lineTo(500, 1000);
	ctx.strokeStyle = '#aaa';
	ctx.shadowBlur = 0;
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.beginPath();
	for (var i = 50; i <= 950; i += 50) {
		ctx.moveTo(i,0);
		ctx.lineTo(i,1000);
		ctx.moveTo(0,i);
		ctx.lineTo(1000,i);
	}
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.lineWidth = 2;
	ctx.shadowBlur = 1;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
}

curves.Card.prototype.draw = function(name) {
	var eq = document.getElementById('eq');
	eq.style.display = 'block';
	var can = document.getElementById('can');
	if(!curves.meta[name]) {
		console.error('unknown curve: ' + name);
		return;
	}
	var anim = can.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-120%)'}], {duration: 150, fill: 'forwards'});
	anim.onfinish = returnCan;
	function returnCan() {
		card.resetCanvas();
		switch (curves.meta[name].type) {
			case 'parametric':
				card.parametric(curves.meta[name]);
				break;
			case 'polar':
				card.polar(curves.meta[name]);
				break;
			default:
				console.log('unknown function type: ' + curves.meta[name].type);
		}
		var dm = window.location.hash.substring(1);
		katex.render(curves.meta[name].equation, eq, { displayMode: (dm || false)});
		can.animate([{transform: 'translateX(-120%)'}, {transform: 'translateX(0)'}], {duration: 150, fill: 'forwards'});
	}
}

window.onload = function() {
	card = new curves.Card();
	document.getElementById('tiles').firstChild.click();
}

