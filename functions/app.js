var funcs = ["http://www-history.mcs.st-andrews.ac.uk/Curves/Astroid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Bicorn.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cardioid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cartesian.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cassinian.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Catenary.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cayleys.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Circle.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cissoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cochleoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Conchoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Conchoidsl.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Cycloid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Devils.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Double.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Durers.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Eight.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Ellipse.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Epicycloid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Epitrochoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Equiangular.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Fermats.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Folium.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Foliumd.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Freeths.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Frequency.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Hyperbola.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Hyperbolic.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Hypocycloid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Hypotrochoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Involute.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Kampyle.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Kappa.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Lame.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Lemniscate.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Limacon.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Lissajous.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Lituus.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Neiles.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Nephroid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Newtons.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Parabola.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Pearls.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Pearshaped.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Plateau.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Pursuit.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Quadratrix.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Rhodonea.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Right.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Serpentine.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Sinusoidal.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Spiral.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Spiric.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Straight.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Talbots.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Tractrix.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Tricuspoid.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Trident.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Trifolium.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Trisectrix.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Tschirnhaus.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Watts.html", "http://www-history.mcs.st-andrews.ac.uk/Curves/Witch.html"];
console.log(funcs[0]);
//funcs.forEach(function(k,v,i) {
	//console.log('k');
	$.ajax({
		type:	"GET",
		url:	funcs[0],
		//dataType: "jsonp",
		success: function(data){
			console.log(data);
		}
	});
	
//});