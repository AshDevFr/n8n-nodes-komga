import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesList = {
	operation: ['list'],
	resource: ['series'],
};

export const seriesListDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSeriesList,
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
			show: showOnlyForSeriesList,
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
			show: showOnlyForSeriesList,
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
			show: showOnlyForSeriesList,
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
			show: showOnlyForSeriesList,
		},
		default: {},
		options: [
			{
				displayName: 'Age Rating',
				name: 'ageRating',
				type: 'string',
				default: '',
				description: 'Filter by age rating',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { ageRating: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
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
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Filter by collection ID',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { collectionId: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Complete',
				name: 'complete',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by complete status',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ { complete: $value ? { operator: "IsTrue" } : { operator: "IsFalse" } } }}',
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
				displayName: 'Genre',
				name: 'genre',
				type: 'string',
				default: '',
				description: 'Filter by genre',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { genre: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Filter by language',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { language: { operator: "Is", value: $value } } : undefined }}',
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
				displayName: 'Publisher',
				name: 'publisher',
				type: 'string',
				default: '',
				description: 'Filter by publisher',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { publisher: { operator: "Is", value: $value } } : undefined }}',
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
				displayName: 'Series Status',
				name: 'seriesStatus',
				type: 'options',
				options: [
					{
						name: 'Ended',
						value: 'ENDED',
					},
					{
						name: 'Ongoing',
						value: 'ONGOING',
					},
					{
						name: 'Abandoned',
						value: 'ABANDONED',
					},
					{
						name: 'Hiatus',
						value: 'HIATUS',
					},
				],
				default: 'ONGOING',
				description: 'Filter by series status',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value ? { seriesStatus: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
			{
				displayName: 'Sharing Label',
				name: 'sharingLabel',
				type: 'string',
				default: '',
				description: 'Filter by sharing label',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { sharingLabel: { operator: "Is", value: $value } } : undefined }}',
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
			{
				displayName: 'Title Sort',
				name: 'titleSort',
				type: 'string',
				default: '',
				description: 'Filter by sort title',
				routing: {
					send: {
						type: 'body',
						property: 'condition',
						value:
							'={{ $value && $value.length > 0 ? { titleSort: { operator: "Is", value: $value } } : undefined }}',
					},
				},
			},
		],
	},
];
