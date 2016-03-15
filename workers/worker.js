'use strict';

var curves = {
	parabola: {
		type: "parametric",
		title: "Parabola",
		description: "<p>The parabola was studied by Menaechmus who was a pupil of Plato and Eudoxus. He attempted to duplicate the cube, namely to find side of a cube that has a volume double that of a given cube. Hence he attempted to solve x3 = 2 by geometrical methods. In fact the geometrical methods of ruler and compass constructions cannot solve this (but Menaechmus did not know this). Menaechmus solved it by finding the intersection of the two parabolas x2 = y and y2 = 2x.</p><p>Euclid wrote about the parabola and it was given its present name by Apollonius. The focus and directrix of a parabola were considered by Pappus. Pascal considered the parabola as a projection of a circle and Galileo showed that projectiles follow parabolic paths. Gregory and Newton considered the properties of a parabola which bring parallel rays of light to a focus.</p><p>The pedal of the parabola with its vertex as pedal point is a cissoid. The pedal of the parabola with its focus as pedal point is a straight line. With the foot of the directrix as pedal point it is a right strophoid (an oblique strophoid for any other point of the directrix). The pedal curve when the pedal point is the image of the focus in the directrix is a Trisectrix of Maclaurin.</p><p>The evolute of the parabola is Neile's parabola. From a point above the evolute three normals can be drawn to the parabola, while only one normal can be drawn to the parabola from a point below the evolute.</p>",
		draw: function(s){
			return {x: s, y: (s * s)};
		},
	},
	astroid: {
		type: "parametric",
		title: "Astroid",
		description: "The astroid was first discussed by Johann Bernoulli in 1691-92. It also appears in Leibniz's correspondence of 1715. It is sometimes called the tetracuspid for the obvious reason that it has four cusps. The astroid only acquired its present name in 1836 in a book published in Vienna. It has been known by various names in the literature, even after 1836, including cubocycloid and paracycle.<br><br>The length of the astroid is 6a and its area is 3&#120587;a2/8. The gradient of the tangent T from the point with parameter p is -tan(p). The equation of this tangent T is:<p class='math'>x sin(p) + y cos(p) = a sin(2p)/2</p>Let T cut the x-axis and the y-axis at X and Y respectively. Then the length XY is a constant and is equal to a. It can be formed by rolling a circle of radius a/4 on the inside of a circle of radius a. It can also be formed as the envelope produced when a line segment is moved with each end on one of a pair of perpendicular axes. It is therefore a glissette.",
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
		description: "no description available",
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
		description: "no description available",
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
		description: "no description available",
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
		description: "no description available",
		draw: function(theta) {
			var a = 2;
			var r = 2 * a * Math.tan(theta) * Math.sin(theta);
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	cochleoid: {
		type: "polar",
		title: "Cochleoid",
		description: "no description available",
		draw: function(theta) {
			var a = 9;
			var r = a * Math.sin(theta)/theta;
			return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
		}
	},
	conchoid: {
		type: "polar",
		title: "Conchoid",
		description: "no description available",
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
		description: "no description available",
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
		description: "no description available",
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
		description: "no description available",
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
		description: "no description available",
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
		description: "This folium was first discussed by Descartes in 1638 but, although he found the correct shape of the curve in the positive quadrant, he believed that this leaf shape was repeated in each quadrant like the four petals of a flower.<br><br>The problem to determine the tangent to the curve was proposed to Roberval who also wrongly believed the curve had the form of a jasmine flower. His name of fleur de jasmin was later changed.<br><br>The curve is sometimes known as the noeud de ruban. The folium has an asymptote x + y + a = 0.<br><br>The equation of the tangent at the point with t = p is<p class='math'>p(p3 - 2)x + (1 - 2p3)y + 3ap2 = 0</p>The curve passes through the origin at t = 0 and approaches the origin a second time as t goes to infinity.",
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
		description: "no description available",
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
		description: "NA",
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
		description: "NA",
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
		description: "NA",
		max: 20,
		draw: function(t) {
			var a = 4.5, b = 2, c = 3;
			var xi = (a + b) * Math.cos(t) - c * Math.cos((a/b + 1) * t);
			var yi = (a + b) * Math.sin(t) - c * Math.sin((a/b + 1) * t);
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
		var path = new Path2D();
		var max = meta.max || 10;
		for (var s = -10; s <= max; s += 0.01) {
			var points = meta.draw(s);
			x = points.x;
			y = points.y;
			xi = (x+10)/20000;
			yi = (10-y)/20000;
			if(!started) { started = true; path.moveTo(xi,yi); }
			tos = (xi>0 && xi<1000 && yi>0 && yi<1000);
			if(los || tos) {
				path.lineTo(xi,yi);
			} else {
				path.moveTo(xi,yi);
			}
			los=tos;
		}
		return path;
	}

	function polar(meta) {
		var r,x,y,xi,yi,tos,los,started=false;
		var path = new Path2D();
		for (var theta = 0; theta <= (Math.PI * 6); theta += 0.01) {
			r = meta.draw(theta);
			x = r.x;
			y = r.y;
			xi = (x+10)/20000;
			yi = (10-y)/20000;
			if(!started) { started = true; path.moveTo(xi,yi); }
			tos = (xi>0 && xi<1000 && yi>0 && yi<1000);
			if(los || tos) {
				path.lineTo(xi,yi);
			} else {
				path.moveTo(xi,yi);
			}
			los=tos;
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
	or:		{ command: 'draw', curve: 'parabola' }	=>	{ command: 'draw', result: [Path2D Object] }
*/
function worker(cmd){
	var response;
	switch (cmd.command) {
		case 'list':
			response = (function(c){
				var o = {};
				Object.keys(c).forEach(function(k){
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
	var cmd = e.data;
	console.log(cmd);
	worker(cmd);
}

