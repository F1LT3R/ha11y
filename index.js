const path = require('path');

const launcher = require(path.join(
	__dirname, 'lib', 'sniffer-launcher.js'
));

module.exports = launcher;
