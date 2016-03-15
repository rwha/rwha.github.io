'use strict';
/*
var cards;
var curves = {};

curves.Card = function(options) {
	options = options || {};
	this.minX = options.minX || -10;
	this.minY = options.minY || -10;
	this.maxX = options.maxX || 10;
	this.maxY = options.maxY || 10;
	this.rangeX = this.maxX - this.minX;
	this.rangeY = this.maxY - this.minY;
	this.iteration = 0.01; //this.rangeX / (options.iteration || 10000);
	this.width = options.width || 1000;
	this.height = options.height || 1000;
	this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.width);
	this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.height);
	this.pi = 3.14159265358979323;
	this.thetamax = 6 * this.pi;
	this.thetastep = 0.01;
	this.canvas = (function(t){
		var cvs = document.createElement('canvas');
		cvs.height = t.height;
		cvs.width = t.width;
		document.getElementById('can').appendChild(cvs);
		return cvs;
	}(this));
	this.ctx = this.canvas.getContext('2d');
	this.ctx.lineWidth = 2;
	this.ctx.lineCap = 'round';
	this.ctx.lineJoin = 'round';
	
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
				var s = document.querySelector('.selected');
				if(s) {
					s.className = 'parent'; 
				}
				this.className = 'selected';
				var out = cards.canvas.animate([{opacity: 1},{opacity: 0}], {duration: 200, fill: 'forwards'});
				out.onfinish = cards.draw;
			});
		});
	}(curves.meta));

	this.resetCanvas = function() {
		this.ctx.restore();
		this.ctx.clearRect(0,0,this.width,this.height);
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.centerY);
		this.ctx.lineTo(this.width, this.centerY);
		this.ctx.moveTo(this.centerX, 0);
		this.ctx.lineTo(this.centerX, this.height);
		this.ctx.strokeStyle = '#aaa';
		this.ctx.shadowBlur = 0;
		this.ctx.stroke();
		this.ctx.shadowBlur = 1;
		this.ctx.save();
	}

	this.draw = function() {
		var name = document.getElementsByClassName('selected')[0].id;
		if(!curves.meta[name]) {
			console.error('unknown curve: ' + name);
			return;
		}
		cards.resetCanvas();
		switch (curves.meta[name].type) {
			case 'parametric':
				cards.parametric(curves.meta[name]);
				break;
			case 'polar':
				cards.polar(curves.meta[name]);
				break;
			default:
				console.log('unknown function type: ' + curves.meta[name].type);
		}
		cards.canvas.animate([{opacity: 0},{opacity: 1}], {duration: 200, fill: 'forwards'});
	}
}

*/

var worker = new Worker('worker.js');

worker.onmessage = function(e){
	returned = e.data;
	
	if(returned.command === 'list') {
		console.log(returned.result);
		var t = document.getElementById('tiles');
		var frag = document.createDocumentFragment();
		Object.keys(returned.result).forEach(function(k){
			var p = document.createElement('div');
			p.textContent = returned.result[k].title;
			p.className = 'parent';
			p.setAttribute('id', k);
			frag.appendChild(p);
		});
		t.appendChild(frag);
		Array.prototype.forEach.call(t.childNodes, function(n){
			var nc = n;
			nc.addEventListener('click', function(e){
				e.stopPropagation();
				var s = document.querySelector('.selected');
				if(s) {
					s.className = 'parent'; 
				}
				this.className = 'selected';
				//var out = canvas.animate([{opacity: 1},{opacity: 0}], {duration: 200, fill: 'forwards'});
				//out.onfinish = cards.draw;
			});
		});	
	} else if (returned.command === 'draw') {
		console.log(returned.result);
	} else {
		console.log(returned);
	}
}


window.onload = function() {
	worker.postMessage({command: 'list'});
}







