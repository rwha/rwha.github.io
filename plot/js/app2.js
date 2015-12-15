var Curves = (function() {
	var canvas = document.getElementById('canvas');
	var minX = -10;
	var minY = -10;
	var maxX = 10;
	var maxY = 10;
	var axisColor = '#aaa';
	var pi = 3.14159265358979323;
	var e = 2.718281828459045;
	var ctx = canvas.getContext('2d');
	var height = canvas.height;
	var width = canvas.width;
	var rangeX = maxX - minX;
	var rangeY = maxY - minY;
	var unitX = width / rangeX;
	var unitY = height / rangeY;
	var centerY = Math.round(Math.abs(minY / rangeY) * height);
	var centerX = Math.round(Math.abs(minX / rangeX) * width);
	var iteration = (maxX - minX) / 1000;
	var scaleX = width / rangeX;
	var scaleY = height / rangeY;
	
	function init() {
		ctx.clearRect(0,0,width,height);
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, centerY);
		ctx.lineTo(width, centerY);
		ctx.strokeStyle = axisColor;
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(centerX, 0);
		ctx.lineTo(centerX, height);
		ctx.strokeStyle = axisColor;
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.restore();
	}
	
	function polar(radius,period,color) {
		var s,c,r,x,y,xi,yi,tos,los,started=false;
		var period = period || 2;
		var color = color || 'red';
		var thetamin = 0;
		var thetamax = period * pi;
		var thetastep = 0.01;
		ctx.save();
		ctx.beginPath();
		for (var theta = thetamin; theta <= thetamax; theta += thetastep) {
			r = radius(theta);
			x = r.x;
			y = r.y;
			xi = (x-minX)/rangeX*width;
			yi = (maxY-y)/rangeY*height;
			if(!started) { started = true; ctx.moveTo(xi,yi); }
			tos = (xi>0 && xi<width && yi>0 && yi<height);
			if(los || tos) {
				ctx.lineTo(xi,yi);
			} else {
				ctx.moveTo(xi,yi);
			}
			los=tos;
		}
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowBlur = 1;
		ctx.shadowColor = color;
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.restore();
	}

	function parametric(point,color) {
		var tos,los,started = false;
		var color = color || 'green';
		ctx.save();
		ctx.beginPath();
		for (var s = minX; s <= maxX; s += iteration) {
			var points = point(s);
			var x = points.x;
			var y = points.y;
			xi = (x-minX)/rangeX*width;
			yi = (maxY-y)/rangeY*height;
			if(!started) { started = true; ctx.moveTo(xi,yi); }
			tos = (xi>0 && xi<width && yi>0 && yi<height);
			if(los || tos) {
				ctx.lineTo(xi,yi);
			} else {
				ctx.moveTo(xi,yi);
			}
			los=tos;
		}
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowBlur = 1;
		ctx.shadowColor = color;
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.restore();
	}
	
	return {
		parabola: function() {
			init();
			parametric(function(s) {
				return {x: s, y: (s * s)};
			});
		},
		astroid: function() {
			init();
			parametric(function(s){
				var a = 5;
				var ci = Math.cos(s);
				var si = Math.sin(s);
				var xi = a * ci * ci * ci;
				var yi = a * si * si * si;
				return {x: xi, y: yi};
			});
		},
		bicorn: function() {
			init();
			parametric(function(s) {
				var a = 5;
				var sin = Math.sin(s);
				var xi = a * Math.cos(s);
				var yi = a * (sin*sin)/(2 + sin);
				return {x: xi, y: yi};
			});
		},
		cardiod: function() {
			init();
			polar(function(theta) {
				var a = 2;
				var s = Math.sin(theta);
				var c = Math.cos(theta);
				var r = 2 * a * (1 + c); 
				return {x: (r * c), y: (r * s)};
			});
		},
		cayleysSextic: function() {
			init();
			polar(function(theta) {
				var a = 2;
				var c = Math.cos(theta/3);
				var r = 4 * a * c * c * c
				return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
			}, 4, 'red');
		},
		cissoidOfDiocles: function() {
			init();
			polar(function(theta) {
				var a = 2;
				var r = 2 * a * Math.tan(theta) * Math.sin(theta);
				return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
			});
		},
		cochleoid: function() {
			init();
			polar(function(theta) {
				var a = 9;
				var r = a * Math.sin(theta)/theta;
				return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
			}, 6, 'red');
		},
		conchoid: function() {
			init();
			polar(function(theta) {
				var a = 5;
				var b = 2;
				var r = a + b/Math.cos(theta);
				return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
			});
		},
		conchoidOfDeSluze: function() {
			init();
			polar(function(theta) {
				var a = 1;
				var k = 2.5;
				var c = Math.cos(theta);
				var r = (k * k * c * c - a * a)/c;
				return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
			});
		},
		cycloid: function() {
			init();
			parametric(function(s) {
				var a = 1;
				var h = 1;
				var xi = a * s - h * Math.sin(s);
				var yi = a - h * Math.cos(s);
				return {x: xi, y: yi};
			});
		},
		curateCycloid: function() {
			init();
			parametric(function(s) {
				var a = 2;
				var h = 1;
				var xi = a * s - h * Math.sin(s);
				var yi = a - h * Math.cos(s);
				return {x: xi, y: yi};
			});
		},
		prolateCycloid: function() {
			init();
			parametric(function(s) {
				var a = 1;
				var h = 2;
				var xi = a * s - h * Math.sin(s);
				var yi = a - h * Math.cos(s);
				return {x: xi, y: yi};
			});
		},
		foliumOfDescartes: function() {
			init();
			polar(function(theta) {
				var a = 3;
				var s = Math.sin(theta);
				var c = Math.cos(theta);
				var r = 3 * a * s * c/((s * s * s) + (c * c * c));
				return {x: (r * c), y: (r * s)};
			});
		},
		hypocycloid: function() {
			init();
			parametric(function(s) {
				var a = 5;
				var b = 3;
				var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
				var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
				return {x: xi, y: yi};
			});
		}
	};
	
})();

var sel = document.createElement('select');
sel.id = 'functionList';
sel.style.position = 'absolute';

var flist = Object.getOwnPropertyNames(Curves);
for (var i=0,l=flist.length;i<l;i++) {
	var o = document.createElement('option');
	o.id = o.text = flist[i];
	sel.appendChild(o);
}

document.body.appendChild(sel);

sel.onchange = function() {
	//console.log(this[this.selectedIndex].id);
	Curves[this[this.selectedIndex].id]();
}

window.onload = function() {
	Curves[sel[sel.selectedIndex].id]();
}



/*
works in progress...

//Cartesian Oval(s)
polar(function(theta){
	var a = -1.5;
	var m = 2;
	var c = -0.1;
	var cos = Math.cos(theta);
	var sin = Math.sin(theta);
	//var num = ((1 - m * m) * (cos * cos + sin * sin) + 2 * m * m * c * cos + a * a - m * m * c * c);
	//var den = 4 * a * a * (cos * cos + sin * sin)
	//var r = num * num / den;
	var r = (2 * a / (1 - a * a)) * (1 - a * cos);
	return {x: (r * cos), y: (r * sin)};
}, 2, 'red');

//Devil's Curve
polar(function(theta){
	//var a = 1.5;
	//var b = 2;
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	var tan = s/c;
	//var r = (a * s * s - b * c * c) / (s * s - c * c);
	var r = Math.sqrt((25 - 24 * tan * tan) / (1 - tan * tan));
	return {x: (r * c), y: (r * s)};
}, 2, 'red');

// working functions:

	var astroid = function(s) {
		var a = 5;
		var ci = Math.cos(s);
		var si = Math.sin(s);
		var xi = a * ci * ci * ci;
		var yi = a * si * si * si;
		return {x: xi, y: yi};
	}
	
	var bicorn = function(s) {
		var a = 5;
		var sin = Math.sin(s);
		var xi = a * Math.cos(s);
		var yi = a * (sin*sin)/(2 + sin);
		return {x: xi, y: yi};
	}
	
	var cardiod = function(theta) {
		var a = 2;
		var s = Math.sin(theta);
		var c = Math.cos(theta);
		var r = 2 * a * (1 + c); 
		return {x: (r * c), y: (r * s)};
	}
	
	var cayleysSextic = function(theta) {
		var a = 2;
		var c = Math.cos(theta/3);
		var r = 4 * a * c * c * c
		return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
	}
	
	var cochleoid = function(theta) {
		var a = 9;
		var r = a * Math.sin(theta)/theta;
		return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
	}

	var cissoidOfDiocles = function(theta) {
		var a = 2;
		var r = 2 * a * Math.tan(theta) * Math.sin(theta);
		return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
	}
	
	var conchoid = function(theta) {
		var a = 5;
		var b = 2;
		var r = a + b/Math.cos(theta);
		return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
	}
	
	var conchoidOfDeSluze = function(theta) {
		var a = 1;
		var k = 2.5;
		var c = Math.cos(theta);
		var r = (k * k * c * c - a * a)/c;
		return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
	}
	
	var cycloid = function(s) {
		var a = 1;
		var h = 1;
		var xi = a * s - h * Math.sin(s);
		var yi = a - h * Math.cos(s);
		return {x: xi, y: yi};
	}
	
	var curateCycloid = function(s) {
		var a = 2;
		var h = 1;
		var xi = a * s - h * Math.sin(s);
		var yi = a - h * Math.cos(s);
		return {x: xi, y: yi};
	}

	var prolateCycloid = function(s) {
		var a = 1;
		var h = 2;
		var xi = a * s - h * Math.sin(s);
		var yi = a - h * Math.cos(s);
		return {x: xi, y: yi};
	}
	
	var foliumOfDescartes = function(theta) {
		var a = 3;
		var s = Math.sin(theta);
		var c = Math.cos(theta);
		var r = 3 * a * s * c/((s * s * s) + (c * c * c));
		return {x: (r * c), y: (r * s)};
	}
	
	var hypocycloid = function(s) {
		var a = 5;
		var b = 3;
		var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
		var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
		return {x: xi, y: yi};
	}





*/

