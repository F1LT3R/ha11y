const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');
const Shared = require('mmap-object');

const htmlCodeSnifferSrc = path.join(
	__dirname, '..', 'HTML_CodeSniffer', 'HTMLCS.min.js'
);

const snifferChildPath = path.join(
	__dirname, 'sniffer-child.js'
);

const state = {
	ready: false
};

const loadHtmlCodeSniffer = () => new Promise((resolve, reject) => {
	fs.readFile(htmlCodeSnifferSrc, 'utf8', (error, htmlCodeSnifferScript) => {
		if (error) {
			return reject(error);
		}

		const sharedObject = new Shared.Create('HTMLCodeSnifferScript');
		sharedObject.src = htmlCodeSnifferScript;

		resolve(0);
	});
});

loadHtmlCodeSniffer().then(() => {
	state.ready = true;
}).catch(error => {
	throw error;
});

const childProcessStack = [];

const spawnChildTest = html => new Promise((resolve, reject) => {
	const child = spawn('node', [snifferChildPath]);

	childProcessStack.push(child);

	let testOutput = '';

	const stdout = chunk => {
		testOutput += chunk;
	};

	const stderr = chunk => {
		/* eslint-disable-next-line no-console */
		console.error(`stderr: ${chunk}`);
		reject(chunk);
	};

	const close = () => {
		const results = JSON.parse(testOutput);
		resolve(results);
	};

	child.stdout.on('data', stdout);
	child.stderr.on('data', stderr);
	child.on('close', close);

	child.stdin.end(html);
});

module.exports = {
	setup: config => {
		// Set up level, ignores, etc
		return config;
	},

	test: html => new Promise((resolve, reject) => {
		spawnChildTest(html)
			.then(results => {
				/* eslint-disable-next-line no-console */
				console.log(results);
				resolve(results);
			})
			.catch(reject);
	})
};

// TEST CODE
// const sampleHtml = String(fs.readFileSync('./test.html'));
// // // const sampleHtml = '<html><img src="foo"/></html>';

// const sniffTests = [];
// // for (let i = 0; i < 10; i++) {
// 	sniffTests.push(module.exports.test(sampleHtml));
// // }

// const timeStart = Number(new Date());
// Promise.all(sniffTests)
// 	.then(results => {
// 		const timeEnd = Number(new Date());
// 		const timeElapsed = timeEnd - timeStart;
// 		results.forEach(result => {
// 			/* eslint-disable-next-line no-console */
// 			console.log(result);
// 		});

// 		/* eslint-disable-next-line no-console */
// 		console.log('Done!');
// 		/* eslint-disable-next-line no-console */
// 		console.log(timeElapsed);
// 	})
// 	.catch(error => {
// 		/* eslint-disable-next-line no-console */
// 		console.error(error);
// 	});

