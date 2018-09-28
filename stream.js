process.stdin.setEncoding('utf8')

process.stdout.write('Child Started')

process.stdin.on('readable', () => {
	const chunk = process.stdin.read()
	if (chunk !== null) {
		process.stdout.write(`data: ${chunk}`)
	}
})

process.stdin.on('end', () => {
	process.stdout.write('end')
})
