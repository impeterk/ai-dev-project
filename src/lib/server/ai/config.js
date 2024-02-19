import OpenAI from 'openai';
import { SECRET_AI_TOKEN } from "$env/static/private"

const openai = new OpenAI({
	apiKey: SECRET_AI_TOKEN
});

function defaultConfig(messages, tokens) {
	return { model: 'gpt-3.5-turbo-16k', messages: messages, temperature: 0.45, max_tokens: tokens }; // max_tokens -> tokens per single request
}

export { openai, defaultConfig };