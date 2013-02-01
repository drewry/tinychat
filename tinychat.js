var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	util = require('util'),
	chat = '';

fs.readFile('tinychat.html', function (err, html) {
    if (err) {
        throw err; 
    } 
	
	http.createServer(function (req, res) {
		var pathname = url.parse(req.url).pathname;
		res.writeHead(200, {'Content-Type': 'text/html'});
		
		if (pathname == '/post') {
			if(req.method == 'POST') {
				var postData = '';
				req.on('data', function(data) {
					postData += data;
				});
				req.on('end', function() {
					var post = querystring.parse(postData);
					chat += '<p class="message user-' + post.id + '"><strong>' + post.id + ':</strong> <span>' + post.text + '</span></p>';
					
					var max = 10000;
					if(chat.length > max) {
						var diff = chat.length - max;
						chat = chat.substr(diff, max);
					}
				});
			}
		} else if (pathname == '/get') {
			if(req.method == 'GET') {
				res.write(chat);
			}
		} else {
			res.write(html);
		}
		res.end();
	}).listen(8888, '50.56.242.230');
});