const path = require('path');

const outputFile = 'maze.js';
const outputPath = './public/assets/js';

const mode = 'development';
// const mode = 'production';

const config = {
	entry: './src/index.ts',
	mode: mode,
	output: {
		path: path.resolve(__dirname, outputPath),
		filename: outputFile
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				loader: 'ts-loader',
				test: /\.ts$/,
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
};

module.exports = config;