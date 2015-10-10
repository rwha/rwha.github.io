paper.install(window);
var taken = [];

$("#back-color").spectrum({
	appendTo: $("#control"),
	preferredFormat: "hex",
	showInput: false,
	color: "#FFFFFF",
	showPalette: true,
	showSelectionPalette: true,
	palette: [],
	localStorageKey: "spectrum.homepage",
	hideAfterPaletteSelect: true,
	maxSelectionSize: 16,
	theme: 'sp-dark',
	change: function(color) {
		paper.project.activeLayer.children['background'].fillColor = color.toHexString();
	}
});

$("#pen-color").spectrum({
	appendTo: $("#control"),
	preferredFormat: "hex",
	showInput: false,
	color: "#2E2E2E",
	showPalette: true,
	showSelectionPalette: true,
	palette: [],
	localStorageKey: "spectrum.homepage",
	hideAfterPaletteSelect: true,
	maxSelectionSize: 16,
	theme: 'sp-dark',
});

function showSaveDiag(){
	var diag = $("<div>")
		.attr({class: 'dialog', id: 'savediag'})
		.append( $("<input>").attr({type: 'text', id: 'filename', placeholder: 'filename'}) )
		.append( $("<br>"),$("<br>") )
		.append( $("<button>").text('cancel').click(function(){ $("#savediag").remove(); }).css('margin-right', '25px') )
		.append( $("<button>").text('save').click(function(){
			if(!$("#filename").val()) {
				message('enter a name');
			} else {
				var name = $("#filename").val();
				var data = paper.project.activeLayer.exportJSON();
				storage.saveProject(name, data, function(n) { message('saved ' + n); });
				$("#savediag").remove();
			}
		}) );
	$("body").append(diag);
}

function showOpenDiag(){
	var diag = $("<div>").attr({class: 'dialog', id: 'opendiag'});
	var ulist = $("<span>");
	
	storage.getProjects(function(projects) {
		for (name in projects) {
			var pic = new Layer();
			pic.importJSON(projects[name]);
			var img = $("<img>")
				.attr({src: pic.rasterize().toDataURL(), 'id': name, width: '175'})
				.click(function(e){ 
					$("#opendiag").remove(); 
					console.log(e.target.id);
					storage.openProject(e.target.id, loadProject); 
				});
			ulist.append(img);
			pic.remove();
		}
	}, true);
	
	diag.append(ulist);
	diag.append($("<p>").append($("<button>").text('cancel').css('float','right').click(function(){$("#opendiag").remove();})));
	$("body").append(diag);
}

function loadProject(name, data) {
	message('opening ' + name);
	paper.project.activeLayer.removeChildren();
	paper.project.activeLayer.importJSON(data);
	var bgc = paper.project.activeLayer.children['background'].fillColor.toCSS();
	var pen = paper.project.activeLayer.lastChild.strokeColor.toCSS()
	var stroke = paper.project.activeLayer.lastChild.getStrokeWidth();
	var opacity = paper.project.activeLayer.lastChild.getOpacity();
	$('#pen-size').val(stroke);
	$('#opacity').val(opacity);
	$("#back-color").spectrum("set", bgc);
	$("#pen-color").spectrum("set", pen);
	view.update();
}

function storable() {
	var savebtn = $("<span>")
		.attr({class: 'controls', id: 'save', title: 'save'})
		.html(' &nbsp; ')
		.click(function(){
			showSaveDiag();
		});
	var openbtn = $("<span>")
		.attr({class: 'controls', id: 'open', title: 'open'})
		.html(' &nbsp; ')
		.click(function(){
			showOpenDiag();
		});
	$("#control").append(savebtn,openbtn);
}

function message(i){
	if(i){
		$("#message").html(i).show().delay(1000).fadeOut('slow');
	} else {
		$("#message").html('draw something!').show().delay(1000).fadeOut('slow');
	}
}

$(document).keydown(function(e){
	if (e.which === 90 && e.ctrlKey && e.shiftKey){
		$("#redo").click();
	}
	else if (e.which === 90 && e.ctrlKey) {
		$("#undo").click();
	}
	else if (e.which === 78 && e.shiftKey) {
		$("#clear").click();
	}
	else if (e.which === 80 && e.shiftKey) {
		$("#pic").click();
	}
	else if (e.which === 83 && e.shiftKey) {
		$("#save").click();
	}
	else if (e.which === 71 && e.shiftKey) {
		$("#graph").click();
	}
});

$(document).keyup(function(e){
	if(e.keyCode == 27) {
		$(".dialog").remove();
	}
});

$(window).load(function(){
	
	$("#newbook").click(function(){
		var bookname = $("#book-name").val();
		if(bookname == ''){
			message('please enter a book name');
			$("#book-name").focus();
			return;
		} else {
			var data = paper.project.activeLayer.exportJSON();
			gd_insertFile(bookname, data);
		}
	});
	
	//storage.open(storable);	
	
	var bgcolor = $("#back-color").spectrum("get").toHexString();

	paper.setup('canvas');
	
	var bg = new Path.Rectangle({
		point: [0,0],
		size: [$("#canvas").width(),$("#canvas").height()],
		name: 'background',
		fillColor: bgcolor
	});
	
	view.onResize = function(){
		paper.project.activeLayer.children['background'].set({size: [$("#canvas").width(),$("#canvas").height()]});
	}
	
	var tool = new Tool();
	var path;
	var hitopts = {
		segments: true,
		stroke: true,
		fill: true,
		tolerance: 5	
	};
	
	tool.onMouseDown = function(e) {
		
		if(Key.isDown('shift')) {
			var hr = paper.project.hitTest(e.point, hitopts);
			if(hr.type && hr.type == 'stroke'){
				hr.item.remove();
			}
		} else {
		
		var color = $("#pen-color").spectrum("get").toHexString();
		var stroke = document.getElementById('pen-size').value;
		var opacity = document.getElementById('opacity').value;
		path = new Path({
			segments: [e.point],
			strokeColor: color,
			strokeWidth: stroke,
			opacity: opacity,
			strokeCap: 'round',
			strokeJoin: 'bevel'
		});
		
		}
	}
	
	tool.onMouseDrag = function(e){
		if(Key.isDown('shift')) {
			var hr = paper.project.hitTest(e.point, hitopts);
			if(hr.type && hr.type == 'stroke'){
				hr.item.remove();
			}
		} else {		
			path.add(e.point);
		}
	}
	
	tool.onMouseUp = function(e) {
		if(!Key.isDown('shift')) {
			path.simplify(8);
		}
	}
	
	view.draw();	
	
	$("#pic").click(function(){
		var url = document.getElementById('canvas').toDataURL();
		var link = document.createElement("a");
		link.download = new Date().getTime();
		link.href = url;
		link.click();		
	});
	
	$("#clear").click(function(){
		$('#pen-size').val(1);
		$('#opacity').val(1);
		$("#back-color").spectrum("set", 'white');
		$("#pen-color").spectrum("set", 'black');
		paper.project.activeLayer.removeChildren();
		var background = new Path.Rectangle({
			point: [0,0],
			size: [$("#canvas").width(),$("#canvas").height()],
			name: 'background',
			fillColor: $("#back-color").spectrum("get").toHexString()
		});
		view.update();
		taken.length = 0;
	});
	
	$("#undo").click(function(){
		if(paper.project.activeLayer.children.length > 1){
			taken.push(paper.project.activeLayer.lastChild);
			paper.project.activeLayer.lastChild.remove();
			view.update();
		} else {
			message('nothing to undo');
		}
	});
	
	$("#redo").click(function(){
		if(taken.length > 0){
			paper.project.activeLayer.addChild(taken.pop());
			view.update();
		} else {
			message('nothing to redo');
		}
	});


	$("#graph").click(function patternGrid() {
		var al = paper.project.activeLayer;
		var nl = new Layer();
		var grid = new Raster('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAOElEQVQ4T2M8ffr0AQYGBhCmCmAEGthgamraQBXTgIaMGkh5SI6G4WgYkhECo8mGjEBD0zICwxAAOxxP9jeScbEAAAAASUVORK5CYII=');
		var gbg = new Symbol(grid);
		var x = bg.size[0];
		var y = bg.size[1];
		var yi=10;
		while (yi<=y) {
			var xi=10;
			while(xi<=x) {
				gbg.place([xi,yi]);
				xi = xi+20;
			}
			yi = yi+20;
		}
		al.addChild(nl.rasterize());
		nl.remove();// Children(2,l._children.length);
		view.update();
	});
	
});

$(document).ready(function() {
/*
	$("#controller").click(function(){
		$("#control").toggleClass("show");
		$("#controller").toggleClass("expand");
	});

	$("#control")
		.mouseenter(function() { 
			$("#control").addClass("show"); 
		})
		.mouseleave(function() { 
			$("#control").removeClass("show"); 
		});
*/
});
