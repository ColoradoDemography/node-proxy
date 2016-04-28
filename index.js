
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed



var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs');



var sslobj={		
        key: fs.readFileSync('ssl/docker/gis_dola_colorado_gov.key', 'utf8'),
        cert: fs.readFileSync('ssl/docker/ServerCertificate.crt', 'utf8'),
        ca: [
            fs.readFileSync('ssl/docker/Intermediate1.crt', 'utf8'),
            fs.readFileSync('ssl/docker/Intermediate2.crt', 'utf8')
        ]
};


httpProxy.createServer( function (req, res, proxy) {

  //proxy.proxyRequest(req, res, { secure: false, target: URL });
  proxy.web(req, res, { target: { host: 'shinyserver', port: 3838 }, ssl: sslobj });
  
}).listen(3000);


// httpProxy.createServer({
//   target: {
//     host: 'shinyserver',
//     port: 3838
//   },
//   ssl: sslobj
// }).listen(3000);


// thats the node http proxy



// var https = require('https'),
//     httpProxy = require('http-proxy'),
//     proxy = httpProxy.createProxy(),
//     url = require('url'),
//     fs = require('fs');



// httpProxy.createServer({
//   target: {
//     host: 'shinyserver',
//     port: 3838
//   },
//   ssl: sslobj
// }).listen(3000);



// httpProxy.createServer(
//   { target: { host: 'shinyserver', port: 3838 }, ssl: sslobj }
//                       ).listen(3000);

// httpProxy.createServer(function(req, res, proxy) {
//     var hostname = req.headers.host.split(":")[0];
//     var pathname = url.parse(req.url).pathname;
//     var firstdir = pathname.split("/");
//     console.log(firstdir);
    
//     console.log(hostname);
//     console.log(pathname);

//     switch(firstdir[1])
//     {
//         case 'lookups':
//             proxy.web(req, res, { target: { host: 'lookups', port: 4001 }, ssl: sslobj });
//             break;
//         default:
//             proxy.web(req, res, { target: { host: 'shinyserver', port: 3838 }, ssl: sslobj });
//     }
// }).listen(3000, function() {
//     console.log('proxy listening on port 3000');
// });
