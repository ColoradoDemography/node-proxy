
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed


var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;
    var firstdir = pathname.split("/");
    console.log(firstdir);
    
    console.log(hostname);
    console.log(pathname);

    switch(firstdir)
    {
        case 'lookups':
            proxy.web(req, res, { target: 'http://lookups:4001' });
            break;
        default:
            proxy.web(req, res, { target: 'http://shinyserver:3838' });
    }
}).listen(3000, function() {
    console.log('proxy listening on port 3000');
});
