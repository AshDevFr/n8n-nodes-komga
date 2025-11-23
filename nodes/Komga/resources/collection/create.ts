import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionCreate = {
	operation: ['create'],
	resource: ['collection'],
};

export const collectionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCollectionCreate,
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
		required: true,
		displayOptions: {
			show: showOnlyForCollectionCreate,
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
		required: true,
		displayOptions: {
			show: showOnlyForCollectionCreate,
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

