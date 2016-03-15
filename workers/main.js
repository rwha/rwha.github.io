'use strict';

var worker = new Worker('worker.js');

worker.onmessage = function(e){
	var returned = e.data;
	
	if(returned.command === 'list') {
		console.log(returned.result);
		var t = document.getElementById('tiles');
		var frag = document.createDocumentFragment();
		Object.keys(returned.result).forEach(function(k){
			var p = document.createElement('div');
			p.textContent = returned.result[k];
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
				worker.postMessage({command: 'draw', curve: this.id});
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
