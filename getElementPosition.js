'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
const startOfLineIndex = function startOfLineIndex(lines, line) {
	const x = lines.slice(0)

	x.splice(line - 1)

	return x.join('\n').length + (x.length > 0)
}

const getLineFromPos = function getLineFromPos(content, index) {
	const lines = content.split('\n')
	const lineNumber = content.substr(0, index).split('\n').length
	let columnNumber = index - startOfLineIndex(lines, lineNumber)

	if (columnNumber < 0) {
		columnNumber = 0
	}

	return {lineNumber, columnNumber}
}

const getElementPosition = function getElementPosition(htmlString, fileContents) {
	const index = fileContents.indexOf(htmlString)
	const position = getLineFromPos(fileContents, index)

	return position
}

exports.default = getElementPosition
