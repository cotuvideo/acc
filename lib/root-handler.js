'user strict';
const jade = require('jade');
const Acc = require('./acc');

function handle(req, res)
{
	switch(req.method)
	{
	case 'GET':
		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8'
		});
		Acc.findAll().then((contents) => {
			res.write(req.headers['user-agent']+'<br>\n');
			res.end(jade.renderFile('./views/index.jade', {
				contents: contents
			}));
		});
		break;
	default:
		res.end('default');
		break;
	}
}

module.exports = {
	handle: handle
};
