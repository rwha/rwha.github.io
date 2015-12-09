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

Graph.prototype.polar = function(radius,a) {
	var ctx = this.context;
	var a = a || 1;
	var s,c,r,x,y,xi,yi,tos,los,started=false;
	var thetamin = 0;
	var thetamax = 2 * this.pi;
	var thetastep = 0.01;
	ctx.save();
	ctx.beginPath();
	for (var theta = thetamin; theta <= thetamax; theta += thetastep) {
		r = radius(a,theta);
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

Graph.prototype.parametric = function(point,a,b) {
	var a = a || 1;
	var b = b || 1;
	var ctx = this.context;
	var tos,los,started = false;
	ctx.save();
	ctx.beginPath();
	for (var s = this.minX; s <= this.maxX; s += this.iteration) {
		var points = point(s,a,b);
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


/** examples **/ 

var myGraph = new Graph({
	canvasId: 'myCanvas',
	minX: -10,
	minY: -10,
	maxX: 10,
	maxY: 10,
	unitsPerTick: 1
});

/*
//Folium of Descartes
myGraph.polar(function(a,theta){
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	var r = 3 * a * s * c/((s * s * s) + (c * c * c));
	return {x: (r * c), y: (r * s)};
}, 3);


//Astroid
myGraph.parametric(function(s,a,b){
	var ci = Math.cos(s);
	var si = Math.sin(s);
	var xi = a * ci * ci * ci;
	var yi = a * si * si * si;
	return {x: xi, y: yi};
}, 5);
*/

//Hypocycloid
myGraph.parametric(function(s,a,b){
	var xi = (a-b) * Math.cos(s) + b * Math.cos((a/b-1)*s);
	var yi = (a-b) * Math.sin(s) - b * Math.sin((a/b-1)*s)
	return {x: xi, y: yi};
},5,3);



