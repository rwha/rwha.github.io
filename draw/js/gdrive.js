var CLIENT_ID = '250137569211-thdglqpmqkfiqr5t3l7q3a77947qv7vr.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/drive.appfolder'];
var appfolder;

function checkAuth() {
	gapi.auth.authorize({
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize');
	if (authResult && !authResult.error) {
		authorizeDiv.style.display = 'none';
		loadDriveApi();
	} else {
		authorizeDiv.style.display = 'inline';
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({
		client_id: CLIENT_ID, 
		scope: SCOPES, 
		immediate: false},
	handleAuthResult);
	return false;
}

function loadDriveApi() {
	gapi.client.load('drive', 'v2', listFiles);
}

function listFiles(callback) {
	if(!callback) {
		callback = function(files) {
			for(var f=0,n=files.length;f<n;f++) {
				var li = $('<li>')
					.text(files[f].title)
					.attr('id', files[f].id)
					.click(function(){
						console.log(this.id);
					});
				$("#filelist").append(li);
			}
		}
	}
	
	var retrieveFiles = function(request,result) {
		request.execute(function(resp) {
			result = result.concat(resp.items);
			var nextPageToken = resp.nextPageToken;
			if(nextPageToken) {
				request = gapi.client.drive.files.list({
					'pakeToken': nextPageToken
				});
				retrieveFiles(request,result);
			} else {
				callback(result);
			}
		});
	}
	
	var request = gapi.client.drive.files.list({
		'q': '\'appfolder\' in parents'
	});
	retrieveFiles(request, []);
}

function gd_insertFile(filename, text, callback) {
	const boundary = '-------314159265358979323846';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";

	var contentType = "application/json";
	var metadata = {
		'mimeType': contentType,
		'title': filename + '.json',
		'parents': [{'id': 'appfolder'}]
	};

	var multipartRequestBody =
		delimiter +  'Content-Type: application/json\r\n\r\n' +
		JSON.stringify(metadata) +
		delimiter + 'Content-Type: ' + contentType + '\r\n' + '\r\n' +
		text +
		close_delim;

	if (!callback) { 
		callback = function(file) { 
			console.log("Update Complete ",file) 
		}; 
	}
	var request = gapi.client.request({
		'path': '/upload/drive/v2/files/',
		'method': 'POST',
		'params': {'uploadType': 'multipart'},
		'headers': {'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'},
		'body': multipartRequestBody
	});
	request.execute(callback);
}