var url = require('url');
var fs = require('fs');


function renderHTML(path, response)
{
	fs.readFile(path, null, function(error,data){

		if(error)
		{
			response.writeHead(404);
			response.write('Error! file not found');
		}
		else
		{
			response.write(data);
		}

		response.end();
	});
}

module.exports ={
	handleRequest : function(request, response){

		response.writeHead(200,{'Content-type': 'text/html'});

		var path = url.parse(request.url).pathname 

		switch(path){

			case '/':
				response.writeHead(200, {'Content-type': 'text/plain'});
				response.write('Hello world .. this is the main page ..');
				response.end();
				break;

			case '/index':
				renderHTML('./index.html', response);
				break;

			case '/login':
				renderHTML('./login.html',response);
				break;

			default:
				response.writeHead(404);
				response.write('page not found');
				response.end();

		}
	}
};

/*
function handleRequest(request, response)
{
	response.writeHead(200,{'Content-type': 'text/html'});

	var path = url.parse(request.url).pathname

	switch(path){

		case '/':
			renderHTML(path, response);
			break;

		case '/login':
			renderHTML(path, response);
			break;

		default:
			response.writeHead(404);
			response.write('Error! file not found');
			response.end();


	}
}

module.exports.fun = handleRequest;

*/