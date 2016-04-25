
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed

//var http = require('http');
//var httpProxy = require('http-proxy');

//httpProxy.createServer({
//  hostnameOnly: true,
//  router: {
//    '/lookups': 'http://104.197.166.228:4001',
//    '/shiny' : 'http://104.197.166.228:3838'
//  }
//}).listen(3000);


var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;

    console.log(hostname);
    console.log(pathname);

    switch(hostname)
    {
        case 'foo.loc':
            proxy.web(req, res, { target: 'http://localhost:9001' });
            break;
        case 'bar.loc':
            proxy.web(req, res, { target: 'http://localhost:9002' });
            break;
        default:
            proxy.web(req, res, { target: 'http://localhost:9003' });
    }
}).listen(3000, function() {
    console.log('proxy listening on port 3000');
});

// We simulate the 3 target applications
http.createServer(function(req, res) {
    res.end("Request received on 9001");
}).listen(9001);

http.createServer(function(req, res) {
    res.end("Request received on 9002");
}).listen(9002);

http.createServer(function(req, res) {
    res.end("Request received on 9003");
}).listen(9003);
