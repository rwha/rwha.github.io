'use strict';

var curves = {
	parabola: {
		type: "parametric",
		title: "Parabola",
		draw: function(s){
			return {x: s, y: (s * s)};
		},
	},
	astroid: {
		type: "parametric",
		title: "Astroid",
		draw: function(s) {
			var a = 5;
			var ci = Math.cos(s);
			var si = Math.sin(s);
			var xi = a * ci * ci * ci;
			var yi = a * si * si * si;
			return {x: xi, y: yi};
		}
	},
	bicorn: {
		type: "parametric",
		title: "Bicorn",
		draw: function(s) {
			var a = 5;
			var sin = Math.sin(s);
			var xi = a * Math.cos(s);
			var yi = a * (sin*sin)/(2 + sin);
			return {x: xi, y: yi};
		}
	},
	cardiod: {
		type: "polar",
		title: "Cardiod",
		draw: function(theta) {
			var a = 2;
			var s = Math.sin(theta);
			var c = Math.cos(theta);
			var r = 2 * a * (1 + c); 
			return {x: (r * c), y: (r * s)};
		}
	},
	cayleysSextic: {
		type: "polar",
		title: "Cayley's Sextic",
		draw: function(theta) {
			var a = 2;
			var c = Math.cos(theta/3);
			var r = 4 * a * c * c * c
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	cissoidOfDiocles: {
		type: "polar",
		title: "Cissoid of Diocles",
		draw: function(theta) {
			var a = 2;
			var r = 2 * a * Math.tan(theta) * Math.sin(theta);
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	cochleoid: {
		type: "polar",
		title: "Cochleoid",
		max: 6,
		draw: function(theta) {
			var a = 9;
			var r = a * Math.sin(theta)/theta;
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	conchoid: {
		type: "polar",
		title: "Conchoid",
		draw: function(theta) {
			var a = 5;
			var b = 2;
			var r = a + b/Math.cos(theta);
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	conchoidOfDeSluze: {
		type: "polar",
		title: "Conchoid of DeSluze",
		draw: function(theta) {
			var a = 1;
			var k = 2.5;
			var c = Math.cos(theta);
			var r = (k * k * c * c - a * a)/c;
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	cycloid: {
		type: "parametric",
		title: "Cycloid",
		draw: function(s) {
			var a = 1;
			var h = 1;
			var xi = a * s - h * Math.sin(s);
			var yi = a - h * Math.cos(s);
			return {x: xi, y: yi};
		}
	},
	curateCycloid: {
		type: "parametric",
		title: "Curate Cycloid",
		draw: function(s) {
			var a = 2;
			var h = 1;
			var xi = a * s - h * Math.sin(s);
			var yi = a - h * Math.cos(s);
			return {x: xi, y: yi};
		}
	},
	prolateCycloid: {
		type: "parametric",
		title: "Prolate Cycloid",
		draw: function(s) {
			var a = 1;
			var h = 2;
			var xi = a * s - h * Math.sin(s);
			var yi = a - h * Math.cos(s);
			return {x: xi, y: yi};
		}
	},
	foliumOfDescartes: {
		type: "polar",
		title: "Folium of Descartes",
		draw: function(theta) {
			var a = 3;
			var s = Math.sin(theta);
			var c = Math.cos(theta);
			var r = 3 * a * s * c/((s * s * s) + (c * c * c));
			return {x: (r * c), y: (r * s)};
		}
	},
	hypocycloid: {
		type: "parametric",
		title: "Hypocycloid",
		draw: function(s) {
			var a = 9;
			var b = 5.4;
			var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
			var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
			return {x: xi, y: yi};
		}
	},
	hypotrochoid: {
		type: "parametric",
		title: "Hypotrochoid",
		max: 47,
		draw: function(t) {
			var a = 7, b = 9, c = 3;
			var xi = (a - b) * Math.cos(t) + c * Math.cos((a/b - 1) * t);
			var yi = (a - b) * Math.sin(t) - c * Math.sin((a/b - 1) * t);
			return {x: xi, y: yi};
		}
	},
	epicycloid: {
		type: "parametric",
		title: "Epicycloid",
		max: 20,
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
		draw: function(t) {
			var a = 4.5, b = 2, c = 3;
			var xi = (a + b) * Math.cos(t) - c * Math.cos((a/b + 1) * t);
			var yi = (a + b) * Math.sin(t) - c * Math.sin((a/b + 1) * t);
			return {x: xi, y: yi};
		}
	},
	newtonsParapola: {
		type: "parametric",
		title: "Newton's Parabola",
		draw: function(t) {
			var a = 1, b = 2, c = -3;
			var xi = (t * t * t) - (2 * b * t * t) + (c * t);
			var yi = xi * xi;
			return {x: xi, y: yi};
		}
	},
};

function generatePath(curve) {
	if(!curves[curve]) {
		return 'unknown curve: ' + curve;
	}
	var current = curves[curve];

	function parametric(meta) {
		var x,y,xi,yi,tos,los,started = false;
		var path = [];
		var max = meta.max || 10;
		for (var s = -10; s <= max; s += 0.01) {
			var points = meta.draw(s);
			x = points.x;
			y = points.y;
			xi = ((x+10)/20)*1000;
			yi = ((10-y)/20)*1000;
			path.push([xi,yi]);
		}
		return path;
	}

	function polar(meta) {
		var r,x,y,xi,yi,tos,los,started=false;
		var path = []
		for (var theta = 0; theta <= (Math.PI * (meta.max || 6)); theta += 0.01) {
			r = meta.draw(theta);
			x = r.x;
			y = r.y;
			xi = ((x+10)/20)*1000;
			yi = ((10-y)/20)*1000;
			path.push([xi,yi]);
		}
		return path;
	}

	switch (current.type) {
		case 'parametric':
			return parametric(current);
			break;
		case 'polar':
			return polar(current);
			break;
		default:
			return 'unknown function type: ' + current.type;
	}

}

/* 
	e.g.	{ command: 'list' }	=>	{ command: 'list', result: {} }
	or:		{ command: 'draw', curve: 'parabola' }	=>	{ command: 'draw', result: [[0,0],[0,0]] }
	
*/
function worker(cmd){
	var response;
	switch (cmd.command) {
		case 'list':
			response = (function(c){
				var o = {};
				var keys = Object.keys(c);
				keys.sort();
				keys.forEach(function(k){
					o[k] = c[k].title;
				});
				return o;
			}(curves));
			break;
		case 'draw':
			if (cmd.curve) {
				response = generatePath(cmd.curve);
			} else {
				response = 'must provide a curve name for the draw command';
			}
			break;
		default:
			response = 'unknown command';
	}
	postMessage({command: cmd.command, result: response});
}

onmessage = function(e) {
	worker(e.data);
}

