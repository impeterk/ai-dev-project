/**
 * Prints a log message with a label and value.
 *
 * @param {string} label * The label for the log message.
 * @param {any} value * The value to be logged.
 * @returns {void}
 */
export function printLog(label, value) {
	console.log('                                             ');
	console.log(
		'************************' + new Date().toLocaleTimeString() + '**********************'
	);
	console.log(label + ':');
	console.log(value);
	console.log(
		'************************' + new Date().toLocaleTimeString() + '**********************'
	);
	console.log('                                            ');
}
