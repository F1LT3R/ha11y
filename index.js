const path = require('path');

const launcher = require(path.join(
	__dirname, 'lib', 'sniffer-launcher.js'
));

console.log(launcher);

module.exports = launcher;
