exports = module.exports = function() {

  return function apt(host, sh, done) {
    sh.exec('apt-get -h').then(function(io) {
      // TODO: Register this under "apt" as well.
      
      host.facility('package', require('./facility'));
      return done();
    });
  }
}
