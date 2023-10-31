import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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'
});

function defaultConfig(messages, tokens) {
	return { model: 'gpt-3.5-turbo-16k', messages: messages, temperature: 0.45, max_tokens: tokens }; // max_tokens -> tokens per single request
}

export { openai, defaultConfig };