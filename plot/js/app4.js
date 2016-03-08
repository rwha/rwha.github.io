'use strict';
var curves = {};

curves.Card = function(options) {
	options = options || {};
	this.minX = options.minX || -10;
	this.minY = options.minY || -10;
	this.maxX = options.maxX || 10;
	this.maxY = options.maxY || 10;
	this.rangeX = this.maxX - this.minX;
	this.rangeY = this.maxY - this.minY;
	this.iteration = this.rangeX / (options.iteration || 10000);
	this.width = options.width || 1000;
	this.height = options.height || 1000;
	this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.width);
	this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.height);
	this.pi = 3.14159265358979323;
	this.thetamax = 6 * this.pi;
	this.thetastep = 0.01;

}

curves.Card.prototype.parametric = function(point, ctx) {
	var x,y,xi,yi,tos,los,started = false;
	ctx.save();
	ctx.beginPath();
	for (var s = this.minX; s <= this.maxX; s += this.iteration) {
		var points = point(s);
		x = points.x;
		y = points.y;
		xi = (x-this.minX)/this.rangeX*this.width;
		yi = (this.maxY-y)/this.rangeY*this.height;
		if(!started) { started = true; ctx.moveTo(xi,yi); }
		tos = (xi>0 && xi<this.width && yi>0 && yi<this.height);
		if(los || tos) {
			ctx.lineTo(xi,yi);
		} else {
			ctx.moveTo(xi,yi);
		}
		los=tos;
	}
	ctx.shadowColor = ctx.strokeStyle = 'green';
	ctx.stroke();
	ctx.restore();
}

curves.Card.prototype.polar = function(radius, ctx) {
	var r,x,y,xi,yi,tos,los,started=false;
	ctx.save();
	ctx.beginPath();
	for (var theta = 0; theta <= this.thetamax; theta += this.thetastep) {
		r = radius(theta);
		x = r.x;
		y = r.y;
		xi = (x-this.minX)/this.rangeX*this.width;
		yi = (this.maxY-y)/this.rangeY*this.height;
		if(!started) { started = true; ctx.moveTo(xi,yi); }
		tos = (xi>0 && xi<this.width && yi>0 && yi<this.height);
		if(los || tos) {
			ctx.lineTo(xi,yi);
		} else {
			ctx.moveTo(xi,yi);
		}
		los=tos;
	}
	ctx.shadowColor = ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.restore();
}

curves.Card.prototype.generateCanvas = function() {
	var c = document.createElement('canvas');
	c.width = this.width;
	c.height = this.height;
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(0, this.centerY);
	ctx.lineTo(this.width, this.centerY);
	ctx.moveTo(this.centerX, 0);
	ctx.lineTo(this.centerX, this.height);
	ctx.strokeStyle = '#aaa';
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.shadowBlur = 1;
	ctx.lineWidth = 2;
	ctx.save();
	return c;
}

curves.Card.prototype.create = function(name) {
	var c = this.generateCanvas();
	var ctx = c.getContext('2d');
	var curve = curve_meta[name];
	switch (curve.type) {
		case 'parametric':
			this.parametric(curve.draw, ctx);
			break;
		case 'polar':
			this.polar(curve.draw, ctx);
			break;
		default:
			console.log('unknown function type: ' + curve.type);
	}
	var parent = document.importNode(document.querySelector('#cardTemplate').content, true);
	parent.querySelector('.canvas').appendChild(c);
	parent.querySelector('h3').textContent = curve.title;
	parent.querySelector('span').innerHTML = curve.description;
	c.style.height = '100%';
	document.body.appendChild(parent);
}

var curve_meta = {
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
			var a = 5;
			var b = 3;
			var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
			var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
			return {x: xi, y: yi};
		}
	}
};

window.onload = function() {
	var cl = Object.getOwnPropertyNames(curve_meta);
	var cards = new curves.Card();
	for(var i=0,l=cl.length;i<l;i++){
		cards.create(cl[i]);
	}
}