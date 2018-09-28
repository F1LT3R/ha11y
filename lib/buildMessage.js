'use strict';
// Const chromafi = require('chromafi');

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.ignoredCheck = exports.default = undefined;

const _underscore = require('underscore');

const _underscore2 = _interopRequireDefault(_underscore);

const _getElementPosition = require('./getElementPosition');

const _getElementPosition2 = _interopRequireDefault(_getElementPosition);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : {default: obj};
}

const ignoredCheck = function ignoredCheck(ignoredRules, error) {
	if (!error) {
		return false;
	}

	return _underscore2.default.some(ignoredRules, rule => {
		return error.startsWith(rule);
	});
};

const buildMessage = function buildMessage(msg, fileContents, _ref) {
	// Const ignore = _ref.ignore

	// const reportLevelsArray = _ref.reportLevelsArray

	const msgSplit = msg.split('|');
	let message = void 0;

	// Const ignored = ignoredCheck(ignore, msgSplit[1])

	// if (ignored) {
	// 	return message
	// }

	// Start the Logging if the the report level matches
	// if (_underscore2.default.contains(reportLevelsArray, msgSplit[0])) {

	const position = (0, _getElementPosition2.default)(msgSplit[3], fileContents);

	// Console.log(chromafi(msgSplit[3] || '', {lang: 'html', lineNumberStart: position.lineNumber}));

	message = {
		heading: msgSplit[0],
		issue: msgSplit[1],
		description: msgSplit[2],
		position,
		element: {
			node: msgSplit[3],
			class: msgSplit[4],
			id: msgSplit[5]
		}
	};
	// }

	// Return the message for reports
	return message;
};

exports.default = buildMessage;
exports.ignoredCheck = ignoredCheck;
