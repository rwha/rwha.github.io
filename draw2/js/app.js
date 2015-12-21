var canvas = document.getElementById('canvas');
canvas.width = canvas.style.width = document.body.offsetWidth;
canvas.height = canvas.style.height = document.body.offsetHeight;
var ctx = canvas.getContext('2d');
var path = {'X': [], 'Y': [], 'D': []};
var paint = false;

function addPoint(x,y,d){
	path.X.push(x);
	path.Y.push(y);
	path.D.push(d);
}

function reDraw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = 'black';
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.shadowBlur = 0.5;
	ctx.shadowColor = 'black';
	ctx.lineWidth = 1;
	
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
	addPoint(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	reDraw();
});

canvas.addEventListener('mousemove', function(e){
	if(paint){
		addPoint(e.pageX - this.offsetLeft,e.pageY - this.offsetTop, true)
		reDraw();
	}
});

canvas.addEventListener('mouseup', function(e){
	paint = false;
});

canvas.addEventListener('mouseleave', function(e){
	paint = false;
});

