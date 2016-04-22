'use strict';

var key, 
    enc,
	dec,
	data,
    password = 'abfe8899',
	vector = window.crypto.getRandomValues(new Uint8Array(16));

var stoa = function(str) { 
	var ab = new ArrayBuffer(str.length);
	var abv = new Uint8Array(ab);
	for (var i = 0, l = str.length; i<l; i++) {
		abv[i] = str.charCodeAt(i);
	}
	return ab;
}

var atos = a => String.fromCharCode.apply(null, new Uint8Array(a));

var hex = b => window.crypto.subtle.importKey("raw", b, {name: "AES-CBC"}, false, ["encrypt", "decrypt"]);

var encrypt = data => window.crypto.subtle.encrypt({name: "AES-CBC", iv: vector}, key, stoa(data));
	//.then(ed => enc = new Uint8Array(ed));

var decrypt = data => window.crypto.subtle.decrypt({name: "AES-CBC", iv: vector}, key, data);
	//.then(dd => dec = atos(new Uint8Array(dd)));

(function() {
	window.crypto.subtle.digest("SHA-256", stoa(password))
	.then(hash => hex(hash))
	.then(e => key = e);	
})();

var ebtn = document.getElementById('encrypt_btn');
var dbtn = document.getElementById('decrypt_btn');
var txt = document.getElementById('encrypt_this');
var eout = document.getElementById('enc_out');
var dout = document.getElementById('dec_out');

ebtn.addEventListener('click', function(e) {
	encrypt(txt.value).then(ed => eout.textContent = atos(ed));
});

dbtn.addEventListener('click', function(e) {
	decrypt(stoa(eout.textContent)).then(dd => dout.textContent = atos(new Uint8Array(dd)));
});