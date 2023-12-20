import { aiRequest } from './utils';

export const ai = {
	generateMetaTitle: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a suitable meta title for this webpage. Make sure to output direct suggestion and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output direct suggestion and nothing else, written in the same language as the input data.'
			},
			{ role: 'user', content: userMessage },
			{
				role: 'system',
				content:
					'Remember, the meta title should be STRICTLY between 50 and 60 characters long. Please re-count it and if needed adjust it accordingly.'
			}
		];
		return aiRequest(messages, 60);
	},

	generateMetaDescription: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a suitable meta description for this webpage. Make sure to output direct suggestion (min 150 and max 160 characters) and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output direct suggestion (min 150 and max 160 characters) and nothing else, written in the same language as the input data.'
			},
			{ role: 'user', content: userMessage },
			{
				role: 'system',
				content:
					'Remember, the meta description should be STRICTLY between 150 and 160 characters long. Please re-count it and if needed adjust it accordingly.'
			}
		];
		return aiRequest(messages, 160);
	},

	generateSocialTitle: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a suitable social OG title for this webpage. Make sure to output direct suggestion and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output direct suggestion and nothing else, written in the same language as the input data.'
			},
			{ role: 'user', content: userMessage },
			{
				role: 'system',
				content:
					'Remember, the social OG title should be STRICTLY between 60 and 88 characters long. Please re-count it and if needed adjust it accordingly.'
			}
		];
		return aiRequest(messages, 65);
	},

	generateSocialDescription: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a suitable social OG description for this webpage. Make sure to output direct suggestion (min 50 and max 60 characters) and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output direct suggestion (min 50 and max 199 characters) and nothing else, written in the same language as the input data.'
			},
			{ role: 'user', content: userMessage },
			{
				role: 'system',
				content:
					'Remember, the meta description should be STRICTLY between 50 and 199 characters long. Please re-count it and if needed adjust it accordingly.'
			}
		];
		return aiRequest(messages, 160);
	},

	generateH1: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a H1 title for this webpage, because the current one is either missin or is not unique within the evaluated domain. Make sure to output direct suggestion which captures the context of the website and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output direct suggestion of H1 Title and nothing else, written in the same language as the input data. As a consultant you also make sure that the suggested H1 title is unique amongst the other H1s on the website.'
			},
			{ role: 'user', content: userMessage }
			// {
			// 	role: 'system',
			// 	content:
			// 		'Remember, the H1 title should be STRICTLY between 50 and 199 characters long. Please re-count it and if needed adjust it accordingly.'
			// }
		];
		return aiRequest(messages, 65);
	},

	generateSchema: async (data) => {
		const userMessage = `Given the stringified object as data "${data}", generate a suitable schema markup for this webpage. Make sure to output direct suggestion and nothing else.`;
		const messages = [
			{
				role: 'system',
				content:
					'You are a skilled SEO consultant. Based on the input I give you, consider the topic, context, and language of the input data. Make sure to output ONLY stringified version of new schema markup and nothing else, written in the same language as the input data.'
			},
			{ role: 'user', content: userMessage },
			{
				role: 'system',
				content:
					'Remember, the schema follows specific rules defined on schema.org website. Please consider that while creating the new schema mark-up.'
			}
		];
		return aiRequest(messages, 300);
	}

	// ... other functions ...
};
