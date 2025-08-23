import path from "path";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default {
	mode: 'development',
	entry: './src/index.ts',
	cache: {
		type: 'filesystem',
		buildDependencies: { config: [__filename] }
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'@qazzian/pixel-game-engine': path.resolve(__dirname, '../pixel-game-engine/esm'),
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 8081,
	},
};
