import { google } from 'googleapis';
import { printLog } from '../utils/logger';

const credentials = {
	apiKey: 'AIzaSyCsPQDgVCS1EBmKMR-PMPYeyvg7nktxbFc',
	// clientId and scope are optional if auth is not required.
	clientId: '624735331098-iiaa2rcv8blkf73emj71gg7mjml1cmn8.apps.googleusercontent.com',
	clientSecret: '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',
	refresh_token:
		'1//049yjWyPUvFqxCgYIARAAGAQSNwF-L9IrF7iLHYJIR8WP3nkGxfJDbtdX6Tgvo5MU-vM2PSHC7n61wxImjZ9j7f7Kfqs_PaihU8A',
	// access_token:
	// 	'fffya29.a0AfB_byBwUfoLTm_Ql5Z9wXA-8_aip1alO9VZA-MuvpPQLAxCVg5w4Rdgn7CDp-XSnlPsrJyPy8S_58LzZYo-NZETzqiA7foHceq0iZeSS405CnqvNvvYFoiGOE1SVpiPdYPsOIgk8ElP361Kb2F8P1mEzzmDPWLU1yEkaCgYKAU0SARESFQHGX2Mi9D_pFPFf4B57SwFJ6x3MWA0171',
	scope: [
		'https://www.googleapis.com/auth/webmasters.readonly',
		'https://www.googleapis.com/auth/webmasters'
	]
};

// Test the  search console api
export async function gscInit(domain) {
	// Initialize oauth2Client with clientId & clientSecret
	const oauth2Client = new google.auth.OAuth2(credentials.clientId, credentials.clientSecret);

	oauth2Client.setCredentials({
		// access_token: credentials.access_token,
		refresh_token: credentials.refresh_token
	});

	const gsc = google.searchconsole({
		version: 'v1',
		auth: oauth2Client
	});

	const query = {
		siteUrl: domain,
		requestBody: {
			startDate: '2023-01-01',
			endDate: '2023-03-31',
			dimensions: ['date'],
			rowLimit: 10
		}
	};

	try {
		const response = await gsc.searchanalytics.query(query);
		printLog('Google API response', response.data);
	} catch (error) {
		if (error.code === 401) {
			// The access token and refresh token are both expired or invalid.
			// Prompt the user to re-authenticate.
			console.log('Please re-authenticate');
			printLog('Google API error. Re-authentication needed', error);
		} else {
			// Some other error occurred.
			printLog('Google API error', error);
		}
	}
}
