import { openai, defaultConfig } from './config';
import { getEncoding } from 'js-tiktoken';

/**
 * Sends a text to the OpenAI API using provided messages and a max token limit.
 * If the response is successful and contains choices, it returns the first choice's message content.
 * Otherwise, it throws an error indicating an unexpected response.
 *
 * @param {Array} messages - An array of message objects to provide context to the API.
 * @param {number} maxTokens - The maximum number of tokens that the completion should contain.
 * @returns {Object} - Returns an object containing a success boolean and either content or error.
 */
export async function aiRequest(messages, maxTokens) {
	try {
		const response = await openai.chat.completions.create(defaultConfig(messages, maxTokens));
		if (response && response.choices && response.choices.length > 0) {
			return { success: true, content: response.choices[0].message.content.trim() };
		} else {
			throw new Error('Unexpected response from OpenAI API');
		}
	} catch (error) {
		return { success: false, error };
	}
}

/**
 * Truncates a given text to fit within a specified token limit using the GPT-2 encoding.
 * If the text is already within the limit, it returns the original text.
 * Otherwise, it iteratively trims characters from the end of the text until it fits the limit.
 *
 * @param {string} text - The input text string to truncate.
 * @returns {string} - Returns the truncated text string that fits within the token limit.
 */
export function truncateTextToTokens(text) {
	const MAX_CONTEXT_TOKENS = 8150; // GPT-3's limit, adjust if using a different model
	const enc = getEncoding('gpt2');

	let tokens = enc.encode(text);

	if (tokens.length <= MAX_CONTEXT_TOKENS) {
		return text; // Return original text if within the token limit
	}

	let truncatedText = text;

	// Reduce text size iteratively until it fits within the token limit
	while (tokens.length > MAX_CONTEXT_TOKENS) {
		truncatedText = truncatedText.slice(0, -1); // Remove one character
		tokens = enc.encode(truncatedText); // Re-encode the truncated text to get the new token count
	}

	return truncatedText;
}

/**
 * Attempts to execute a provided AI function prompt while managing potential rate limit errors from the OpenAI API.
 * If the function encounters a rate limit error, it waits for a specified delay and tries again.
 * The function doubles the delay after each retry to ensure increasing intervals between attempts.
 * If the function exhausts all retry attempts or encounters an error other than rate limiting, it throws an error.
 *
 * @param {Function} func - The function to execute that may encounter rate limiting.
 * @param {...any} args - The arguments to pass to the provided function.
 * @returns {string} - Returns the content from the successful function execution.
 * @throws Will throw an error if it encounters an unexpected error or exceeds maximum retries.
 */
export async function limitChecker(func, ...args) {
	const MAX_RETRIES = 5;
	let delay = 150;
	let retries = 0;

	while (retries < MAX_RETRIES) {
		try {
			const response = await func(...args);
			if (response.success) {
				return response.content;
			} else {
				throw response.error;
			}
		} catch (error) {
			if (error.message && error.message.includes('Rate limit reached')) {
				const remainingRequests =
					error.headers && typeof error.headers.get === 'function'
						? parseInt(error.headers.get('x-ratelimit-remaining-requests'))
						: 0;
				const resetTimeRequests =
					error.headers && typeof error.headers.get === 'function'
						? parseFloat(error.headers.get('x-ratelimit-reset-requests'))
						: 60;
				// if there's only one request left before hitting the rate limit,
				// the function waits until the rate limit resets.
				console.log('---START OF AI API LOG---');
				console.log('Remaining requests: ' + remainingRequests);
				console.log('Reset Time Requests: ' + resetTimeRequests);
				console.log('---END OF AI API LOG---');
				if (remainingRequests <= 1) {
					console.log('Resolving  <= 1 if statement:');
					await new Promise((resolve) => setTimeout(resolve, resetTimeRequests * 1000));
				}
				if (retries < MAX_RETRIES) {
					await new Promise((resolve) => setTimeout(resolve, delay));
					delay *= 2;
					retries += 1;
					console.log('Waiting for delay: ');
					console.log(delay);
				} else {
					throw new Error('Rate limit handling: Maximum retries reached');
				}
			} else {
				throw error;
			}
		}
	}
}
