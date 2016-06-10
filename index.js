
// docker run --name nodeproxy --link lookups:lookups --link shinyserver:shinyserver -p 80:3000 -d codemog/node-proxy
// change 80 to 443 when SSL installed

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
