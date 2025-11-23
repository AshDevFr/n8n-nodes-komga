import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReadlistList = {
	operation: ['list'],
	resource: ['readlist'],
};

export const readlistListDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForReadlistList,
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
			show: showOnlyForReadlistList,
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
		displayName: 'Search',
		name: 'search',
		type: 'string',
		displayOptions: {
			show: showOnlyForReadlistList,
		},
		default: '',
		description: 'Search term',
		routing: {
			send: {
				type: 'query',
				property: 'search',
			},
		},
	},
	{
		displayName: 'Library IDs',
		name: 'libraryId',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showOnlyForReadlistList,
		},
		default: [],
		description: 'Filter by library IDs',
		routing: {
			send: {
				type: 'query',
				property: 'library_id',
			},
		},
	},
	{
		displayName: 'Unpaged',
		name: 'unpaged',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForReadlistList,
		},
		default: false,
		description: 'Whether to return all results without pagination',
		routing: {
			send: {
				type: 'query',
				property: 'unpaged',
			},
		},
	},
];
