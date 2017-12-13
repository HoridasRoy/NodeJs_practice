var http = require('http');
function onRequest(req, res)
{
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.write('Hello World, This is my first NodeJs program ......');
	res.end();
}
http.createServer(onRequest).listen(8000);