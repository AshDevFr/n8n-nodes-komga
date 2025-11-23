import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionUpdate = {
	operation: ['update'],
	resource: ['collection'],
};

export const collectionUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForCollectionUpdate,
		},
		description: 'The name of the collection',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Ordered',
		name: 'ordered',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCollectionUpdate,
		},
		description: 'Whether the collection is ordered',
		routing: {
			send: {
				type: 'body',
				property: 'ordered',
			},
		},
	},
	{
		displayName: 'Series IDs',
		name: 'seriesIds',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: showOnlyForCollectionUpdate,
		},
		default: [],
		description: 'The series IDs to include in the collection',
		routing: {
			send: {
				type: 'body',
				property: 'seriesIds',
			},
		},
	},
];

