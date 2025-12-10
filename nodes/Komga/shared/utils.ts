export function parseLinkHeader(header?: string): { [rel: string]: string } {
	const links: { [rel: string]: string } = {};

	for (const part of header?.split(',') ?? []) {
		const section = part.trim();
		const match = section.match(/^<([^>]+)>\s*;\s*rel="?([^"]+)"?/);
		if (match) {
			const [, url, rel] = match;
			links[rel] = url;
		}
	}

	return links;
}

/**
 * Build a Komga API filter condition from a value, supporting comma-separated values
 * @param fieldName - The field name (e.g., 'tag', 'genre')
 * @param value - The value or comma-separated values
 * @param operator - The operator to use for single values (e.g., 'Is', 'IsNot')
 * @param multiOperator - The operator to use when multiple values are provided (e.g., 'anyOf', 'allOf')
 * @returns The condition object or undefined if no value
 */
export function buildFilterCondition(
	fieldName: string,
	value: string | undefined,
	operator: string = 'Is',
	multiOperator: string = 'anyOf',
): Record<string, unknown> | undefined {
	if (!value || value.length === 0) {
		return undefined;
	}

	// Check if value contains comma-separated values
	if (value.includes(',')) {
		const values = value
			.split(',')
			.map((v) => v.trim())
			.filter((v) => v.length > 0);

		if (values.length === 0) {
			return undefined;
		}

		if (values.length === 1) {
			// Single value after splitting, treat as single
			return {
				[fieldName]: {
					operator,
					value: values[0],
				},
			};
		}

		// Multiple values - wrap in multiOperator
		return {
			[multiOperator]: values.map((v) => ({
				[fieldName]: {
					operator,
					value: v,
				},
			})),
		};
	}

	// Single value
	return {
		[fieldName]: {
			operator,
			value,
		},
	};
}

/**
 * Helper function to add a condition to the request body
 * Handles merging with existing conditions using the conditionOperator
 */
function addConditionToBody(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	context: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	requestOptions: any,
	condition: Record<string, unknown>,
) {
	const conditionOperator = (context.getNodeParameter('conditionOperator', 0) || 'allOf') as string;

	// Ensure body is an object (might be a string from empty body workaround)
	if (typeof requestOptions.body === 'string') {
		requestOptions.body = {};
	}
	if (!requestOptions.body) {
		requestOptions.body = {};
	}

	const body = requestOptions.body as Record<string, unknown>;

	// If no condition exists yet, set it directly
	if (!body.condition) {
		body.condition = condition;
		return;
	}

	const existingCondition = body.condition as Record<string, unknown>;

	// If existing condition already uses the conditionOperator, append to its array
	if (existingCondition[conditionOperator] && Array.isArray(existingCondition[conditionOperator])) {
		(existingCondition[conditionOperator] as unknown[]).push(condition);
	} else {
		// Wrap both existing and new condition in the conditionOperator
		body.condition = {
			[conditionOperator]: [existingCondition, condition],
		};
	}
}

/**
 * Factory function that creates a preSend function for multi-value string fields
 * Supports comma-separated values with operator and multi-operator support
 * @param fieldName - The name of the field (e.g., 'tag', 'genre')
 * @returns A preSend function for use in field routing
 */
export function buildMultiValueCondition(fieldName: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async function (this: any, requestOptions: any) {
		const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;
		const value = filters[fieldName] as string | undefined;
		const operator = (filters[`${fieldName}Operator`] as string) || 'Is';
		const multiOperator = (filters[`${fieldName}MultiOperator`] as string) || 'anyOf';

		const condition = buildFilterCondition(fieldName, value, operator, multiOperator);
		if (condition) {
			addConditionToBody(this, requestOptions, condition);
		}
		return requestOptions;
	};
}

/**
 * Factory function that creates a preSend function for numeric fields with comparison operators
 * @param fieldName - The name of the field (e.g., 'ageRating')
 * @returns A preSend function for use in field routing
 */
export function buildNumericCondition(fieldName: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async function (this: any, requestOptions: any) {
		const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;
		const value = filters[fieldName] as number | undefined;
		const operator = (filters[`${fieldName}Operator`] as string) || 'Is';

		if (value !== undefined && typeof value === 'number') {
			addConditionToBody(this, requestOptions, {
				[fieldName]: {
					operator,
					value,
				},
			});
		}
		return requestOptions;
	};
}

/**
 * Factory function that creates a preSend function for boolean fields
 * @param fieldName - The name of the field (e.g., 'complete', 'deleted')
 * @returns A preSend function for use in field routing
 */
export function buildBooleanCondition(fieldName: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async function (this: any, requestOptions: any) {
		const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;
		const value = filters[fieldName];

		if (typeof value === 'boolean') {
			addConditionToBody(this, requestOptions, {
				[fieldName]: {
					operator: value ? 'IsTrue' : 'IsFalse',
				},
			});
		}
		return requestOptions;
	};
}

/**
 * Factory function that creates a preSend function for simple string fields
 * @param fieldName - The name of the field (e.g., 'title', 'titleSort')
 * @returns A preSend function for use in field routing
 */
export function buildStringCondition(fieldName: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async function (this: any, requestOptions: any) {
		const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;
		const value = filters[fieldName] as string | undefined;

		if (value && typeof value === 'string' && value.length > 0) {
			addConditionToBody(this, requestOptions, {
				[fieldName]: {
					operator: 'Is',
					value,
				},
			});
		}
		return requestOptions;
	};
}

/**
 * Factory function that creates a preSend function for enum fields (with fixed operator)
 * @param fieldName - The name of the field (e.g., 'readStatus', 'seriesStatus')
 * @returns A preSend function for use in field routing
 */
export function buildEnumCondition(fieldName: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async function (this: any, requestOptions: any) {
		const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;
		const value = filters[fieldName] as string | undefined;

		if (value && typeof value === 'string') {
			addConditionToBody(this, requestOptions, {
				[fieldName]: {
					operator: 'Is',
					value,
				},
			});
		}
		return requestOptions;
	};
}
