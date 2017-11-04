'use strict';
const rootHandler = require('./root-handler');
const insertHandler = require('./insert-handler');

function route(req, res) {
	switch(req.url)
	{
	case '/':
		rootHandler.handle(req, res);
		break;
	case '/insert':
		insertHandler.handle(req, res);
		break;
	default:
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf8'
	});
	res.write(req.headers['user-agent']+'<br>\n');
	const cookie = req.headers.cookie || 'empty';
	res.write(cookie+'<br>\n');
	res.end('end');
		break;
	}
}

module.exports = {
	route: route
};
