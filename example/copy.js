var outfile = require('../');
var fs = require('fs');
var xtend = require('xtend');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: { o: 'outfile' }
});

var outputs = [];

argv._.forEach(function (file, ix) {
    var env = xtend(process.env, { FILE: file });
    var out = outfile(argv.outfile, { env: env });
    outputs.push.apply(outputs, out);
    
    var out = outputs[ix] || process.stdout;
    fs.createReadStream(file).pipe(out);
});
