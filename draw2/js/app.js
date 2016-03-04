var canvas = document.getElementById('canvas',{alpha: false});
canvas.width = canvas.style.width = document.body.offsetWidth;
canvas.height = canvas.style.height = document.body.offsetHeight;
var ctx = canvas.getContext('2d');
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = 'black';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.shadowBlur = 0.5;
ctx.shadowColor = 'black';
ctx.lineWidth = 1;

//var path = {'X': [], 'Y': [], 'D': []};
var path, paths = [];
var paint = false;

function addPoint(x,y,d){
	path.X.push(x);
	path.Y.push(y);
	path.D.push(d);
}

function refreshPath() {
	path.stroke();
}

function reDraw(){
	for (var i=0,l=path.X.length;i<l;i++){
		ctx.beginPath();
		if(path.D[i] && i) {
			ctx.moveTo(path.X[i-1],path.Y[i-1]);
		} else {
			ctx.moveTo(path.X[i]-1,path.Y[i]);
		}
		ctx.lineTo(path.X[i],path.Y[i]);
		ctx.closePath();
		ctx.stroke();
	}
}

canvas.addEventListener('mousedown', function(e){
	paint = true;
//	addPoint(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	path = new Path2D();
	path.moveTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	//reDraw();
});

canvas.addEventListener('mousemove', function(e){
	if(paint){
		//addPoint(e.pageX - this.offsetLeft,e.pageY - this.offsetTop, true);
		//reDraw();
		path.lineTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		//refreshPath();
	}
});

canvas.addEventListener('mouseup', function(e){
	//path.closePath();
	ctx.stroke(path);
	paths.push(path);
	paint = false;
});

canvas.addEventListener('mouseleave', function(e){
	paint = false;
});

