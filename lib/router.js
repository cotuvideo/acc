'use strict';
const jade = require('jade');

function route(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf8',
		'Set-Cookie': 'test=hoge'
	});
	switch(req.method)
	{
	case 'GET':
		res.write(jade.renderFile('./views/index.jade', {}));
		break;
	case 'POST':
		res.write('post<br>\n');
		break;
	default:
		res.write('default<br>\n');
		break;
	}
	res.write(req.headers['user-agent']+'<br>\n');
	const cookie = req.headers.cookie || 'empty';
	res.write(cookie+'<br>\n');
	res.end('end');
}

module.exports = {
	route: route
};
