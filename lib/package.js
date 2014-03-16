function Package(name, options) {
  options = options || {};
  this.name = name;
  this.status = 'not-installed';
  this.version = undefined;
}

Package.prototype.install = function(sh, options, cb) {
  var self = this
    , cmd = 'apt-get'
    , args = [ '-y', 'install', this.name ];
  
  if (options.version) {
    args.pop();
    args.push(this.name + '=' + options.version);
  }
  
  sh.exec(cmd + ' ' + args.join(' ')).then(function(io) {
    return cb();
  }, function(err) {
    return cb(err);
  });
}

// TODO: Re-implement these functions
/*
APTPackage.prototype.remove = function(c, options, cb) {
  if (this.status == 'not-installed') { return cb(); }

  var command = 'apt-get';
  var args = [ '-y', 'remove', this.name ];
  
  c.exec(command, args, function(err, cmd) {
    if (err) { return cb(err); }
    
    cmd.on('data', function(data, ext) {
    });
    cmd.on('exit', function(code, signal) {
      if (code !== 0) { return cb(new Error("Failed to remove '" + self.name + "'")); };
      return cb();
    });
  });
};

APTPackage.prototype.purge = function(c, options, cb) {
  if (this.status == 'not-installed') { return cb(); }

  var command = 'apt-get';
  var args = [ '-y', 'purge', this.name ];
  
  c.exec(command, args, function(err, cmd) {
    if (err) { return cb(err); }
    
    cmd.on('data', function(data, ext) {
    });
    cmd.on('exit', function(code, signal) {
      if (code !== 0) { return cb(new Error("Failed to purge '" + self.name + "'")); };
      return cb();
    });
  });
};
*/


module.exports = Package;
