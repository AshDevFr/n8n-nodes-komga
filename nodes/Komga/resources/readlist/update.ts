import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReadlistUpdate = {
	operation: ['update'],
	resource: ['readlist'],
};

export const readlistUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForReadlistUpdate,
		},
		description: 'The name of the readlist',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Book IDs',
		name: 'bookIds',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		displayOptions: {
			show: showOnlyForReadlistUpdate,
		},
		description: 'The book IDs to include in the readlist',
		routing: {
			send: {
				type: 'body',
				property: 'bookIds',
			},
		},
	},
	{
		displayName: 'Ordered',
		name: 'ordered',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForReadlistUpdate,
		},
		description: 'Whether the readlist is ordered',
		routing: {
			send: {
				type: 'body',
				property: 'ordered',
			},
		},
	},
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForReadlistUpdate,
		},
		description: 'The summary of the readlist',
		routing: {
			send: {
				type: 'body',
				property: 'summary',
			},
		},
	},
];

