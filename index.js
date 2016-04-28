
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed


var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

var sslobj={		
        key: 'ssl/docker/gis_dola_colorado_gov.key',
        cert: 'ssl/docker/ServerCertificate.crt',
        ca: [
            'ssl/docker/Intermediate1.crt',
            'ssl/docker/Intermediate2.crt'
        ]
};

httpProxy.createServer({
  target: {
    host: 'shinyserver',
    port: 3838
  },
  ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  }
}).listen(3000);

// http.createServer(sslobj, function(req, res) {
//     var hostname = req.headers.host.split(":")[0];
//     var pathname = url.parse(req.url).pathname;
//     var firstdir = pathname.split("/");
//     console.log(firstdir);
    
//     console.log(hostname);
//     console.log(pathname);

//     switch(firstdir[1])
//     {
//         case 'lookups':
//             proxy.web(req, res, { target: 'http://lookups:4001' });
//             break;
//         default:
//             proxy.web(req, res, { target: 'http://shinyserver:3838' });
//     }
// }).listen(3000, function() {
//     console.log('proxy listening on port 3000');
// });
