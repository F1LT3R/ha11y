const fs = require('fs')
const path = require('path')
// Const jsdom = require('jsdom/lib/old-api')
const jsdom = require('jsdom')
const Promise = require('bluebird')

const buildMessages = require('./buildMessage')
// console.log(buildMessages)

const {JSDOM} = jsdom
const vConsole = new jsdom.VirtualConsole()

const messages = []

// Forward messages to the console.
vConsole.on('log', message => {
	// Console.log(message)
	messages.push(message)
})

const script = String(fs.readFileSync(path.join(__dirname, 'HTML_CodeSniffer', 'HTMLCS.min.js')))

// const html = '<html><img src="foo"/></html>'
const html = String(fs.readFileSync(path.join(__dirname, 'test.html')))

const RunJsDomInstance = (file, accessibilityLevel) => {
	return new Promise((resolve, reject) => {
		const dom = new JSDOM(html, {
			runScripts: 'dangerously',
			pretendToBeVisual: true,
			resources: 'usable',
			virtualConsole: vConsole
		})

		dom.window.eval(script)
		dom.window.HTMLCS_RUNNER.run('WCAG2AAA')
		// If (validator.isURL(file)) {
		// 	reject('JsDom Cannot render urls, please set the browser option to true');
		// } else if (fs.existsSync(file)) {
		// jsDomOptions.file = file;
		// } else {
		// jsDomOptions.html = html
		// }

		// vConsole.on('log', message => {
		// 	if (message === 'done') {
		// 		resolve(messages)
		// 	} else {
		// 		messages.push([accessibilityLevel, message])
		// 	}
		// })

		// jsdom.env(dom)
		// console.log(messages[0])

		messages.forEach(message => {
			console.log(buildMessages.default(message, html))
		})
	})
}

RunJsDomInstance(null, 'WCAG2AAA')
