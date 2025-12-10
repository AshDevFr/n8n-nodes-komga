import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesNew = {
	operation: ['new'],
	resource: ['series'],
};

export const seriesNewDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSeriesNew,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'size',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSeriesNew,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'size',
				value: '={{ $value ? "1000" : $limit?.value }}',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: showOnlyForSeriesNew,
		},
		default: {},
		options: [
			{
				displayName: 'Library ID',
				name: 'libraryId',
				type: 'string',
				default: '',
				description: 'Filter by library ID (comma-separated for multiple)',
				routing: {
					send: {
						type: 'query',
						property: 'library_id',
					},
				},
			},
			{
				displayName: 'Deleted',
				name: 'deleted',
				type: 'boolean',
				default: false,
				description: 'Whether to include deleted series',
				routing: {
					send: {
						type: 'query',
						property: 'deleted',
					},
				},
			},
			{
				displayName: 'One Shot',
				name: 'oneshot',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by one shot status',
				routing: {
					send: {
						type: 'query',
						property: 'oneshot',
					},
				},
			},
			{
				displayName: 'Unpaged',
				name: 'unpaged',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results without pagination',
				routing: {
					send: {
						type: 'query',
						property: 'unpaged',
					},
				},
			},
		],
	},
];
