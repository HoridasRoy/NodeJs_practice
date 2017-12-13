var http = require('http');
var mod1 = require('./module1');
var mod2 = require('./module2');

function onRequest(request, response)
{
	response.writeHead(200, {'Content-type': 'text/plain'});
	response.write('Hello World ..... ');
	response.write(mod1.str);
	response.write(mod2.myVariable);
	mod2.myFunction();
	mod1.fun();

	response.end();
}

http.createServer(onRequest).listen(8000);