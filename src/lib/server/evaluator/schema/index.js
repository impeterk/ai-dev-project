import { isEmpty } from '../isEmpty';
import { STATUS } from '../config';
import { validate } from './validator';
import { printLog } from '../../../utils/logger';

/**
 * Checks the schema data for validity.
 *
 * @param {Object} data - The data to be validated against the schema.
 * @returns {string} - The status of the schema data. Possible values are 'MISSING', 'OK', or 'INVALID'.
 */
export async function checkSchemaData(data) {
	if (isEmpty(data)) {
		return STATUS.MISSING;
	}

	try {
		const result = await validate(data);

		if (result.totalNumWarnings === 0 && result.totalNumErrors === 0) {
			return STATUS.OK;
		} else {
			return STATUS.INVALID;
		}
	} catch (error) {
		console.error('Error validating schema data:', error);
	}
}
