import type { INodeProperties } from 'n8n-workflow';
import { bookSelect } from '../../shared/descriptions';
import { bookListDescription } from './list';
import { bookGetDescription } from './get';

const showOnlyForBooks = {
	resource: ['book'],
};

export const bookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBooks,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List books',
				description: 'List books',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/books/list',
						body: {},
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a book',
				description: 'Get the data of a single book',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/books/{{$parameter.bookId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...bookSelect,
		displayOptions: {
			show: {
				...showOnlyForBooks,
				operation: ['get'],
			},
		},
	},
	...bookListDescription,
	...bookGetDescription,
];
