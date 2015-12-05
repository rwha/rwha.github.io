client secret:	fIO_VvQp6FOsITKrNFlEOf1T

function gd_updateFile(fileId, text, callback) {

    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var contentType = "application/json";
    var metadata = {
		'mimeType': contentType,
		'title': filename + '.json',
		'description': ''
		};

    var multipartRequestBody =
        delimiter +  'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter + 'Content-Type: ' + contentType + '\r\n' + '\r\n' +
        text +
        close_delim;

    if (!callback) { callback = function(file) { console.log("Update Complete ",file) }; }

    gapi.client.request({
        'path': '/upload/drive/v2/files/',
        'method': 'PUT',
        'params': {'fileId': fileId, 'uploadType': 'multipart'},
        'headers': {'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'},
        'body': multipartRequestBody,
        callback:callback,
    });
  }
