import bowerResolve from 'rollup-plugin-bower-resolve';
import buble from 'rollup-plugin-buble';

export default {
	entry: 'client/js/main.js',
	// dest: '.tmp/bundle.js',
	plugins: [
		bowerResolve(),
		buble()
	],
	// format: 'umd'
	targets: [
		{dest: '.tmp/bundle.cjs.js', format: 'cjs'},
		{dest: '.tmp/bundle.umd.js', format: 'umd'},
		{dest: '.tmp/bundle.es.js', format: 'es'}
	]
};