const fs = require('fs')
const {spawn} = require('child_process')
const Shared = require('mmap-object')

const HTMLCSJS = String(fs.readFileSync('./HTML_CodeSniffer/HTMLCS.min.js'))
const sharedObject = new Shared.Create('HTMLCSJS')
sharedObject.foo = HTMLCSJS

const test = html => new Promise((resolve, reject) => {
	const ls = spawn('node', ['./sniffer.js'])
	let result = ''

	ls.stdout.on('data', data => {
		result += data
	})

	ls.stderr.on('data', data => {
		console.error(`stderr: ${data}`)
		// Reject(data)
	})

	ls.on('close', () => {
		resolve(result)
	})

	ls.stdin.end(html)
})

const sniffTests = []
// Const jestHtmlPage = String(fs.readFileSync('./test.html'))
const jestHtmlPage = '<html><img src="foo"/></html>'
for (let i = 0; i < 1; i++) {
	sniffTests.push(test(jestHtmlPage))
}

const timeStart = Number(new Date())
Promise.all(sniffTests)
	.then(results => {
		results.forEach(result => {
			console.log(result)
		})

		const timeEnd = Number(new Date())
		const timeElapsed = timeEnd - timeStart
		console.log('Done!')
		console.log(timeElapsed)
	})
	.catch(err => {
		console.error(err)
	})
