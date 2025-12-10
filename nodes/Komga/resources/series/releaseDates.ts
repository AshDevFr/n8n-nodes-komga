import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesReleaseDates = {
	operation: ['releaseDates'],
	resource: ['series'],
};

export const seriesReleaseDatesDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: showOnlyForSeriesReleaseDates,
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
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Filter by collection ID',
				routing: {
					send: {
						type: 'query',
						property: 'collection_id',
					},
				},
			},
		],
	},
];
