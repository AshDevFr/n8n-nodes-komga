import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReadlistCreate = {
	operation: ['create'],
	resource: ['readlist'],
};

export const readlistCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForReadlistCreate,
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
		required: true,
		displayOptions: {
			show: showOnlyForReadlistCreate,
		},
		default: [],
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
		required: true,
		displayOptions: {
			show: showOnlyForReadlistCreate,
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
		required: true,
		displayOptions: {
			show: showOnlyForReadlistCreate,
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

