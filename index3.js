const fs = require('fs')
const sniffer2 = require('./sniffer2')

// Bad HTML
const htmlBad = '<img alt="Test image" src="test.png" />'

// Good HTML
const htmlGood = `
	<html lang="en">
		<head>
			<title>Foobar is the awesome of things!</title>
		<head>
		<body>
			<img alt="Test image" src="test.png" />
		</body>
	</html>`

const sniffTests = []

const jestHtmlPage = String(fs.readFileSync('./test.html'))
for (let i = 0; i < 40; i++) {
	sniffTests.push(sniffer2(jestHtmlPage))
}
const timeStart = Number(new Date())
Promise.all(sniffTests)
	.then(results => {
		// Console.log(results)
		const timeEnd = Number(new Date())
		const timeElapsed = timeEnd - timeStart
		console.log('Done!')
		console.log(timeElapsed)
	})
	.catch(error => {
		console.error(error)
	})

// Ls.stdin.write('foo bar ')
// setTimeout(() => {
// 	ls.stdin.end('baz qux')
// }, 1000)
