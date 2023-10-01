import { openai, defaultConfig } from './config';

// Error handling for AI requests (after returned)
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

// AI Rate limit checker
export async function limitChecker(func, ...args) {
	const MAX_RETRIES = 5;
	let delay = 200;
	let retries = 0;

	while (retries < MAX_RETRIES) {
		// Tries to execute the provided function func with its arguments.
		// If the function returns successfully, the result is returned.
		// Otherwise, it throws the error to be caught in the catch block.
		try {
			const response = await func(...args);
			if (response.success) {
				return response.content;
			} else {
				throw response.error;
			}
		} catch (error) {
			// Checks if the error was due to rate limiting. If yes we extract
			// the remaining requests and ratelimit reset requests
			// If rate-limited, it waits for a specified delay and then tries again.
			// The delay doubles each time to ensure increasing intervals between retries.
			if (error.message && error.message.includes('Rate limit reached')) {
				const remainingRequests =
					error.headers && typeof error.headers.get === 'function'
						? parseInt(error.headers.get('x-ratelimit-remaining-requests'))
						: 0;
				const resetTimeRequests =
					error.headers && typeof error.headers.get === 'function'
						? parseFloat(error.headers.get('x-ratelimit-reset-requests'))
						: 60;
				//  there's only one request left before hitting the rate limit,
				// the function waits until the rate limit resets.
				if (remainingRequests <= 1) {
					await new Promise((resolve) => setTimeout(resolve, resetTimeRequests * 1000));
				}
				if (retries < MAX_RETRIES) {
					await new Promise((resolve) => setTimeout(resolve, delay));
					delay *= 2;
					retries += 1;
				} else {
					throw new Error('Rate limit handling: Maximum retries reached');
				}
			} else {
				throw error;
			}
		}
	}
}