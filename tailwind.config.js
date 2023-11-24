/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary': '#191770',
				'secondary': '#E7E9FF',
				'accent': '#8C00CF',
				'link': '#0038FF',
				'success': '#60ECA9',
				'error': '#FF006B',
				'warning': '#FFF500',
				'base': '#f8fafc',
				'body': '#751CDC',
				'meta': '#7B61FF',
				'social': '#AC73E6',
				'schema': '#8D00CF'

			}
		}
	},
	plugins: []
};
