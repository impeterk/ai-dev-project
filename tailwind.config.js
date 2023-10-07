/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary': '#191770',
				'secondary': '#E7E9FF',
				'success': '#60ECA9',
				'error': '#FF006B',
				'warning': '#FFF500'
			}
		}
	},
	plugins: []
};
