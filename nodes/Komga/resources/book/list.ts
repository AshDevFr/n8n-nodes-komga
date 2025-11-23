import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBookList = {
	operation: ['list'],
	resource: ['book'],
};

export const bookListDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForBookList,
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
			show: showOnlyForBookList,
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
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: showOnlyForBookList,
		},
		default: '',
		description:
			'Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported (comma-separated).',
		routing: {
			send: {
				type: 'query',
				property: 'sort',
			},
		},
	},
	{
		displayName: 'Unpaged',
		name: 'unpaged',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForBookList,
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForBookList,
		},
		default: {},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Filter by author',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { author: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Deleted',
				name: 'deleted',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by deleted status',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ { deleted: $value ? { operator: "IsTrue" } : { operator: "IsFalse" } } }}',
					},
				},
			},
			{
				displayName: 'Full Text Search',
				name: 'fullTextSearch',
				type: 'string',
				default: '',
				description: 'Full text search term',
				routing: {
					send: {
						type: 'body',
						property: 'fullTextSearch',
						value: '={{ $value && $value.length > 0 ? $value : undefined }}',
					},
				},
			},
			{
				displayName: 'Library ID',
				name: 'libraryId',
				type: 'string',
				default: '',
				description: 'Filter by library ID',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { libraryId: { operator: $parameter.filters?.libraryIdOperator || "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Library ID Operator',
				name: 'libraryIdOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for library ID filter',
			},
			{
				displayName: 'Media Profile',
				name: 'mediaProfile',
				type: 'options',
				options: [
					{
						name: 'Universal',
						value: 'UNIVERSAL',
					},
					{
						name: 'Divina',
						value: 'DIVINA',
					},
				],
				default: 'UNIVERSAL',
				description: 'Filter by media profile',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value ? { mediaProfile: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Media Status',
				name: 'mediaStatus',
				type: 'options',
				options: [
					{
						name: 'Error',
						value: 'ERROR',
					},
					{
						name: 'Outdated',
						value: 'OUTDATED',
					},
					{
						name: 'Ready',
						value: 'READY',
					},
					{
						name: 'Unknown',
						value: 'UNKNOWN',
					},
					{
						name: 'Unsupported',
						value: 'UNSUPPORTED',
					},
				],
				default: 'READY',
				description: 'Filter by media status',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value ? { mediaStatus: { operator: "Is", value: $value } } : undefined }}',
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
						type: 'body',
						property: 'condition',
						value:
							'={{ { oneShot: $value ? { operator: "IsTrue" } : { operator: "IsFalse" } } }}',
					},
				},
			},
			{
				displayName: 'Read List ID',
				name: 'readListId',
				type: 'string',
				default: '',
				description: 'Filter by read list ID',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { readListId: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Read Status',
				name: 'readStatus',
				type: 'options',
				options: [
					{
						name: 'Unread',
						value: 'UNREAD',
					},
					{
						name: 'Read',
						value: 'READ',
					},
					{
						name: 'In Progress',
						value: 'IN_PROGRESS',
					},
				],
				default: 'UNREAD',
				description: 'Filter by read status',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value ? { readStatus: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Release Date',
				name: 'releaseDate',
				type: 'string',
				default: '',
				description: 'Filter by release date (YYYY-MM-DD)',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { releaseDate: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Series ID',
				name: 'seriesId',
				type: 'string',
				default: '',
				description: 'Filter by series ID',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { seriesId: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter by tag',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { tag: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Filter by title',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { title: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
		],
	},
];
