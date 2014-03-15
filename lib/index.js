exports = module.exports = function() {

  return function apt(host, sh, done) {
    sh.exec('apt-get -h').then(function(io) {
      return done();
    });
  }
}
