import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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'
});

function defaultConfig(messages, tokens) {
	// return { model: 'gpt-3.5-turbo', messages: messages, temperature: 0.55, max_tokens: tokens };
	return { model: 'gpt-3.5-turbo-16k', messages: messages, temperature: 0.35, max_tokens: tokens };
}

export { openai, defaultConfig };

// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
// });
