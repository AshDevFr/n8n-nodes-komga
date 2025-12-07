import type { INodeProperties } from 'n8n-workflow';
import { seriesSelect } from '../../shared/descriptions';
import { seriesListDescription } from './list';
import { seriesGetDescription } from './get';

const showOnlyForSeries = {
	resource: ['series'],
};

export const seriesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSeries,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List series',
				description: 'List series',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/series/list',
						body: {},
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								// Ensure body is always an object
								if (!requestOptions.body || typeof requestOptions.body !== 'object') {
									requestOptions.body = {};
								}

								// Remove empty condition object if it exists
								// Komga can't deserialize empty condition objects
								if (
									requestOptions.body.condition &&
									typeof requestOptions.body.condition === 'object' &&
									Object.keys(requestOptions.body.condition).length === 0
								) {
									delete requestOptions.body.condition;
								}

								// Workaround: n8n strips empty bodies, so we need to stringify it manually
								// when the body is empty to ensure it's sent as '{}'
								if (Object.keys(requestOptions.body).length === 0) {
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
				action: 'Get a series by ID',
				description: 'Get the data of a single series',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/series/{{$parameter.seriesId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...seriesSelect,
		displayOptions: {
			show: {
				...showOnlyForSeries,
				operation: ['get'],
			},
		},
	},
	...seriesListDescription,
	...seriesGetDescription,
];
