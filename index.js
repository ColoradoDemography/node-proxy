
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed

var http = require('http');
var httpProxy = require('http-proxy');
var httpProxy.createServer({
  hostnameOnly: true,
  router: {
    '/lookups': 'lookups:4001',
    '/shiny' : 'shinyserver:3838'
  }
}).listen(3000);
