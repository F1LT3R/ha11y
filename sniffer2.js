const fs = require('fs')
const jsdom = require('jsdom')

const {JSDOM} = jsdom
// const vConsole = new jsdom.VirtualConsole()

// Forward messages to the console.
// vConsole.on('log', message => {
// 	 eslint-disable-next-line no-console
// 	console.log(message)
// })

const js = String(fs.readFileSync('./HTML_CodeSniffer/HTMLCS.js'))

module.exports = html => new Promise((resolve, reject) => {
	const dom = new JSDOM(html, {
		runScripts: 'dangerously',
		// virtualConsole: vConsole
	})

	dom.window.eval(js)
	dom.window.HTMLCS.process('WCAG2AAA', dom.window.document)
	const messages = dom.window.HTMLCS.getMessages()
	resolve(messages)
})

