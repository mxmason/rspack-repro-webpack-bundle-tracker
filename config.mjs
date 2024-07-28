import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBundleTracker from 'webpack-bundle-tracker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
	throw new Error('Unknown bundler');
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
	mode: 'development',
	devtool: false,
	entry: {
		main: './src/index',
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new WebpackBundleTracker({
			filename: isRunningWebpack ? 'webpack-stats.json' : 'rspack-stats.json',
			path: __dirname,
		}),
	],
	output: {
		clean: true,
		path: isRunningWebpack
			? path.resolve(__dirname, 'webpack-dist')
			: path.resolve(__dirname, 'rspack-dist'),
		filename: '[name].js',
	},
	experiments: {
		css: true,
	},
};

export default config;
