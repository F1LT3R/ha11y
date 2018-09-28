const fs = require('fs');
const napa = require('napajs');
const jsdom = require('jsdom');

const {JSDOM} = jsdom;
const vConsole = new jsdom.VirtualConsole();

// Forward messages to the console.
vConsole.on('log', message => {
	/* eslint-disable-next-line no-console */
	console.log(message);
});

const HTMLCS = String(fs.readFileSync('./HTML_CodeSniffer/HTMLCS.js'));
const htmlBad = '<img src="test.png" />';

// Good HTML
// const htmlGood = `
// 	<html lang="en">
// 		<head>
// 			<title>Foobar is the awesome of things!</title>
// 		<head>
// 		<body>
// 			<img alt="Test image" src="test.png" />
// 		</body>
// 	</html>`

const zone1 = napa.zone.create('zone1', {workers: 4});

// Broadcast code to all 4 workers in 'zone1'.
// zone1.broadcast('console.log("hello world");')

const dom = new JSDOM(htmlBad, {
	runScripts: 'dangerously'
});
dom.window.eval(HTMLCS);

const htmlCodeSniff = dom => {
	// Normal success callback does not seem to fire, (as everything is loaded already, this is syncronous)
	dom.window.HTMLCS.process('WCAG2AAA', dom.window.document);

	// Const messages = dom.window.HTMLCS.getMessages()
	return messages;
};

// Execute an anonymous function in any worker thread in 'zone1'.
zone1.execute(htmlCodeSniff, [dom, htmlBad])
	.then(results => {
		console.log(results);
	}).catch(err => {
		console.error(err);
	});

// Module.exports = (val, opts) => {
// 	return {val, opts}
// }

// Log
// console.log(messages.length)
// console.log(messages)

