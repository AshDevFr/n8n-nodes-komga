import type { INodeProperties } from 'n8n-workflow';
import { readlistSelect } from '../../shared/descriptions';
import { readlistListDescription } from './list';
import { readlistGetDescription } from './get';
import { readlistCreateDescription } from './create';
import { readlistUpdateDescription } from './update';
import { readlistDeleteDescription } from './delete';

const showOnlyForReadlists = {
	resource: ['readlist'],
};

export const readlistDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForReadlists,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new readlist',
				description: 'Create a new readlist',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/readlists',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a readlist',
				description: 'Delete a readlist',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/readlists/{{$parameter.readlistId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a readlist',
				description: 'Get the data of a single readlist',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/readlists/{{$parameter.readlistId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List readlists',
				description: 'List readlists',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/readlists',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a readlist',
				description: 'Update a readlist',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/readlists/{{$parameter.readlistId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...readlistSelect,
		displayOptions: {
			show: {
				...showOnlyForReadlists,
				operation: ['get', 'update', 'delete'],
			},
		},
	},
	...readlistListDescription,
	...readlistGetDescription,
	...readlistCreateDescription,
	...readlistUpdateDescription,
	...readlistDeleteDescription,
];
