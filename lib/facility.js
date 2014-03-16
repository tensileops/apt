var Package = require('./package');


exports.read = function(sh, desc, cb) {
  console.log('READ APT!');
  console.log(desc);
  
  sh.exec('dpkg -s ' + desc.name).then(function(io) {
  //sh.exec('dpkg -s ' + 'xauth').then(function(io) {
    // TODO: Register this under "apt" as well.
    
    var stdout = io[0];
    
    var status = /^Status:\s+(.+)$/m
      , version = /^Version:\s+(.+)$/m
      , match;
    
    var pkg = new Package(desc.name);
    match = status.exec(stdout);
    if (match) {
      if (match[1].match(/installed/)) {
        pkg.status = 'installed';
      }
    }
    match = version.exec(stdout);
    if (match) {
      // TODO: parse version according to Debian versioning:
      // http://manpages.ubuntu.com/manpages/natty/man5/deb-version.5.html
      
      pkg.version = match[1];
    }
    
    return cb(null, pkg);
  }, function(err) {
    if (err.code == 1) {
      // not installed
      return cb(null, new Package(desc.name));
    } else {
      return cb(err);
    }
  });
  
}

exports.apply = function(sh, pkg, desc, cb) {
  if (pkg.status == desc.state) { return cb(); }
  
  function done(err) {
    if (err) { return cb(err); }
    // TODO: Supply new state
    return cb();
  }
  
  switch (desc.state) {
    case 'installed':
      pkg.install(sh, desc, done);
      break;
      
      // TODO: Implement support for this
      /*
    case 'absent':
      pkg.remove(c, def, done);
      break;
    case 'purged':
      pkg.purge(c, def, done);
      break;
      */
      
    default:
      return done(new Error("Unknown package state '" + desc.state + "'"));
  }
  
}