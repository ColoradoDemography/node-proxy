var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//

// docker run --name nodeproxy -p 80:3000 -d royhobbstn/node-proxy
// change 80 to 443 when SSL installed
// new name of image might be codemog/node-proxy

httpProxy.createProxyServer({target:'http://lookups:4001'}).listen(3000); // See (†)

