'user strict';
const jade = require('jade');
const Acc = require('./acc');

function handle(req, res) {
	switch(req.method)
	{
	case 'POST':
		let body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			const decoded = decodeURIComponent(body);
			const params = decoded.split('&');
			var map = new Map();
			for(var i in params)
			{
				const val = params[i].split('=');
				map.set(val[0], val[1]);
				console.log(val[0]+':'+map.get(val[0]));
			}
			const ip = getIP(req);
			Acc.create({
				ip: ip,
				title: map.get('title'),
				url: map.get('url'),
				user_id: map.get('user_id'),
				mail: map.get('mail'),
				password: map.get('password'),
				description: map.get('description'),
			}).then(() => {
				handleRedirectPosts(req, res);
			});
		});
		break;
	default:
		res.end("default");
		break;
	}
}

function getIP(req)
{
	if(req.headers['x-forwarded-for'])
	{
		return req.headers['x-forwarded-for'];
	}
	if(req.connection && req.connection.remoteAddress) 
	{
		return req.connection.remoteAddress;
	}
	if(req.connection.socket && req.connection.socket.remoteAddress)
	{
		return req.connection.socket.remoteAddress;
	}
	if(req.socket && req.socket.remoteAddress)
	{
		return req.socket.remoteAddress;
	}
	return '0.0.0.0';
}

function handleRedirectPosts(req, res) {
	res.writeHead(303, {
		'Location': '/'
	});
	res.end();
}

module.exports = {
	handle: handle
};
