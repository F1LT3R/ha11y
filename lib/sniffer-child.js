const path = require('path');
const jsdom = require('jsdom');
const Shared = require('mmap-object');

const buildMessages = require(path.join(__dirname, 'buildMessage.js'));

const {JSDOM} = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

let html = '';
const messages = [];

virtualConsole.on('log', message => {
	const messageData = buildMessages.default(message, html);
	messages.push(messageData);
});

const readStream = () => {
	const chunk = process.stdin.read();

	if (chunk !== null) {
		html += chunk;
	}
};

const endStream = () => {
	const dom = new JSDOM(html, {
		runScripts: 'dangerously',
		pretendToBeVisual: true,
		resources: 'usable',
		virtualConsole
	});

	const readOnlySharedObject = new Shared.Open('HTMLCodeSnifferScript');
	const htmlCodeSnifferScript = readOnlySharedObject.src;

	dom.window.eval(htmlCodeSnifferScript);
	dom.window.HTMLCS_RUNNER.run('WCAG2AAA');

	const messageOutput = JSON.stringify(messages);
	process.stdout.write(messageOutput);
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', readStream);
process.stdin.on('end', endStream);
