import type { INodeProperties } from 'n8n-workflow';
import { librarySelect } from '../../shared/descriptions';
import { libraryListDescription } from './list';
import { libraryGetDescription } from './get';
import { libraryCreateDescription } from './create';
import { libraryUpdateDescription } from './update';
import { libraryDeleteDescription } from './delete';

const showOnlyForLibraries = {
	resource: ['library'],
};

export const libraryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLibraries,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new library',
				description: 'Create a new library',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/libraries',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a library',
				description: 'Delete a library',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/libraries/{{$parameter.libraryId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a library',
				description: 'Get the data of a single library',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/libraries/{{$parameter.libraryId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List libraries',
				description: 'List libraries',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/libraries',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a library',
				description: 'Update a library',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/libraries/{{$parameter.libraryId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...librarySelect,
		displayOptions: {
			show: {
				...showOnlyForLibraries,
				operation: ['get', 'update', 'delete'],
			},
		},
	},
	...libraryListDescription,
	...libraryGetDescription,
	...libraryCreateDescription,
	...libraryUpdateDescription,
	...libraryDeleteDescription,
];
