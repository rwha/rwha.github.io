function Graph(config) {
	// user defined properties
	this.canvas = document.getElementById(config.canvasId);
	this.minX = config.minX;
	this.minY = config.minY;
	this.maxX = config.maxX;
	this.maxY = config.maxY;
	this.unitsPerTick = config.unitsPerTick;
	
	// constants
	this.axisColor = '#aaa';
	this.font = '8pt Calibri';
	this.tickSize = 20;
	this.pi = 3.14159265358979323;
	this.e = 2.718281828459045;
	
	// relationships
	this.context = this.canvas.getContext('2d');
	this.height = this.canvas.height;
	this.width = this.canvas.width;
	this.rangeX = this.maxX - this.minX;
	this.rangeY = this.maxY - this.minY;
	this.unitX = this.canvas.width / this.rangeX;
	this.unitY = this.canvas.height / this.rangeY;
	this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
	this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
	this.iteration = (this.maxX - this.minX) / 1000;
	this.scaleX = this.canvas.width / this.rangeX;
	this.scaleY = this.canvas.height / this.rangeY;

	// draw x and y axes
	this.drawAxes();
}

Graph.prototype.drawAxes = function() {
	var ctx = this.context;

	// X
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0, this.centerY);
	ctx.lineTo(this.width, this.centerY);
	ctx.strokeStyle = this.axisColor;
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();
	
	// Y 
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(this.centerX, 0);
	ctx.lineTo(this.centerX, this.height);
	ctx.strokeStyle = this.axisColor;
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();
}

Graph.prototype.polar = function(radius) {
	var ctx = this.context;
	var s,c,r,x,y,xi,yi,tos,los,started=false;
	var thetamin = 0;
	var thetamax = 6 * this.pi;
	var thetastep = 0.01;
	ctx.save();
	ctx.beginPath();
	for (var theta = thetamin; theta <= thetamax; theta += thetastep) {
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
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.shadowBlur = 1;
	ctx.shadowColor = 'red';
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.restore();
}

Graph.prototype.parametric = function(point) {
	var ctx = this.context;
	var tos,los,started = false;
	ctx.save();
	ctx.beginPath();
	for (var s = this.minX; s <= this.maxX; s += this.iteration) {
		var points = point(s);
		var x = points.x;
		var y = points.y;
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
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.shadowBlur = 1;
	ctx.shadowColor = 'green';
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'green';
	ctx.stroke();
	ctx.restore();
}


var myGraph = new Graph({
	canvasId: 'canvas',
	minX: -10,
	minY: -10,
	maxX: 10,
	maxY: 10,
	unitsPerTick: 1
});

/*
//Astroid
myGraph.parametric(function(s){
	var a = 5;
	var ci = Math.cos(s);
	var si = Math.sin(s);
	var xi = a * ci * ci * ci;
	var yi = a * si * si * si;
	return {x: xi, y: yi};
});

//Bicorn
myGraph.parametric(function(s){
	var a = 5;
	var sin = Math.sin(s);
	var xi = a * Math.cos(s);
	var yi = a * (sin*sin)/(2 + sin);
	return {x: xi, y: yi};
});

// Cardiod
myGraph.polar(function(theta){
	var a = 2;
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	var r = 2 * a * (1 + c); 
	return {x: (r * c), y: (r * s)};
});

//Cartesian Oval(s)
myGraph.polar(function(theta){
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
});

//Cayley's Sextic
// needs 0 < theta < 4pi
myGraph.polar(function(theta){
	var a = 2;
	var c = Math.cos(theta/3);
	var r = 4 * a * c * c * c
	return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
});

//Cissoid of Diocles
myGraph.polar(function(theta){
	var a = 2;
	var r = 2 * a * Math.tan(theta) * Math.sin(theta);
	return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
});

//Cochleoid
// give it 6pi or more to make it interesting...
myGraph.polar(function(theta){
	var a = 9;
	var r = a * Math.sin(theta)/theta;
	return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
});

//Conchoid
myGraph.polar(function(theta){
	var a = 5;
	var b = 2;
	var r = a + b/Math.cos(theta);
	return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
});

//Conchoid of de Sluze
myGraph.polar(function(theta){
	var a = 1;
	var k = 2.5;
	var c = Math.cos(theta);
	var r = (k * k * c * c - a * a)/c;
	return {x: (r * Math.cos(theta)), y: (r * Math.sin(theta))};
});

//Cycloid
//  use h = a, h < a, and h > a 
myGraph.parametric(function(s){
	var a = 1;
	var h = 1;
	var xi = a * s - h * Math.sin(s);
	var yi = a - h * Math.cos(s);
	return {x: xi, y: yi};
});

//Devil's Curve
// needs work...
myGraph.polar(function(theta){
	//var a = 1.5;
	//var b = 2;
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	var tan = s/c;
	//var r = (a * s * s - b * c * c) / (s * s - c * c);
	var r = Math.sqrt((25 - 24 * tan * tan) / (1 - tan * tan));
	return {x: (r * c), y: (r * s)};
});
*/



/*
//Folium of Descartes
myGraph.polar(function(theta){
	var a = 3;
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	var r = 3 * a * s * c/((s * s * s) + (c * c * c));
	return {x: (r * c), y: (r * s)};
});

//Hypocycloid
myGraph.parametric(function(s){
	var a = 5;
	var b = 3;
	var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
	var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
	return {x: xi, y: yi};
});

*/
