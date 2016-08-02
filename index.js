
//redirect http to https

// http://heyrod.com/snippets/redirect-http-to-https-in-expressjs.html
var http = require('http');
var express = require('express');
var HTTP_PORT  = 80;
var HTTPS_PORT = 443;

var http_app = express();
http_app.set('port', HTTP_PORT);

http_app.all('/*', function(req, res, next) {
  if (/^http$/.test(req.protocol)) {
    var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any
    if ((HTTPS_PORT != null) && HTTPS_PORT !== 443) {
      return res.redirect("https://" + host + ":" + HTTPS_PORT + req.url, 301);
    } else {
      return res.redirect("https://" + host + req.url, 301);
    }
  } else {
    return next();
  }
});


http.createServer(http_app).listen(HTTP_PORT).on('listening', function() {
  return console.log("HTTP to HTTPS redirect app launched.");
});


// Redbird

// WILL NEED TO CHANGE IF NOT USING STATE SSL

var sslobj={
        port: 443,
        key: 'ssl/docker/gis_dola_colorado_gov.key',
        cert: 'ssl/docker/ServerCertificate.crt',
        ca: 'ssl/docker/ChainBundle2.crt'
};

var redbird = require('redbird')({
  port: 443
  ,ssl: sslobj
});

redbird.register('gis.dola.colorado.gov/apps', 'http://shiny-server:3838', {ssl: true});

redbird.register('gis.dola.colorado.gov/lookups', 'http://demoglookup:4001', {ssl: true});
redbird.register('gis.dola.colorado.gov/capi', 'http://censusapi:4002', {ssl: true});
redbird.register('gis.dola.colorado.gov/cmap', 'http://censusmap:4003', {ssl: true});
redbird.register('gis.dola.colorado.gov/grants', 'http://cogrants:4004', {ssl: true});
redbird.register('gis.dola.colorado.gov/pt2pl', 'http://pt2pl:4005', {ssl: true});
redbird.register('gis.dola.colorado.gov/sd', 'http://sdapi:4006', {ssl: true});
redbird.register('gis.dola.colorado.gov/phantom', 'http://phantom:4007', {ssl: true});
