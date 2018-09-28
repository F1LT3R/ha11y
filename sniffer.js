const fs = require('fs')
process.stdin.setEncoding('utf8')

const jsdom = require('jsdom')
const {JSDOM} = jsdom

let data = ''

process.stdin.on('readable', () => {
	const chunk = process.stdin.read()
	if (chunk !== null) {
		data += chunk
	}
})

process.stdin.on('end', () => {
	fs.readFile('./HTML_CodeSniffer/HTMLCS.js', 'utf8', (err, javascript) => {
		if (err) {
			process.stderr.write(`error: ${err}`)
		}


		const dom = new JSDOM(data, {
			runScripts: 'dangerously'
		})

		dom.window.eval(javascript)
		dom.window.HTMLCS.process('WCAG2AAA', dom.window.document)
		const messages = dom.window.HTMLCS.getMessages()
		process.stdout.write(JSON.stringify(messages))
	})
})
