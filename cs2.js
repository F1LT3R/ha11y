const fs = require('fs')
const jsdom = require('jsdom')

const {JSDOM} = jsdom

const vConsole = new jsdom.VirtualConsole()

// Forward messages to the console.
vConsole.on('log', message => {
	/* eslint-disable-next-line no-console */
	console.log(message)
})

const htmlBad = '<img src="test.png" />'

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

const dom = new JSDOM(htmlBad,
	{
		runScripts: 'dangerously',
		virtualConsole: vConsole
	}
)

const HTMLCS = fs.readFileSync('./HTMLCS.js', 'utf8')
dom.window.eval(HTMLCS)

// Normal success callback does not seem to fire, (as everything is loaded already, this is syncronous)
dom.window.HTMLCS.process('WCAG2AAA', dom.window.document)

// Log
// const messages = dom.window.HTMLCS.getMessages()
// console.log(messages.length)
// console.log(messages)
