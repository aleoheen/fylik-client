module.exports = {

	outputDir: 'docs',

	pages: {
		index: {
			template: './src/index.pug',
			entry: './src/main.js'
		},
		'404': {
			template: './src/index.pug',
			entry: './src/main.js'
		}
	},

	pwa: {
		name: 'Fylik',
		themeColor: '#f44336',
		msTileColor: '#f44336'
	}

}