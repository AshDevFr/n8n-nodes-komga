import type { INodeProperties } from 'n8n-workflow';
import { bookSelect } from '../../shared/descriptions';
import { bookListDescription } from './list';
import { bookGetDescription } from './get';

const showOnlyForBooks = {
	resource: ['book'],
};

export const bookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBooks,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List books',
				description: 'List books',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/books/list',
						body: {},
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								// Ensure body is always an object
								if (!requestOptions.body || typeof requestOptions.body !== 'object') {
									requestOptions.body = {};
								}

								// Type assertion: after initialization, body is a Record
								const body = requestOptions.body as Record<string, unknown>;

								// Remove empty condition object if it exists
								// Komga can't deserialize empty condition objects
								if (
									body.condition &&
									typeof body.condition === 'object' &&
									Object.keys(body.condition).length === 0
								) {
									delete body.condition;
								}

								// Workaround: n8n strips empty bodies, so we need to stringify it manually
								// when the body is empty to ensure it's sent as '{}'
								if (Object.keys(body).length === 0) {
									// Convert to string to prevent n8n from stripping it
									requestOptions.body = '{}' as unknown as Record<string, unknown>;
									// Make sure we don't double-encode
									requestOptions.json = false;
									// Set content-type manually
									if (!requestOptions.headers) {
										requestOptions.headers = {};
									}
									(requestOptions.headers as Record<string, string>)['Content-Type'] =
										'application/json';
								}

								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a book',
				description: 'Get the data of a single book',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/books/{{$parameter.bookId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...bookSelect,
		displayOptions: {
			show: {
				...showOnlyForBooks,
				operation: ['get'],
			},
		},
	},
	...bookListDescription,
	...bookGetDescription,
];
