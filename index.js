var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//

// docker run --name nodeproxy -p 80:3000 -d royhobbstn/node-proxy
// change 80 to 443 when SSL installed
// new name of image might be codemog/node-proxy

httpProxy.createProxyServer({target:'http://127.0.0.1:4001',localAddress:'127.0.0.1'}).listen(3000); // See (†)

// Listen for the `error` event on `proxy`.
httpProxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});