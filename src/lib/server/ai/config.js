import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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'
});

function defaultConfig(messages, tokens) {
	return { model: 'gpt-3.5-turbo-16k', messages: messages, temperature: 0.45, max_tokens: tokens }; // max_tokens -> tokens per single request
}

export { openai, defaultConfig };