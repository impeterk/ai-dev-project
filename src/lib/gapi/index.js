/**
 * Google API module for interacting with Google Webmasters API.
 * @module gapi
 */

import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	keyFile: './src/lib/gapi/aidevproject-7f8870adaae6.json', // Google API key path with service account key
	scopes: [
		'https://www.googleapis.com/auth/webmasters.readonly',
		'https://www.googleapis.com/auth/webmasters',
		// any additional scopes to be added here
	]
});

/**
 * Google Webmasters API client - can be used for calling different APIs
 * @type {object}
 * @alias module:gapi
 */
export const gapi = google.webmasters({ version: 'v3', auth });
