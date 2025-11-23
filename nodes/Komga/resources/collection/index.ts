import type { INodeProperties } from 'n8n-workflow';
import { collectionSelect } from '../../shared/descriptions';
import { collectionListDescription } from './list';
import { collectionGetDescription } from './get';
import { collectionCreateDescription } from './create';
import { collectionUpdateDescription } from './update';
import { collectionDeleteDescription } from './delete';

const showOnlyForCollections = {
	resource: ['collection'],
};

export const collectionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCollections,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new collection',
				description: 'Create a new collection',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/collections',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a collection',
				description: 'Delete a collection',
				routing: {
					request: {
						method: 'DELETE',
						url: '/api/v1/collections/{{$parameter.collectionId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a collection',
				description: 'Get the data of a single collection',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/collections/{{$parameter.collectionId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List collections',
				description: 'List collections',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/collections',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a collection',
				description: 'Update a collection',
				routing: {
					request: {
						method: 'PATCH',
						url: '/api/v1/collections/{{$parameter.collectionId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...collectionSelect,
		displayOptions: {
			show: {
				...showOnlyForCollections,
				operation: ['get', 'update', 'delete'],
			},
		},
	},
	...collectionListDescription,
	...collectionGetDescription,
	...collectionCreateDescription,
	...collectionUpdateDescription,
	...collectionDeleteDescription,
];
