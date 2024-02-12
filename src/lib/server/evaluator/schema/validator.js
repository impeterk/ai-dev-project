import axios from 'axios';

/**
 * Validates a schema by sending it to the schema.org validator API.
 * @param {Object} schema - The schema to be validated.
 * @returns {Promise<Object>} - A promise that resolves to the validated schema.
 * @throws {Error} - If an error occurs during the validation process.
 */
export async function validate(schema) {
	try {
		// Convert schema data to URL-encoded string
		const encodedData = `html=${encodeURIComponent(JSON.stringify(schema))}`;

		const validationResult = await axios({
			method: 'post',
			url: 'https://validator.schema.org/validate',
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
				Accept: '*/*',
				'Accept-Language': 'en-US,en;q=0.5',
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Alt-Used': 'validator.schema.org',
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-origin',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache'
			},
			data: encodedData
		});

		// Adjust the JSON string by removing security prefix
		// and encode it to a JSON object
		return JSON.parse(validationResult.data.substring(4));
	} catch (error) {
		// Handle the error here
		console.error(error);

		// Return an appropriate value or rethrow the error
		throw error;
	}
}
