const diff = require('jest-diff')
const stripAnsi = require('strip-ansi')

module.exports = {
	test(value) {
		return value && value.diffA != null && value.diffB != null
	},

	print(value, serialize) {
		const serializedA = serialize(value.diffA)
		const serializedB = serialize(value.diffB)
		return stripAnsi(
			diff(serializedA, serializedB, {
				expand: false,
				colors: false,
				contextLines: -1, // Forces to use default from Jest
				aAnnotation: 'Diff A',
				bAnnotation: 'Diff B',
			})
		)
	},
}
