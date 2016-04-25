var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//

// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed

var options = {
  pathnameOnly: true,
  router: {
    '/lookups': 'http://104.197.166.228:4001',
    '/shiny': 'http://104.197.166.228:3838'
  }
};

// bind to port 80 on the specified IP address
httpProxy.createProxyServer(options).listen(3000);

//httpProxy.createProxyServer({target:'http://lookups:4001'}).listen(3000); // See (†)
//httpProxy.createProxyServer({target:'http://shinyserver:3838'}).listen(3000); // See (†)
