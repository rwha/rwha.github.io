
'use strict';
var curves = {};
var card;

curves.meta = {
	astroid: {
		type: "parametric",
		title: "Astroid",
		equation: "\\begin{aligned} x \&= a \\cos^3(t) \\\\[1.5ex] y \&= a \\sin^3(t)\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 9,
				ci = Math.cos(t),
				si = Math.sin(t),
				xi = (a * ci * ci * ci),
				yi = (a * si * si * si);
			return {x: xi, y: yi};
		}
	},
	bicorn: {
		type: "parametric",
		title: "Bicorn",
		equation: "\\begin{aligned} x \&= a \\cos(t) \\\\[1.5ex] y \&= \\frac{\\sin^2(t)}{2 + \\sin(t)}\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 9,
				sin = Math.sin(t),
				xi = a * Math.cos(t),
				yi = a * (sin*sin)/(2 + sin);
			return {x: xi, y: yi};
		}
	},
	cardiod: {
		type: "polar",
		title: "Cardiod",
		equation: "r = 2a(1+\\cos\\theta)",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 2,
				s = Math.sin(t),
				c = Math.cos(t),
				r = 2 * a * (1 + c);
			return {x: (r * c), y: (r * s)};
		}
	},
	catenary: {
		type: "parametric",
		title: "Catenary",
		equation: "y = a\\cosh(\\frac{x}{a})",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 3;
			return {x: t, y: (Math.cosh(t/a))};
		}
	},
	cayleysSextic: {
		type: "polar",
		title: "Cayley's Sextic",
		equation: "r = 4a\\cos^3(\\frac{\\theta}{3})",
        min: 0,
        max: (3 * Math.PI),
		draw: function (t) {
			var a = 2,
				c = Math.cos(t/3),
				r = (4 * a * c * c * c);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cissoidOfDiocles: {
		type: "parametric",
		title: "Cissoid of Diocles",
		equation: "r = 2a \\tan\\theta\\sin\\theta",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 2,
				r = 2 * a * Math.tan(t) * Math.sin(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cochleoid: {
		type: "polar",
		title: "Cochleoid",
		equation: "\\displaystyle r = \\frac{a \\sin\\theta}{\\theta}", 
        min: 0,
        max: (6 * Math.PI),
		draw: function (t) {
			var a = 9,
				r = a * Math.sin(t)/t;
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	conchoid: {
		type: "parametric",
		title: "Conchoid",
		equation: "r = a + b\\sec\\theta",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 5,
				b = 2,
				r = a + b/Math.cos(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	conchoidOfDeSluze: {
		type: "polar",
		title: "Conchoid of DeSluze",
		equation: "a(r\\cos\\theta + a) = k^2\\cos^2\\theta",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 1,
				k = 2.5,
				c = Math.cos(t),
				r = (k * k * c * c - a * a)/c;
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		}
	},
	cycloid: {
		type: "parametric",
		title: "Cycloid",
		equation: "\\begin{aligned} x \&= t - \\sin t \\\\[1.5ex] y \&= 1 - \\cos t\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 1,
				h = 1,
				xi = a * t - h * Math.sin(t),
				yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	curateCycloid: {
		type: "parametric",
		title: "Cycloid (curate)",
		equation: "\\begin{aligned} x \&= 2t - \\sin t \\\\[1.5ex] y \&= 2 - \\cos t\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 2,
				h = 1,
				xi = a * t - h * Math.sin(t),
				yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	prolateCycloid: {
		type: "parametric",
		title: "Cycloid (prolate)",
		equation: "\\begin{aligned} x \&= t - 2\\sin t \\\\[1.5ex] y \&= 1 - 2\\cos t\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 1,
				h = 2,
				xi = a * t - h * Math.sin(t),
				yi = a - h * Math.cos(t);
			return {x: xi, y: yi};
		}
	},
	doubleFolium: {
		type: "polar",
		title: "Double Folium",
		equation: "r = 4a\\cos\\theta\\sin^2\\theta",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 6,
				r = 4 * a * Math.cos(t) * Math.sin(t) * Math.sin(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		},
	},
	ellipse: {
		type: "parametric",
		title: "Ellipse",
		equation: "\\begin{aligned} x \&= a \\cos(t) \\\\[1.5ex] y \&= b \\sin(t)\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 9,
				b = 5;
			return {x: (a * Math.cos(t)), y: (b * Math.sin(t))};
		}
	},
	epicycloid: {
		type: "parametric",
		title: "Epicycloid",
		equation: "\\begin{aligned} x \&= (a+b) \\cos t - b \\cos((\\frac{a}{b} + 1)t) \\\\[1.5ex] y \&= (a+b) \\sin t - b \\sin((\\frac{a}{b}+1)t)\\end{aligned}",
        min: -10,
        max: 20,
		draw: function (t) {
			var a = 4.5, b = 2,
				xi = (a + b) * Math.cos(t) - b * Math.cos((a/b + 1) * t),
				yi = (a + b) * Math.sin(t) - b * Math.sin((a/b + 1) * t);
			return {x: xi, y: yi};
		}
	},
	epitrochoid: {
		type: "parametric",
		title: "Epitrochoid",
		equation: "\\begin{aligned} x \&= (a+b) \\cos t - c \\cos((\\frac{a}{b} + 1)t) \\\\[1.5ex] y \&= (a+b) \\sin t - c \\sin((\\frac{a}{b}+1)t)\\end{aligned}",
        min: -10,
        max: 20,
		draw: function (t) {
			var a = 4.5, 
				b = 2, 
				c = 3,
				xi = (a + b) * Math.cos(t) - c * Math.cos((a/b + 1) * t),
				yi = (a + b) * Math.sin(t) - c * Math.sin((a/b + 1) * t);
			return {x: xi, y: yi};
		}
	},
	equiangularSpiral: {
		type: "polar",
		title: "Equiangular Spiral",
		equation: "r = a\\exp(\\theta \\cot b)",
		min: 0,
		max: (8 * Math.PI),
		draw: function (t) {
			var a = 0.1,
				s = Math.sin(t),
				c = Math.cos(t),
				//b = 7 * Math.PI / 16,
				r = a * Math.exp(t * 0.198912367); //1/Math.tan(b)
			return {x: (r * c), y: (r * s)};
		}
	},
	foliumOfDescartes: {
		type: "parametric",
		title: "Folium of Descartes",
		equation: "x^3 + y^3 = 3axy",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 3,
				s = Math.sin(t),
				c = Math.cos(t),
				r = 3 * a * s * c/((s * s * s) + (c * c * c));
			return {x: (r * c), y: (r * s)};
		}
	},
	freethsNephroid: {
		type: "polar",
		title: "Freeth's Nephroid",
		equation: "r = a(1 + 2\\sin(\\frac{\\theta}{2}))",
        min: 0,
        max: (4 * Math.PI),
		draw: function (t) {
			var a = 3,
				s = Math.sin(t),
				c = Math.cos(t),
				r = a * (1 + 2 * Math.sin(t/2));
			return {x: (r * c), y: (r * s)};
		}
	},
	frequencyCurve: {
		type: "parametric",
		title: "Frequency Curve",
		equation: "y = \\sqrt(2\\pi\\exp(\\frac{-x^2}{2}))",
        min: -10,
        max: 10,
		draw: function (t) {
			var yi = Math.sqrt(2 * Math.PI * Math.exp((t * t)/-2));
			return {x: t, y: yi};
		}
	},
	hypocycloid: {
		type: "parametric",
		title: "Hypocycloid",
		equation: "\\begin{aligned} x \&= (a-b)\\cos t + b\\cos((\\frac{a}{b}-1)t) \\\\[1.5ex] y \&= (a-b)\\sin t - b\\sin((\\frac{a}{b}-1)t)\\end{aligned}",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 9,
				b = 5.4,
				xi = (a-b) * Math.cos(t) + b * Math.cos((a/b-1)*t),
				yi = (a-b) * Math.sin(t) - b * Math.sin((a/b-1)*t);
			return {x: xi, y: yi};
		}
	},
	hypotrochoid: {
		type: "parametric",
		title: "Hypotrochoid",
		equation: "\\begin{aligned} x \&= (a-b)\\cos t + c\\cos((\\frac{a}{b}-1)t) \\\\[1.5ex] y \&= (a-b)\\sin t - c\\cos((\\frac{a}{b}-1)t)\\end{aligned}",
        min: -10,
        max: 47,
		draw: function (t) {
			var a = 10, 
				b = 14, 
				c = 4.4,
				xi = (a - b) * Math.cos(t) + c * Math.cos((a/b - 1) * t),
				yi = (a - b) * Math.sin(t) - c * Math.sin((a/b - 1) * t);
			return {x: xi, y: yi};
		}
	},
	limacon: {
		type: "polar",
		title: "Limaçon",
		equation: "r = a + b\\cos t",
        min: 0,
        max: (2 * Math.PI),
		draw: function (t) {
			var a = 3,
				b = 6,
				r = a + b * Math.cos(t);
			return {x: (r * Math.cos(t)), y: (r * Math.sin(t))};
		},
	},
	parabola: {
		type: "parametric",
		title: "Parabola",
		equation: "y = ax^2 + bx + c",
        min: -10,
        max: 10,
		draw: function (t) {
			var a = 1,
				b = 0,
				c = 0;
			return {x: t, y: (t * t + b * t + c)};
		},
	},
};



(function () {
	
	var bg = {};
	bg.parametric = new Image(1000, 1000);
	bg.parametric.src = 'parametric.svg';
	bg.polar = new Image(1000, 1000);
	bg.polar.src = 'polar.svg';

	var Card = function () {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		var t = document.getElementById('tiles');
		
		var frag = document.createDocumentFragment();
		Object.keys(curves.meta).forEach(function (k){
			var p = document.createElement('div');
			p.textContent = curves.meta[k].title;
			p.className = 'parent';
			p.setAttribute('id', k);
			frag.appendChild(p);
		});
		t.appendChild(frag);
		this.clicker = function (e) {
			e.stopPropagation();
			var s = document.getElementsByClassName('selected')[0];
			if(s) s.className = 'parent'; 
			e.target.className = 'selected';
			this.draw(e.target.id);
		}
		
		for (var i = 0, l = t.childNodes; i < l.length; i++) {
			var nc = l[i];
			nc.addEventListener('click', this.clicker.bind(this), false);
		}
	}

	Card.prototype.draw = function (name) {
		var curve;
		
		if(!curves.meta[name]) {
			console.error('unknown curve: ' + name);
			return;
		} else {
			curve = curves.meta[name];
		}
		
		var ctx = this.ctx;
		var canvas = this.canvas;
		var can = document.getElementById('can');

		if ("animate" in can) {
			var anim = can.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-120%)'}], {duration: 150, fill: 'forwards'});
			anim.onfinish = returnCan.bind(this);
		} else {
			try {
				returnCan();
			} catch(e) {
				console.log(e);
			}
		}
		
		function returnCan () {
			var eq = document.getElementById('eq');
			ctx.save();
			eq.style.display = 'block';
			ctx.clearRect(0,0,1000,1000);
			ctx.drawImage(bg[curve.type], 0, 0, 1000, 1000);
			can.style.borderRadius = (curve.type === "parametric") ? 0 : '100%';
			canvas.style.borderRadius = (curve.type === "parametric") ? 0 : '100%';
			var tos,los,started = false;
			ctx.beginPath();
			for (var s = curve.min, max = curve.max; s <= max; s += 0.01) {
				var t = curve.draw(s);
				var xi = ((t.x+10)/20)*1000;
				var yi = ((10-t.y)/20)*1000;
				if(!started) { started = true; ctx.moveTo(xi,yi); }
				tos = (xi>0 && xi<1000 && yi>0 && yi<1000);
				if(los || tos) {
					ctx.lineTo(xi,yi);
				} else {
					ctx.moveTo(xi,yi);
				}
				los=tos;
			}
			ctx.shadowColor = ctx.strokeStyle = (curve.type === "parametric") ? 'green' : 'red';
			ctx.lineWidth = 2;
			ctx.shadowBlur = 1;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.stroke();
			katex.render(curve.equation, eq, { displayMode: false});
			if (anim) can.animate([{transform: 'translateX(-120%)'}, {transform: 'translateX(0)'}], {duration: 150, fill: 'forwards'});
			ctx.restore();
		}
	}
		
	this.Card = Card;
	
}).call(curves);

window.onload = function () {
	card = new curves.Card();
	window.setTimeout(function(){
		document.getElementById('tiles').childNodes[0].click();
	}, 500);
}
