const fs = require('fs')
const Shared = require('mmap-object')

const readOnlySharedObject = new Shared.Open('HTMLCSJS')

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
	const dom = new JSDOM(data, {
		runScripts: 'dangerously',
		pretendToBeVisual: true,
		resources: 'usable'
	})

	dom.window.eval(String(readOnlySharedObject.foo))
	dom.window.HTMLCS.process('WCAG2AAA', dom.window.document)
	const messages = dom.window.HTMLCS.getMessages()
	process.stdout.write(JSON.stringify(messages))
})
