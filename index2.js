const fs = require('fs')
const {spawn} = require('child_process')

const test = html => new Promise((resolve, reject) => {
	const ls = spawn('node', ['./sniffer.js'])
	let result = ''

	ls.stdout.on('data', data => {
		result += data
	})

	ls.stderr.on('data', data => {
		console.error(`stderr: ${data}`)
		// reject(data)
	})

	ls.on('close', () => {
		resolve(JSON.parse(result))
	})

	ls.stdin.end(html)
})

const sniffTests = []
const jestHtmlPage = String(fs.readFileSync('./test.html'))
for (let i = 0; i < 40; i++) {
	sniffTests.push(test(jestHtmlPage))
}

const timeStart = Number(new Date())
Promise.all(sniffTests)
	.then(results => {
		console.log(results)
		const timeEnd = Number(new Date())
		const timeElapsed = timeEnd - timeStart
		console.log('Done!')
		console.log(timeElapsed)
	})
	.catch(err => {
		console.error(err)
	})
