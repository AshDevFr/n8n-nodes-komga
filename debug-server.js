const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	let body = '';

	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	req.on('end', () => {
		// Parse body if it's JSON
		let parsedBody = null;
		if (body) {
			try {
				parsedBody = JSON.parse(body);
			} catch (e) {
				parsedBody = body;
			}
		}

		// Create response object with all request details
		const requestDetails = {
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.url,
			path: parsedUrl.pathname,
			query: parsedUrl.query,
			headers: req.headers,
			body: parsedBody,
		};

		// Create API-like response structure
		const apiResponse = {
			data: [requestDetails],
			meta: {
				total: 1,
				page: 1,
				limit: 1,
			},
		};

		// Log to console
		console.log('\n' + '='.repeat(80));
		console.log('🔍 HTTP Request Received');
		console.log('='.repeat(80));
		console.log('Timestamp:', requestDetails.timestamp);
		console.log('Method:', requestDetails.method);
		console.log('URL:', requestDetails.url);
		console.log('Path:', requestDetails.path);
		console.log('\n--- Query Parameters ---');
		console.log(JSON.stringify(requestDetails.query, null, 2));
		console.log('\n--- Headers ---');
		console.log(JSON.stringify(requestDetails.headers, null, 2));

		if (parsedBody) {
			console.log('\n--- Body ---');
			console.log(JSON.stringify(parsedBody, null, 2));
		}
		console.log('='.repeat(80) + '\n');

		// Set CORS headers
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', '*');

		// Handle preflight
		if (req.method === 'OPTIONS') {
			res.writeHead(200);
			res.end();
			return;
		}

		// Return API-like response with request details
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(200);
		res.end(JSON.stringify(apiResponse, null, 2));
	});
});

server.listen(PORT, '0.0.0.0', () => {
	console.log(`🚀 Debug HTTP Server running on 0.0.0.0:${PORT}`);
	console.log(`📝 All requests will be logged in detail`);
	console.log(`🔄 Returns: Request details as JSON`);
	console.log('='.repeat(80) + '\n');
});
